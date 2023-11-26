document.addEventListener("DOMContentLoaded", async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  let token = user.token;
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch("https://jap-commerce-backend.vercel.app/cart", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      if (result.status != "ok") {
        window.location.href = "./noAccess.html";
      }
    })
    .catch((error) => console.log("error", error));
});
