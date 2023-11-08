// Constantes para los criterios de ordenación
const ORDER_ASC_BY_NAME = "AZ";
const ORDER_DESC_BY_NAME = "ZA";
const ORDER_BY_PROD_COUNT = "Cant.";
// Arrays para almacenar datos y criterios de filtrado
let currentCategoriesArray = [];
let currentSortCriteria = undefined;
let minCount = undefined;
let maxCount = undefined;

// Función para ordenar las categorías según el criterio especificado
function sortCategories(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_NAME)
    {
        result = array.sort(function(a, b) {
            if ( a.name < b.name ){ return -1; }
            if ( a.name > b.name ){ return 1; }
            return 0; // Ordena los nombres de las catergorias ascendentemente (A-B)
        });
    }else if (criteria === ORDER_DESC_BY_NAME){
        result = array.sort(function(a, b) {
            if ( a.name > b.name ){ return -1; }
            if ( a.name < b.name ){ return 1; }
            return 0; // Ordena los nombres de las catergorias descendentemente (B-A)
        });
    }else if (criteria === ORDER_BY_PROD_COUNT){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.productCount);
            let bCount = parseInt(b.productCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0; // Ordena las categorias por la cantidad de productos
        });
    }

    return result;
}

// Función para establecer el ID de la categoría en el almacenamiento local y navegar a la página de productos
function setCatID(id) {
    localStorage.setItem("catID", id);
    window.location = "products.html"
}

// Función para mostrar la lista de categorías según el criterio de filtrado
function showCategoriesList(){

    let htmlContentToAppend = "";
    for(let i = 0; i < currentCategoriesArray.length; i++){
        let category = currentCategoriesArray[i];

        if (((minCount == undefined) || (minCount != undefined && parseInt(category.productCount) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(category.productCount) <= maxCount))){

            htmlContentToAppend += `
            <div class=" col-sm-12 col-md-6  col-lg-4 col-xl-3">
                <div onclick="setCatID(${category.id})" class="card h-100 " id="catList" >
                    <div class="imgContainer"><img src="${category.imgSrc}" class="card-img-top" alt="..."> </div>
                        <div class="card-body">
                            <h4 class="card-title">${category.name}</h4>
                            <p class="card-text">${category.description}</p>
                            <small class="text-muted">${category.productCount} artículos</small>
                        </div>
                    </div>
                </div>
            </div> 
            `
        }
        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
    }
}

// Función para ordenar y mostrar categorías
function sortAndShowCategories(sortCriteria, categoriesArray){
    currentSortCriteria = sortCriteria;

    if(categoriesArray != undefined){
        currentCategoriesArray = categoriesArray;
    }

    currentCategoriesArray = sortCategories(currentSortCriteria, currentCategoriesArray);

  
    showCategoriesList();
}


// Evento que se dispara cuando el documento se ha cargado
document.addEventListener("DOMContentLoaded", function(e){
        // Obtener datos de categorías desde una URL y mostrarlos
    getJSONData(CATEGORIES_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            currentCategoriesArray = resultObj.data
            showCategoriesList()
            
        }
    });
    // Evento para los botones de ordenar
    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowCategories(ORDER_ASC_BY_NAME);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowCategories(ORDER_DESC_BY_NAME);
    });

    document.getElementById("sortByCount").addEventListener("click", function(){
        sortAndShowCategories(ORDER_BY_PROD_COUNT);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showCategoriesList();
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
            minCount = parseInt(minCount);
        }
        else{
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
            maxCount = parseInt(maxCount);
        }
        else{
            maxCount = undefined;
        }

        showCategoriesList();
    });
});