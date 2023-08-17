document.addEventListener("DOMContentLoaded", () => {
  const user = sessionStorage.getItem("user");
  if (!user) {
    window.location.href = "../components/Login/login.html";
  }
});
