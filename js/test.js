(() => {
  const questions = window.TSA_QUESTIONS || [];
  const stages = window.TSA_STAGES || [];
  const audioSettings = {
    preferredVoiceName: "",
    rate: 0.72,
    pitch: 1,
    volume: 1,
    repetitions: 2,
    autoplay: true,
    ...(window.TSA_AUDIO_SETTINGS || {})
  };
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
  const speakButtonText = "🔊 Sesi Dinle";

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
  let activeAudio = null;
  let warnedAboutTurkishVoice = false;
  const shownStageIds = new Set();

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

    const preferredName = String(audioSettings.preferredVoiceName || "").trim().toLowerCase();
    if (preferredName) {
      const preferredVoice = turkishVoices.find(voice =>
        voice.name.toLowerCase() === preferredName
      );
      if (preferredVoice) return preferredVoice;
    }

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

  function stopAudio() {
    clearTimeout(autoplayTimer);
    speechRequestId += 1;
    if (activeAudio) {
      activeAudio.pause();
      activeAudio.currentTime = 0;
      activeAudio = null;
    }
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
  }

  function resetSpeakButton(speakButton, requestId) {
    if (requestId !== speechRequestId || !speakButton.isConnected) return;
    speakButton.disabled = false;
    speakButton.textContent = speakButtonText;
  }

  async function playRecordedAudio(question, speakButton) {
    const requestId = speechRequestId;
    const audio = new Audio(question.audioSrc);
    activeAudio = audio;
    audio.preload = "auto";
    audio.volume = Number(question.audioVolume ?? audioSettings.volume);
    audio.playbackRate = Number(question.audioRate ?? 1);

    audio.addEventListener("playing", () => {
      if (requestId === speechRequestId && speakButton.isConnected) {
        speakButton.textContent = "🔊 Dinleniyor...";
      }
    });
    audio.addEventListener("ended", () => {
      if (activeAudio === audio) activeAudio = null;
      resetSpeakButton(speakButton, requestId);
    });
    audio.addEventListener("error", () => {
      if (activeAudio === audio) activeAudio = null;
      resetSpeakButton(speakButton, requestId);
      showSaveError("Ses kaydı oynatılamadı. Lütfen dosya yolunu kontrol edin.");
    });

    try {
      await audio.play();
    } catch (error) {
      if (activeAudio === audio) activeAudio = null;
      resetSpeakButton(speakButton, requestId);
      if (error.name === "NotAllowedError") {
        showSaveError("Sesi başlatmak için Ses Dinle düğmesine dokunun.");
      } else {
        showSaveError("Ses kaydı oynatılamadı. Lütfen tekrar deneyin.");
      }
    }
  }

  function buildSpeechText(word) {
    const repetitions = Math.max(1, Number(audioSettings.repetitions) || 1);
    if (repetitions === 1) return `Dikkatle dinleyin. ${word}.`;

    return [
      `Dikkatle dinleyin. ${word}.`,
      ...Array.from({ length: repetitions - 1 }, () => `Tekrar: ${word}.`)
    ].join(" " );
  }

  async function speak(question, speakButton) {
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

    const utterance = new SpeechSynthesisUtterance(buildSpeechText(question.speak));
    utterance.lang = "tr-TR";
    utterance.rate = Number(question.speechRate ?? audioSettings.rate);
    utterance.pitch = Number(question.speechPitch ?? audioSettings.pitch);
    utterance.volume = Number(question.audioVolume ?? audioSettings.volume);

    const turkishVoice = chooseTurkishVoice(voices);
    if (turkishVoice) utterance.voice = turkishVoice;

    if (!turkishVoice && !warnedAboutTurkishVoice) {
      warnedAboutTurkishVoice = true;
      showSaveError(
        "Bu cihazda Türkçe konuşma sesi bulunamadı. Ses kalitesi tarayıcıya göre değişebilir."
      );
    }

    const resetButton = () => resetSpeakButton(speakButton, requestId);

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

  async function playQuestionAudio(question, speakButton) {
    stopAudio();
    speakButton.disabled = true;
    speakButton.textContent = "🔊 Ses hazırlanıyor...";

    if (question.audioSrc) {
      await playRecordedAudio(question, speakButton);
      return;
    }

    if (question.speak) await speak(question, speakButton);
  }

  function getStage(stageId) {
    return stages.find(stage => stage.id === stageId) || null;
  }

  function scrollToTestTop() {
    window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  function renderStageIntro(stage) {
    const stageIndex = Math.max(0, stages.findIndex(item => item.id === stage.id));
    progressText.textContent = `Bölüm ${stageIndex + 1} / ${stages.length}`;
    progressBar.style.width = `${(index / Math.max(questions.length, 1)) * 100}%`;
    questionArea.innerHTML = `
      <div class="stage-screen">
        <div class="stage-icon" aria-hidden="true">${stage.icon || "▶️"}</div>
        <p class="question-type">Bölüm ${stageIndex + 1}</p>
        <h2 class="stage-title">${stage.title}</h2>
        <p class="stage-description">${stage.description}</p>
        <button id="stage-start-button" class="primary stage-start-button" type="button">
          Bölüme Başla
        </button>
      </div>
    `;
    saveMessage.hidden = true;

    document.getElementById("stage-start-button").addEventListener("click", () => {
      shownStageIds.add(stage.id);
      renderQuestion();
    }, { once: true });
    scrollToTestTop();
  }

  function optionMedia(option) {
    if (option.image) {
      return `<img class="option-image" src="${option.image}" alt="" />`;
    }
    return `<span class="option-emoji" aria-hidden="true">${option.emoji || ""}</span>`;
  }

  async function renderQuestion() {
    stopAudio();

    if (index >= questions.length) {
      await finishTest();
      return;
    }

    const q = questions[index];
    const stage = getStage(q.stage);
    if (stage && !shownStageIds.has(stage.id)) {
      renderStageIntro(stage);
      return;
    }

    const stageIndex = stage ? stages.findIndex(item => item.id === stage.id) : -1;
    progressText.textContent = stageIndex >= 0
      ? `Soru ${index + 1} / ${questions.length} • Bölüm ${stageIndex + 1} / ${stages.length}`
      : `${index + 1} / ${questions.length}`;
    progressBar.style.width = `${((index + 1) / questions.length) * 100}%`;

    const optionsHtml = q.options.map(option => `
      <button class="option" type="button" data-option="${option.id}">
        <span class="option-media">${optionMedia(option)}</span>
        <span class="option-label">${option.label}</span>
      </button>
    `).join("");

    questionArea.innerHTML = `
      <div class="question-type">${q.category}</div>
      <h2 class="question-title">${q.prompt}</h2>
      ${(q.speak || q.audioSrc) ? `
        <button id="speak-button" class="speak-button" type="button">${speakButtonText}</button>
        <p class="audio-hint">Sesi gerektiğinde yeniden dinleyebilirsiniz.</p>
      ` : ''}
      <div class="options">${optionsHtml}</div>
    `;
    scrollToTestTop();

    saveMessage.hidden = true;
    const shownAt = performance.now();

    if (q.speak || q.audioSrc) {
      const speakButton = document.getElementById("speak-button");
      speakButton.addEventListener("click", () => playQuestionAudio(q, speakButton));
      if (audioSettings.autoplay) {
        autoplayTimer = setTimeout(() => playQuestionAudio(q, speakButton), 600);
      }
    }

    questionArea.querySelectorAll(".option").forEach(button => {
      button.addEventListener("click", async () => {
        stopAudio();

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
    stopAudio();
    window.location.href = "index.html";
  });

  window.addEventListener("beforeunload", stopAudio);

  requireAuth().then(ok => {
    if (ok) renderQuestion();
  });
})();
