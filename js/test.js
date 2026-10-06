(() => {
  const questions = window.TSA_QUESTIONS || [];
  const participantCode = localStorage.getItem("tsa_participant_code");
  const sessionId = localStorage.getItem("tsa_session_id");

  if (!participantCode || !sessionId) {
    window.location.href = "index.html";
    return;
  }

  const participantLabel = document.getElementById("participant-label");
  const progressText = document.getElementById("progress-text");
  const progressBar = document.getElementById("progress-bar");
  const questionArea = document.getElementById("question-area");
  const exitButton = document.getElementById("exit-button");
  const saveMessage = document.getElementById("save-message");
  const speakButtonText = "🔊 Kelimeyi Dinle";

  participantLabel.textContent = participantCode;

  let answers = [];
  try {
    answers = JSON.parse(localStorage.getItem("tsa_answers") || "[]");
    if (!Array.isArray(answers)) answers = [];
  } catch {
    answers = [];
  }

  let index = Math.min(answers.length, questions.length);
  let speechRequestId = 0;
  let autoplayTimer = null;
  let warnedAboutTurkishVoice = false;

  function showSaveError(text) {
    saveMessage.hidden = false;
    saveMessage.textContent = text;
  }

  async function requireAuth() {
    const { data } = await window.TSA_DB.auth.getSession();
    if (!data.session) {
      window.location.href = "login.html";
      return false;
    }
    return true;
  }

  function chooseTurkishVoice(voices) {
    const turkishVoices = voices.filter(voice =>
      voice.lang && voice.lang.toLowerCase().startsWith("tr")
    );

    return turkishVoices.sort((a, b) => {
      const score = voice => {
        const language = voice.lang.toLowerCase();
        const name = voice.name.toLowerCase();
        let value = language === "tr-tr" ? 100 : 50;
        if (/natural|online/.test(name)) value += 30;
        if (/emel|tolga|google/.test(name)) value += 20;
        if (voice.default) value += 5;
        return value;
      };

      return score(b) - score(a);
    })[0] || null;
  }

  function loadVoices() {
    const voices = window.speechSynthesis.getVoices();
    if (voices.length) return Promise.resolve(voices);

    return new Promise(resolve => {
      let finished = false;
      const finish = () => {
        if (finished) return;
        finished = true;
        window.speechSynthesis.removeEventListener("voiceschanged", finish);
        resolve(window.speechSynthesis.getVoices());
      };

      window.speechSynthesis.addEventListener("voiceschanged", finish);
      setTimeout(finish, 1000);
    });
  }

  async function speak(word, speakButton) {
    if (!("speechSynthesis" in window)) {
      alert("Bu tarayıcı metin-seslendirme özelliğini desteklemiyor.");
      return;
    }

    const requestId = ++speechRequestId;
    window.speechSynthesis.cancel();
    speakButton.disabled = true;
    speakButton.textContent = "🔊 Ses hazırlanıyor...";

    const voices = await loadVoices();
    if (requestId !== speechRequestId || !speakButton.isConnected) return;

    const utterance = new SpeechSynthesisUtterance(
      `Dikkatle dinleyin. ${word}. Tekrar: ${word}.`
    );
    utterance.lang = "tr-TR";
    utterance.rate = 0.72;
    utterance.pitch = 1;
    utterance.volume = 1;

    const turkishVoice = chooseTurkishVoice(voices);
    if (turkishVoice) utterance.voice = turkishVoice;

    if (!turkishVoice && !warnedAboutTurkishVoice) {
      warnedAboutTurkishVoice = true;
      showSaveError(
        "Bu cihazda Türkçe konuşma sesi bulunamadı. Ses kalitesi tarayıcıya göre değişebilir."
      );
    }

    const resetButton = () => {
      if (requestId !== speechRequestId || !speakButton.isConnected) return;
      speakButton.disabled = false;
      speakButton.textContent = speakButtonText;
    };

    utterance.onstart = () => {
      if (requestId === speechRequestId && speakButton.isConnected) {
        speakButton.textContent = "🔊 Dinleniyor...";
      }
    };
    utterance.onend = resetButton;
    utterance.onerror = event => {
      resetButton();
      if (event.error !== "canceled" && event.error !== "interrupted") {
        showSaveError("Ses oynatılamadı. Lütfen tekrar deneyin.");
      }
    };

    window.speechSynthesis.speak(utterance);
  }

  async function renderQuestion() {
    clearTimeout(autoplayTimer);
    speechRequestId += 1;
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();

    if (index >= questions.length) {
      await finishTest();
      return;
    }

    const q = questions[index];
    progressText.textContent = `${index + 1} / ${questions.length}`;
    progressBar.style.width = `${((index + 1) / questions.length) * 100}%`;

    const optionsHtml = q.options.map(option => `
      <button class="option" type="button" data-option="${option.id}">
        <span class="option-emoji" aria-hidden="true">${option.emoji}</span>
        <span class="option-label">${option.label}</span>
      </button>
    `).join("");

    questionArea.innerHTML = `
      <div class="question-type">${q.category}</div>
      <h2 class="question-title">${q.prompt}</h2>
      ${q.speak ? `
        <button id="speak-button" class="speak-button" type="button">${speakButtonText}</button>
        <p class="audio-hint">Kelime daha anlaşılır olması için iki kez okunur.</p>
      ` : ''}
      <div class="options">${optionsHtml}</div>
    `;

    saveMessage.hidden = true;
    const shownAt = performance.now();

    if (q.speak) {
      const speakButton = document.getElementById("speak-button");
      speakButton.addEventListener("click", () => speak(q.speak, speakButton));
      autoplayTimer = setTimeout(() => speak(q.speak, speakButton), 600);
    }

    questionArea.querySelectorAll(".option").forEach(button => {
      button.addEventListener("click", async () => {
        clearTimeout(autoplayTimer);
        speechRequestId += 1;
        if ("speechSynthesis" in window) window.speechSynthesis.cancel();

        const allButtons = questionArea.querySelectorAll(".option");
        allButtons.forEach(btn => btn.disabled = true);

        const selected = button.dataset.option;
        const responseTimeMs = Math.round(performance.now() - shownAt);
        const answer = {
          question_id: q.id,
          category: q.category,
          selected,
          correct_option: q.correct,
          is_correct: selected === q.correct,
          response_time_ms: responseTimeMs,
          answered_at: new Date().toISOString()
        };

        const { error } = await window.TSA_DB
          .from("responses")
          .upsert({
            session_id: sessionId,
            question_id: answer.question_id,
            category: answer.category,
            selected_option: answer.selected,
            correct_option: answer.correct_option,
            is_correct: answer.is_correct,
            response_time_ms: answer.response_time_ms,
            answered_at: answer.answered_at
          }, { onConflict: "session_id,question_id" });

        if (error) {
          console.error(error);
          showSaveError("Cevap kaydedilemedi: " + error.message);
          allButtons.forEach(btn => btn.disabled = false);
          return;
        }

        answers.push(answer);
        localStorage.setItem("tsa_answers", JSON.stringify(answers));
        index += 1;
        await renderQuestion();
      }, { once: true });
    });
  }

  async function finishTest() {
    const correct = answers.filter(a => a.is_correct).length;

    const { error } = await window.TSA_DB
      .from("test_sessions")
      .update({
        status: "completed",
        completed_at: new Date().toISOString()
      })
      .eq("id", sessionId);

    if (error) {
      console.error(error);
      showSaveError("Test tamamlandı ancak oturum durumu güncellenemedi: " + error.message);
      return;
    }

    const result = {
      participant_code: participantCode,
      session_id: sessionId,
      total: questions.length,
      correct,
      percentage: Math.round((correct / questions.length) * 100),
      started_at: localStorage.getItem("tsa_started_at"),
      completed_at: new Date().toISOString(),
      answers
    };

    localStorage.setItem("tsa_result", JSON.stringify(result));
    window.location.href = "result.html";
  }

  exitButton.addEventListener("click", () => {
    window.location.href = "index.html";
  });

  requireAuth().then(ok => {
    if (ok) renderQuestion();
  });
})();
