window.addEventListener("load", function () {
  const user = sessionStorage.getItem("user");
  console.log(user);
  if (!user) {
    this.alert("Logueate porfavor")
    window.location.href = "../components/Login/index.html";
  }
});
