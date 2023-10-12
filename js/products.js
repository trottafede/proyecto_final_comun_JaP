let catID = localStorage.getItem("catID");
let url = `https://japceibal.github.io/emercado-api/cats_products/${catID}.json`;

const ORDER_ASC_BY_NAME = "AZ";
const ORDER_DESC_BY_NAME = "ZA";
const ORDER_BY_PROD_COUNT = "Cant.";
let currentCategoriesArray = [];
let currentSortCriteria = undefined;
let minCount = undefined;
let maxCount = undefined;
//Cant.

//
function sortCategories(criteria, array) {
  let result = [];
  if (criteria === ORDER_ASC_BY_NAME) {
    result = array.sort(function (a, b) {
      if (a.cost < b.cost) {
        return -1;
      }
      if (a.cost > b.cost) {
        return 1;
      }
      return 0;
    });
  } else if (criteria === ORDER_DESC_BY_NAME) {
    result = array.sort(function (a, b) {
      if (a.cost > b.cost) {
        return -1;
      }
      if (a.cost < b.cost) {
        return 1;
      }
      return 0;
    });
  } else if (criteria === ORDER_BY_PROD_COUNT) {
    result = array.sort(function (a, b) {
      let aCount = parseInt(a.soldCount);
      let bCount = parseInt(b.soldCount);

      if (aCount > bCount) {
        return -1;
      }
      if (aCount < bCount) {
        return 1;
      }
      return 0;
    });
  }

  return result;
}

function setProdID(id) {
  localStorage.setItem("prodID", id);
  window.location = "product-info.html";
}

function showCategoriesList(products) {
  let htmlContentToAppend = "";
  for (let i = 0; i < products.length; i++) {
    let category = products[i];
    if (
      (minCount == undefined ||
        (minCount != undefined && parseInt(category.cost) >= minCount)) &&
      (maxCount == undefined ||
        (maxCount != undefined && parseInt(category.cost) <= maxCount))
    ) {
      htmlContentToAppend += `
      <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-4 col-xxl-3">
        <div onclick="setProdID(${category.id})" class="card h-100 "  >
              <img src="${category.image}" class="card-img-top" alt="${category.name}">
              <div class="card-body">
                  <h5 class="card-title">${category.name}</h5>
                  <p class="card-text">$${category.cost}</p>
                  <p class="card-text">${category.description}</p>
              </div>
            </div>
        </div>
      </div>`
    }
    document.getElementById("cat-list-container").innerHTML =
      htmlContentToAppend;
  }
}

function sortAndShowCategories(sortCriteria, categoriesArray) {
  currentSortCriteria = sortCriteria;
  if (categoriesArray != undefined) {
    currentCategoriesArray = categoriesArray;
  }
  currentCategoriesArray = sortCategories(
    currentSortCriteria,
    currentCategoriesArray
  );
  //Muestro las categorías ordenadas
  showCategoriesList(currentCategoriesArray);
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(url).then(function (resultObj) {
    if (resultObj.status === "ok") {
      currentCategoriesArray = resultObj.data.products;
      let text = `Veras aqui todos los productos de la categoria ${resultObj.data.catName}`;
      document.getElementById("titulo").innerHTML = text;
      showCategoriesList(currentCategoriesArray);
      searchButtonLogic();
      sortAndShowCategories(ORDER_ASC_BY_NAME, resultObj.data.products);
    }
  });

  document.getElementById("sortAsc").addEventListener("click", function () {
    sortAndShowCategories(ORDER_ASC_BY_NAME);
  });

  document.getElementById("sortDesc").addEventListener("click", function () {
    sortAndShowCategories(ORDER_DESC_BY_NAME);
  });

  document.getElementById("sortByCount").addEventListener("click", function () {
    sortAndShowCategories(ORDER_BY_PROD_COUNT);
  });

  document
    .getElementById("clearRangeFilter")
    .addEventListener("click", function () {
      document.getElementById("rangeFilterCountMin").value = "";
      document.getElementById("rangeFilterCountMax").value = "";

      minCount = undefined;
      maxCount = undefined;

      showCategoriesList(currentCategoriesArray);
    });

  document
    .getElementById("rangeFilterCount")
    .addEventListener("click", function () {
      //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
      //de productos por categoría.
      minCount = document.getElementById("rangeFilterCountMin").value;
      maxCount = document.getElementById("rangeFilterCountMax").value;

      if (minCount != undefined && minCount != "" && parseInt(minCount) >= 0) {
        minCount = parseInt(minCount);
      } else {
        minCount = undefined;
      }

      if (maxCount != undefined && maxCount != "" && parseInt(maxCount) >= 0) {
        maxCount = parseInt(maxCount);
      } else {
        maxCount = undefined;
      }

      showCategoriesList(currentCategoriesArray);
    });
});

const searchButtonLogic = () => {
  let dataListOptions = "";
  for (const category of currentCategoriesArray) {
    dataListOptions += `<option value="${category.name}"></option>`;
  }

  console.log(currentCategoriesArray);
  searchButton = ` 
    <input id="searchInput" class="form-control" list="datalistOptions" id="exampleDataList" placeholder="Buscar productos">
    <datalist id="datalistOptions">
        ${dataListOptions}
    </datalist>`;

  //mandar el boton al html
  document.getElementById("searchContainer").innerHTML = searchButton;
  document
    .getElementById("searchInput")
    .addEventListener("input", handleSearch);
};

const handleSearch = () => {
  const searchText = document.getElementById("searchInput").value;
  //filtrar
  const result = currentCategoriesArray.filter(
    (product) => product.name.toLowerCase().includes(searchText) || product.description.toLowerCase().includes(searchText)
  );
  showCategoriesList(result);
};
