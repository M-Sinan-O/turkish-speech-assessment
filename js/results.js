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

  const questions = window.TSA_QUESTIONS || [];
  const questionMap = new Map(questions.map(q => [q.id, q]));

  document.getElementById("result-title").textContent =
    `${result.participant_code} • Sonuç`;
  document.getElementById("score-number").textContent =
    `${result.percentage}%`;
  document.getElementById("score-detail").textContent =
    `${result.correct} / ${result.total} doğru`;

  const grouped = {};
  result.answers.forEach(answer => {
    if (!grouped[answer.category]) grouped[answer.category] = { total: 0, correct: 0 };
    grouped[answer.category].total += 1;
    if (answer.is_correct) grouped[answer.category].correct += 1;
  });

  document.getElementById("category-results").innerHTML =
    Object.entries(grouped).map(([category, data]) => {
      const percent = Math.round((data.correct / data.total) * 100);
      return `
        <div class="category-item">
          <span>${category}</span>
          <strong>${percent}%</strong>
          <small>${data.correct} / ${data.total}</small>
        </div>
      `;
    }).join("");

  document.getElementById("review-list").innerHTML =
    result.answers.map((answer, i) => {
      const q = questionMap.get(answer.question_id);
      const selected = q?.options.find(o => o.id === answer.selected)?.label || answer.selected;
      return `
        <div class="review-item">
          <span class="badge ${answer.is_correct ? "ok" : "no"}">
            ${answer.is_correct ? "✓" : "×"}
          </span>
          <div>
            <strong>${i + 1}. ${q?.prompt || answer.question_id}</strong>
            <br>
            <small>Yanıt: ${selected} • Tepki: ${(answer.response_time_ms / 1000).toFixed(2)} sn</small>
          </div>
          <span class="review-status">${answer.is_correct ? "Doğru" : "Yanlış"}</span>
        </div>
      `;
    }).join("");
})();