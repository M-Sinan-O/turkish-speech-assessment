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
      if (!/^[A-Z0-9_-]{2,20}$/.test(code)) {
        throw new Error("Katılımcı kodu yalnızca harf, rakam, _ veya - içermelidir.");
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

      const { data: session, error: sessionError } = await window.TSA_DB
        .from("test_sessions")
        .insert({
          participant_id: participant.id,
          created_by: user.id,
          status: "in_progress"
        })
        .select("id, started_at")
        .single();

      if (sessionError) throw sessionError;

      localStorage.setItem("tsa_participant_code", code);
      localStorage.setItem("tsa_participant_id", participant.id);
      localStorage.setItem("tsa_session_id", session.id);
      localStorage.setItem("tsa_started_at", session.started_at);
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
