const CATEGORIES_URL = "https://jap-commerce-backend.vercel.app/cats/cat.json";
const PUBLISH_PRODUCT_URL =
  "https://jap-commerce-backend.vercel.app/sell/publish.json";
const PRODUCTS_URL = "https://jap-commerce-backend.vercel.app/cats_products/";
const PRODUCT_INFO_URL = "https://jap-commerce-backend.vercel.app/products/";
const PRODUCT_INFO_COMMENTS_URL =
  "https://jap-commerce-backend.vercel.app/products_comments/";
const CART_INFO_URL = "https://jap-commerce-backend.vercel.app/user_cart/";
const CART_BUY_URL = "https://jap-commerce-backend.vercel.app/cart/buy.json";
const EXT_TYPE = ".json";

let showSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "block";
};

let hideSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "none";
};

let getJSONData = function (url) {
  let result = {};
  showSpinner();
  return fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function (response) {
      result.status = "ok";
      result.data = response;
      hideSpinner();
      return result;
    })
    .catch(function (error) {
      result.status = "error";
      result.data = error;
      hideSpinner();
      return result;
    });
};
