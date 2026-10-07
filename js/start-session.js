(() => {
  const form = document.getElementById("start-form");
  const button = document.getElementById("start-button");
  const message = document.getElementById("db-message");

  function showMessage(text) {
    message.hidden = false;
    message.textContent = text;
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    message.hidden = true;
    button.disabled = true;
    button.textContent = "Oturum hazırlanıyor...";

    try {
      const code = document.getElementById("participant-code").value.trim().toUpperCase();
      const assessmentForm = document.getElementById("assessment-form").value;
      if (!/^[A-Z0-9_-]{2,20}$/.test(code)) {
        throw new Error("Katılımcı kodu yalnızca harf, rakam, _ veya - içermelidir.");
      }
      if (!["early_2_3", "child_4_7"].includes(assessmentForm)) {
        throw new Error("Geçerli bir yaş formu seçin.");
      }

      const { data: authData, error: authError } = await window.TSA_DB.auth.getUser();
      if (authError || !authData.user) {
        window.location.href = "login.html";
        return;
      }
      const user = authData.user;

      let { data: participant, error: participantError } = await window.TSA_DB
        .from("participants")
        .select("id, code")
        .eq("code", code)
        .maybeSingle();

      if (participantError) throw participantError;

      if (!participant) {
        const insertResult = await window.TSA_DB
          .from("participants")
          .insert({ code, created_by: user.id })
          .select("id, code")
          .single();

        if (insertResult.error) throw insertResult.error;
        participant = insertResult.data;
      }

      let { data: session, error: sessionError } = await window.TSA_DB
        .from("test_sessions")
        .insert({
          participant_id: participant.id,
          created_by: user.id,
          status: "in_progress",
          assessment_form: assessmentForm
        })
        .select("id, started_at")
        .single();

      // Eski kurulumu kullanan veritabanlarında form sütunu henüz bulunmayabilir.
      // Oturumu yine başlatır; kurulum notundaki geçiş SQL'i daha sonra uygulanmalıdır.
      if (sessionError && /assessment_form|schema cache|column/i.test(sessionError.message || "")) {
        const fallback = await window.TSA_DB
          .from("test_sessions")
          .insert({
            participant_id: participant.id,
            created_by: user.id,
            status: "in_progress"
          })
          .select("id, started_at")
          .single();
        session = fallback.data;
        sessionError = fallback.error;
      }

      if (sessionError) throw sessionError;

      localStorage.setItem("tsa_participant_code", code);
      localStorage.setItem("tsa_participant_id", participant.id);
      localStorage.setItem("tsa_session_id", session.id);
      localStorage.setItem("tsa_started_at", session.started_at);
      localStorage.setItem("tsa_assessment_form", assessmentForm);
      localStorage.removeItem("tsa_answers");
      localStorage.removeItem("tsa_result");

      window.location.href = "test.html";
    } catch (error) {
      console.error(error);
      showMessage("Oturum başlatılamadı: " + (error.message || error));
      button.disabled = false;
      button.textContent = "Teste Başla";
    }
  });
})();
