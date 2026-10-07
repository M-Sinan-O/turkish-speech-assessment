(() => {
  const forms = window.TSA_FORMS || {};
  const formId = localStorage.getItem("tsa_assessment_form") || window.TSA_DEFAULT_FORM;
  const assessmentForm = forms[formId] || forms[window.TSA_DEFAULT_FORM];
  const questions = assessmentForm?.questions || [];
  const stages = assessmentForm?.stages || [];
  const audioSettings = {
    preferredVoiceName: "",
    rate: 0.78,
    pitch: 1,
    volume: 1,
    repetitions: 1,
    autoplay: false,
    ...(window.TSA_AUDIO_SETTINGS || {}),
    ...(assessmentForm?.audioSettings || {})
  };
  const participantCode = localStorage.getItem("tsa_participant_code");
  const sessionId = localStorage.getItem("tsa_session_id");

  if (!participantCode || !sessionId || !assessmentForm) {
    window.location.href = "index.html";
    return;
  }

  const participantLabel = document.getElementById("participant-label");
  const formLabel = document.getElementById("form-label");
  const progressText = document.getElementById("progress-text");
  const progressBar = document.getElementById("progress-bar");
  const questionArea = document.getElementById("question-area");
  const exitButton = document.getElementById("exit-button");
  const saveMessage = document.getElementById("save-message");
  const speakButtonText = "🔊 Sesi Dinle";

  participantLabel.textContent = participantCode;
  formLabel.textContent = assessmentForm.label.toLocaleUpperCase("tr-TR");

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
  let audioPlayCount = 0;
  let warnedAboutTurkishVoice = false;
  let supportsExtendedResponses = true;
  const shownStageIds = new Set(answers.map(answer => {
    return questions.find(question => question.id === answer.question_id)?.stage;
  }).filter(Boolean));

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

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

    const preferredNames = Array.isArray(audioSettings.preferredVoiceNames)
      ? audioSettings.preferredVoiceNames.map(name => String(name).trim().toLowerCase()).filter(Boolean)
      : [];
    for (const nameHint of preferredNames) {
      const preferredVoice = turkishVoices.find(voice =>
        voice.name.toLowerCase().includes(nameHint)
      );
      if (preferredVoice) return preferredVoice;
    }

    return turkishVoices.sort((a, b) => {
      const score = voice => {
        const language = voice.lang.toLowerCase();
        const name = voice.name.toLowerCase();
        let value = language === "tr-tr" ? 100 : 50;
        if (/natural|neural|premium|enhanced/.test(name)) value += 80;
        if (/online/.test(name)) value += 25;
        if (/emel|yelda|seda|filiz|burcu|female|kadın|woman|google türkçe/.test(name)) value += 55;
        if (audioSettings.preferFemaleVoice && /tolga|cem|male|erkek|man/.test(name)) value -= 45;
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
      showSaveError("Ses kaydı oynatılamadı. Dosya yolunu kontrol edin.");
    });
    try {
      await audio.play();
    } catch (error) {
      if (activeAudio === audio) activeAudio = null;
      resetSpeakButton(speakButton, requestId);
      showSaveError(error.name === "NotAllowedError"
        ? "Sesi başlatmak için Ses Dinle düğmesine dokunun."
        : "Ses kaydı oynatılamadı. Lütfen tekrar deneyin.");
    }
  }

  function buildSpeechText(text) {
    const repetitions = Math.max(1, Number(audioSettings.repetitions) || 1);
    if (repetitions === 1) return text;
    return [text, ...Array.from({ length: repetitions - 1 }, () => `Tekrar: ${text}`)].join(" ");
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
      showSaveError("Bu cihazda Türkçe konuşma sesi bulunamadı. Uygulayıcı yönergeyi okuyabilir.");
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
        showSaveError("Ses oynatılamadı. Uygulayıcı yönergeyi okuyabilir.");
      }
    };
    window.speechSynthesis.speak(utterance);
  }

  async function playQuestionAudio(question, speakButton) {
    stopAudio();
    audioPlayCount += 1;
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
    window.requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "smooth" }));
  }

  function renderStageIntro(stage) {
    const stageIndex = Math.max(0, stages.findIndex(item => item.id === stage.id));
    progressText.textContent = `Bölüm ${stageIndex + 1} / ${stages.length}`;
    progressBar.style.width = `${(index / Math.max(questions.length, 1)) * 100}%`;
    questionArea.innerHTML = `
      <div class="stage-screen">
        <div class="stage-icon" aria-hidden="true">${escapeHtml(stage.icon || "▶️")}</div>
        <p class="question-type">Bölüm ${stageIndex + 1}</p>
        <h2 class="stage-title">${escapeHtml(stage.title)}</h2>
        <p class="stage-description">${escapeHtml(stage.description)}</p>
        <p class="stage-form-note">${escapeHtml(assessmentForm.notice)}</p>
        <button id="stage-start-button" class="primary stage-start-button" type="button">Bölüme Başla</button>
      </div>`;
    saveMessage.hidden = true;
    document.getElementById("stage-start-button").addEventListener("click", () => {
      shownStageIds.add(stage.id);
      renderQuestion();
    }, { once: true });
    scrollToTestTop();
  }

  function optionMedia(option) {
    if (option.sprite) {
      return spriteImage(option.sprite, "option-sprite");
    }
    if (option.image) {
      return `<img class="option-image" src="${escapeHtml(option.image)}" alt="" />`;
    }
    return `<span class="option-emoji" aria-hidden="true">${escapeHtml(option.emoji || "")}</span>`;
  }

  function spriteImage(sprite, className) {
    const sheetWidth = Math.max(1, Number(sprite.sheetWidth) || 1);
    const sheetHeight = Math.max(1, Number(sprite.sheetHeight) || 1);
    const width = Math.max(1, Number(sprite.width) || sheetWidth);
    const height = Math.max(1, Number(sprite.height) || sheetHeight);
    const x = Math.min(sheetWidth - width, Math.max(0, Number(sprite.x) || 0));
    const y = Math.min(sheetHeight - height, Math.max(0, Number(sprite.y) || 0));
    const positionX = sheetWidth === width ? 0 : (x * 100) / (sheetWidth - width);
    const positionY = sheetHeight === height ? 0 : (y * 100) / (sheetHeight - height);
    const aspect = width / height;
    const style = [
      `background-image:url('${escapeHtml(sprite.src)}')`,
      `background-size:${(sheetWidth / width) * 100}% ${(sheetHeight / height) * 100}%`,
      `background-position:${positionX}% ${positionY}%`,
      `aspect-ratio:${aspect} / 1`
    ].join(";");
    return `<span class="sprite-image ${className}" aria-hidden="true" style="${style}"></span>`;
  }

  function renderAudioControl(question) {
    if (!question.speak && !question.audioSrc) return "";
    return `
      <button id="speak-button" class="speak-button" type="button">${speakButtonText}</button>
      <p class="audio-hint">Sakin ve yumuşak Türkçe kadın sesi tercih edilir. Her yeniden dinleme kaydedilir.</p>`;
  }

  function renderStimulus(question) {
    if (!question.stimulus) return "";
    if (question.stimulus.sprite) {
      return `
        <div class="stimulus-card" role="img" aria-label="${escapeHtml(question.stimulus.label || "Görsel uyaran")}">
          ${spriteImage(question.stimulus.sprite, "stimulus-sprite")}
        </div>`;
    }
    if (question.stimulus.image) {
      return `<div class="stimulus-card"><img src="${escapeHtml(question.stimulus.image)}" alt="${escapeHtml(question.stimulus.label || "")}" /></div>`;
    }
    return `
      <div class="stimulus-card" role="img" aria-label="${escapeHtml(question.stimulus.label || "Görsel uyaran")}">
        <span class="stimulus-emoji" aria-hidden="true">${escapeHtml(question.stimulus.emoji || "")}</span>
      </div>`;
  }

  function renderSelectionQuestion(question) {
    const optionsHtml = question.options.map(option => `
      <button class="option" type="button" data-option="${escapeHtml(option.id)}" aria-label="${escapeHtml(option.label)}">
        <span class="option-media">${optionMedia(option)}</span>
        <span class="option-label${question.hideLabels ? " visually-hidden" : ""}">${escapeHtml(option.label)}</span>
      </button>`).join("");
    return `${renderAudioControl(question)}<div class="options options-${question.options.length}">${optionsHtml}</div>`;
  }

  function renderClinicianQuestion(question) {
    return `
      ${renderAudioControl(question)}
      ${renderStimulus(question)}
      <div class="clinician-panel">
        <p><strong>Uygulayıcı puanlaması</strong></p>
        <details class="clinician-guide">
          <summary>Beklenen yanıt ve puanlama anahtarını göster</summary>
          <p>${escapeHtml(question.expected)}</p>
          <p>${escapeHtml(question.rubric)}</p>
        </details>
        <label for="cue-level">Yanıttan önce kullanılan en yüksek yardım düzeyi</label>
        <select id="cue-level">
          <option value="0">0 • Yardım yok / bağımsız yanıt</option>
          <option value="1">1 • Yönerge bir kez tekrarlandı</option>
          <option value="2">2 • Görsel alanı sadeleştirildi veya vurgulandı</option>
          <option value="3">3 • Anlamsal ipucu ya da model verildi</option>
        </select>
        <div class="score-options" aria-label="Yanıt puanı">
          <button class="score-option full" type="button" data-score="2">2 puan<br><small>Doğru</small></button>
          <button class="score-option partial" type="button" data-score="1">1 puan<br><small>Kısmen doğru</small></button>
          <button class="score-option zero" type="button" data-score="0">0 puan<br><small>Yanlış / yanıt yok</small></button>
        </div>
      </div>`;
  }

  async function saveAnswer(answer) {
    const basePayload = {
      session_id: sessionId,
      question_id: answer.question_id,
      category: answer.category,
      selected_option: answer.selected,
      correct_option: answer.correct_option,
      is_correct: answer.is_correct,
      response_time_ms: answer.response_time_ms,
      answered_at: answer.answered_at
    };
    let payload = basePayload;
    if (supportsExtendedResponses) {
      payload = {
        ...basePayload,
        response_kind: answer.response_kind,
        score: answer.score,
        max_score: answer.max_score,
        replay_count: answer.replay_count,
        cue_level: answer.cue_level,
        assisted_correct: answer.assisted_correct
      };
    }
    let result = await window.TSA_DB
      .from("responses")
      .upsert(payload, { onConflict: "session_id,question_id" });

    if (result.error && supportsExtendedResponses &&
        /response_kind|score|max_score|replay_count|cue_level|assisted_correct|schema cache|column/i.test(result.error.message || "")) {
      supportsExtendedResponses = false;
      result = await window.TSA_DB
        .from("responses")
        .upsert(basePayload, { onConflict: "session_id,question_id" });
    }
    return result.error;
  }

  async function submitAnswer(question, shownAt, response) {
    stopAudio();
    questionArea.querySelectorAll("button, select").forEach(control => control.disabled = true);
    const score = Number(response.score);
    const maxScore = Number(response.max_score);
    const cueLevel = Number(response.cue_level || 0);
    const answer = {
      question_id: question.id,
      category: question.category,
      selected: response.selected,
      correct_option: response.correct_option,
      response_kind: question.interaction || "select",
      score,
      max_score: maxScore,
      is_correct: score === maxScore,
      cue_level: cueLevel,
      assisted_correct: cueLevel > 0 && score > 0,
      replay_count: Math.max(0, audioPlayCount - 1),
      response_time_ms: Math.round(performance.now() - shownAt),
      answered_at: new Date().toISOString()
    };
    const error = await saveAnswer(answer);
    if (error) {
      console.error(error);
      showSaveError("Cevap kaydedilemedi: " + error.message);
      questionArea.querySelectorAll("button, select").forEach(control => control.disabled = false);
      return;
    }
    answers.push(answer);
    localStorage.setItem("tsa_answers", JSON.stringify(answers));
    index += 1;
    await renderQuestion();
  }

  async function renderQuestion() {
    stopAudio();
    audioPlayCount = 0;
    if (index >= questions.length) {
      await finishTest();
      return;
    }

    const question = questions[index];
    const stage = getStage(question.stage);
    if (stage && !shownStageIds.has(stage.id)) {
      renderStageIntro(stage);
      return;
    }

    const stageIndex = stage ? stages.findIndex(item => item.id === stage.id) : -1;
    progressText.textContent = stageIndex >= 0
      ? `Soru ${index + 1} / ${questions.length} • Bölüm ${stageIndex + 1} / ${stages.length}`
      : `${index + 1} / ${questions.length}`;
    progressBar.style.width = `${((index + 1) / questions.length) * 100}%`;
    questionArea.innerHTML = `
      <div class="question-type">${escapeHtml(question.category)}</div>
      <h2 class="question-title">${escapeHtml(question.prompt)}</h2>
      ${question.interaction === "clinician-score"
        ? renderClinicianQuestion(question)
        : renderSelectionQuestion(question)}`;
    scrollToTestTop();
    saveMessage.hidden = true;
    const shownAt = performance.now();

    if (question.speak || question.audioSrc) {
      const speakButton = document.getElementById("speak-button");
      speakButton.addEventListener("click", () => playQuestionAudio(question, speakButton));
      if (audioSettings.autoplay) {
        autoplayTimer = setTimeout(() => playQuestionAudio(question, speakButton), 600);
      }
    }

    if (question.interaction === "clinician-score") {
      questionArea.querySelectorAll(".score-option").forEach(button => {
        button.addEventListener("click", () => submitAnswer(question, shownAt, {
          selected: `score_${button.dataset.score}`,
          correct_option: "score_2",
          score: Number(button.dataset.score),
          max_score: 2,
          cue_level: Number(document.getElementById("cue-level").value)
        }));
      });
      return;
    }

    questionArea.querySelectorAll(".option").forEach(button => {
      button.addEventListener("click", () => {
        const selected = button.dataset.option;
        return submitAnswer(question, shownAt, {
          selected,
          correct_option: question.correct,
          score: selected === question.correct ? 1 : 0,
          max_score: 1,
          cue_level: 0
        });
      });
    });
  }

  async function finishTest() {
    const totalPoints = answers.reduce((sum, answer) => sum + Number(answer.score || 0), 0);
    const maxPoints = answers.reduce((sum, answer) => sum + Number(answer.max_score || 1), 0);
    const correct = answers.filter(answer => answer.is_correct).length;
    const completedAt = new Date().toISOString();
    const { error } = await window.TSA_DB
      .from("test_sessions")
      .update({ status: "completed", completed_at: completedAt })
      .eq("id", sessionId);
    if (error) {
      console.error(error);
      showSaveError("Test tamamlandı ancak oturum durumu güncellenemedi: " + error.message);
      return;
    }
    const result = {
      participant_code: participantCode,
      session_id: sessionId,
      assessment_form: assessmentForm.id,
      form_label: assessmentForm.label,
      profile_label: assessmentForm.profileLabel,
      total: questions.length,
      correct,
      total_points: totalPoints,
      max_points: maxPoints,
      percentage: maxPoints ? Math.round((totalPoints / maxPoints) * 100) : 0,
      started_at: localStorage.getItem("tsa_started_at"),
      completed_at: completedAt,
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
