(() => {
  let result;
  try {
    result = JSON.parse(localStorage.getItem("tsa_result") || "null");
  } catch {
    result = null;
  }
  if (!result) {
    window.location.href = "index.html";
    return;
  }

  const forms = window.TSA_FORMS || {};
  const assessmentForm = forms[result.assessment_form] || forms[window.TSA_DEFAULT_FORM];
  const questions = assessmentForm?.questions || window.TSA_QUESTIONS || [];
  const questionMap = new Map(questions.map(question => [question.id, question]));
  const totalPoints = result.total_points ?? result.correct ?? 0;
  const maxPoints = result.max_points ?? result.total ?? 0;

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  document.getElementById("result-title").textContent = `${result.participant_code} • Sonuç`;
  document.getElementById("result-form").textContent =
    `${result.profile_label || assessmentForm?.profileLabel || "Dil profili"} • ${result.form_label || assessmentForm?.label || ""}`;
  document.getElementById("score-number").textContent = `${result.percentage}%`;
  document.getElementById("score-detail").textContent = `${totalPoints} / ${maxPoints} ham puan`;

  const grouped = {};
  result.answers.forEach(answer => {
    if (!grouped[answer.category]) grouped[answer.category] = { points: 0, maxPoints: 0 };
    grouped[answer.category].points += Number(answer.score ?? (answer.is_correct ? 1 : 0));
    grouped[answer.category].maxPoints += Number(answer.max_score ?? 1);
  });

  document.getElementById("category-results").innerHTML =
    Object.entries(grouped).map(([category, data]) => {
      const percent = data.maxPoints ? Math.round((data.points / data.maxPoints) * 100) : 0;
      return `
        <div class="category-item">
          <span>${escapeHtml(category)}</span>
          <strong>${percent}%</strong>
          <small>${data.points} / ${data.maxPoints} ham puan</small>
        </div>`;
    }).join("");

  document.getElementById("review-list").innerHTML =
    result.answers.map((answer, index) => {
      const question = questionMap.get(answer.question_id);
      const isClinicianScore = answer.response_kind === "clinician-score" ||
        question?.interaction === "clinician-score";
      const score = Number(answer.score ?? (answer.is_correct ? 1 : 0));
      const maxScore = Number(answer.max_score ?? 1);
      const selected = question?.options?.find(option => option.id === answer.selected)?.label || answer.selected;
      const status = isClinicianScore
        ? (score === maxScore ? "Doğru" : score > 0 ? "Kısmen doğru" : "Yanlış / yanıtsız")
        : (answer.is_correct ? "Doğru" : "Yanlış");
      const detail = isClinicianScore
        ? `Puan: ${score} / ${maxScore} • Yardım düzeyi: ${answer.cue_level ?? 0}`
        : `Yanıt: ${escapeHtml(selected)}`;
      const responseSeconds = Number(answer.response_time_ms || 0) / 1000;
      return `
        <div class="review-item">
          <span class="badge ${score === maxScore ? "ok" : score > 0 ? "partial" : "no"}">
            ${score === maxScore ? "✓" : score > 0 ? "½" : "×"}
          </span>
          <div>
            <strong>${index + 1}. ${escapeHtml(question?.prompt || answer.question_id)}</strong>
            <br>
            <small>${detail} • Tepki: ${responseSeconds.toFixed(2)} sn • Yeniden dinleme: ${answer.replay_count ?? 0}</small>
          </div>
          <span class="review-status">${status}</span>
        </div>`;
    }).join("");
})();
