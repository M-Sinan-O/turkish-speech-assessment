(() => {
  const form = document.getElementById("login-form");
  const button = document.getElementById("login-button");
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
    button.textContent = "Giriş Yap";

    if (error) {
      showMessage("Giriş başarısız: " + error.message, true);
      return;
    }

    window.location.href = "index.html";
  });

  redirectIfSignedIn();
})();
