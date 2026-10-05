(() => {
  const questions = window.TSA_QUESTIONS || [];
  const participantCode = localStorage.getItem("tsa_participant_code");

  if (!participantCode) {
    window.location.href = "index.html";
    return;
  }

  const participantLabel = document.getElementById("participant-label");
  const progressText = document.getElementById("progress-text");
  const progressBar = document.getElementById("progress-bar");
  const questionArea = document.getElementById("question-area");
  const exitButton = document.getElementById("exit-button");

  participantLabel.textContent = participantCode;

  let answers = [];
  try {
    answers = JSON.parse(localStorage.getItem("tsa_answers") || "[]");
    if (!Array.isArray(answers)) answers = [];
  } catch {
    answers = [];
  }

  let index = Math.min(answers.length, questions.length);

  function speak(text) {
    if (!("speechSynthesis" in window)) {
      alert("Bu tarayıcı metin-seslendirme özelliğini desteklemiyor.");
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "tr-TR";
    utterance.rate = 0.85;

    const voices = window.speechSynthesis.getVoices();
    const turkishVoice = voices.find(v => v.lang && v.lang.toLowerCase().startsWith("tr"));
    if (turkishVoice) utterance.voice = turkishVoice;

    window.speechSynthesis.speak(utterance);
  }

  function renderQuestion() {
    if (index >= questions.length) {
      finishTest();
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
      ${q.speak ? '<button id="speak-button" class="speak-button" type="button">🔊 Sesi Dinle</button>' : ''}
      <div class="options">${optionsHtml}</div>
    `;

    const shownAt = performance.now();

    if (q.speak) {
      const speakButton = document.getElementById("speak-button");
      speakButton.addEventListener("click", () => speak(q.speak));
      setTimeout(() => speak(q.speak), 250);
    }

    questionArea.querySelectorAll(".option").forEach(button => {
      button.addEventListener("click", () => {
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

        answers.push(answer);
        localStorage.setItem("tsa_answers", JSON.stringify(answers));
        index += 1;
        renderQuestion();
      }, { once: true });
    });
  }

  function finishTest() {
    const correct = answers.filter(a => a.is_correct).length;
    const result = {
      participant_code: participantCode,
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

  renderQuestion();
})();