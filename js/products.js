let url = "https://japceibal.github.io/emercado-api/cats_products/101.json";

async function fetchMovies() {
  const { data } = await getJSONData(url);
  let htmlContentToAppend = "";
  for (const category of data.products) {
    htmlContentToAppend += `
    <div class="list-group-item list-group-item-action">
        <div class="row">
            <div class="col-3">
                <img src="` + category.image + `" alt="product image" class="img-thumbnail">
            </div>
            <div class="col">
                <div class="d-flex w-100 justify-content-between">
                    <div class="mb-1">
                    <h4>`+ category.name +` - ${category.currency} ${category.cost}</h4> 
                    <p> `+ category.description +`</p> 
                    </div>
                    <small class="text-muted">` + category.soldCount + ` vendidos</small> 
                </div>

            </div>
        </div>
    </div>`;
    document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
  }
}
fetchMovies();
