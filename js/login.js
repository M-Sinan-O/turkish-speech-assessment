(() => {
  const form = document.getElementById("login-form");
  const button = document.getElementById("login-button");
  const githubButton = document.getElementById("github-login");
  const message = document.getElementById("login-message");

  function showMessage(text, isError = false) {
    message.hidden = false;
    message.textContent = text;
    message.style.color = isError ? "#b42318" : "#157347";
  }

  async function redirectIfSignedIn() {
    const { data } = await window.TSA_DB.auth.getSession();
    if (data.session) {
      window.location.href = "index.html";
    }
  }

  githubButton.addEventListener("click", async () => {
    message.hidden = true;
    githubButton.disabled = true;
    githubButton.textContent = "GitHub'a yönlendiriliyor...";

    const redirectTo = new URL("index.html", window.location.href).href;
    const { error } = await window.TSA_DB.auth.signInWithOAuth({
      provider: "github",
      options: { redirectTo }
    });

    if (error) {
      githubButton.disabled = false;
      githubButton.textContent = "GitHub ile Giriş Yap";
      showMessage("GitHub girişi başlatılamadı: " + error.message, true);
    }
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    message.hidden = true;
    button.disabled = true;
    button.textContent = "Giriş yapılıyor...";

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    const { error } = await window.TSA_DB.auth.signInWithPassword({
      email,
      password
    });

    button.disabled = false;
    button.textContent = "E-posta ile Giriş Yap";

    if (error) {
      showMessage("Giriş başarısız: " + error.message, true);
      return;
    }

    window.location.href = "index.html";
  });

  redirectIfSignedIn();
})();
