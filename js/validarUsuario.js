window.addEventListener("load", function () {
  const user = sessionStorage.getItem("user");
  if (!user) {
    window.location.href = "../components/Login/index.html";
  }
});
