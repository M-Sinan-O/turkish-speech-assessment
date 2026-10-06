(() => {
  async function requireAuth() {
    const { data } = await window.TSA_DB.auth.getSession();

    if (!data.session) {
      window.location.href = "login.html";
      return null;
    }

    return data.session.user;
  }

  async function init() {
    const user = await requireAuth();
    if (!user) return;

    const userLabel = document.getElementById("current-user");
    if (userLabel) {
      userLabel.textContent = user.email || "Yetkili kullanıcı";
    }

    const logoutButton = document.getElementById("logout-button");
    if (logoutButton) {
      logoutButton.addEventListener("click", async () => {
        await window.TSA_DB.auth.signOut();
        window.location.href = "login.html";
      });
    }
  }

  init();
})();
