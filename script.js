var filteredProduct = document.getElementById("myInput");
filteredProduct.addEventListener("change", (event) => {
  fetchApiData(event.target.value, true, false);
});

var filteredBrand = document.getElementById("brandList");
filteredBrand.addEventListener("change", (event) => {
  fetchApiData(filteredBrand.value, false, true);
});

function getProductBrand() {
  fetch("./data/products.json")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      const brandProduct = data.filter(
        (value, index, data) =>
          data.findIndex((t) => t.brand === value.brand) === index
      );

      document.getElementById("brandList").innerHTML = brandProduct.map(
        (item) => `<option value=${item.brand}>${item.brand}</option>`
      );
    })
    .catch((error) => {
      console.log("Falha ao carregar", error);
    });
}
getProductBrand();

function sortProduct(product, sortType) {
  switch (sortType) {
    case "Melhores Avaliados":
      return productssort((a, b) =>
        a.rating > b.rating ? 1 : a.rating < b.rating ? -1 : 0
      );
    case "Menores preços":
      a.price > b.price ? 1 : a.price < b.price ? -1 : 0;
    case "Maiores preços":
      a.price > b.price ? 1 : a.price < b.price ? -1 : 0;
    case "A-Z":
      a.name > b.name ? 1 : a.name < b.name ? -1 : 0;
    case "Z-A":
      a.name > b.name ? 1 : a.name < b.name ? -1 : 0;
  }
}

function fetchApiData(filter = "", byName, byBrand) {
  fetch("./data/products.json")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      console.log(filter, byName, byBrand);

      if (byName) {
        document.getElementById("listProducts").innerHTML = data
          .filter((item) => item.name.includes(filter))
          .map(
            (item) =>
              `<div class="productsShow>
          <figure class="productImage">
          <img src=${item.api_featured_image}>
          </figure>
          <section>
          <h3>${item.description}</h3>
          <div class="productsBrand">
          <span class="productBrand">${item.name}</span>
          <span class="productBrandPrice">R$ ${(item.price * 5.5).toFixed(
            2
          )}</span>
            </div>
            </section>
            </div>`
          )
          .join("");
      }
      if (byBrand) {
        document.getElementById("listProducts").innerHTML = data
          .filter((item) => item.brand === filter)
          .map(
            (item) =>
              `<div class="productsShow>
              <figure class="productImage">
              <img src=${item.api_featured_image}>
              </figure>
              <section>
              <h3>${item.description}</h3>
              <div class="productsBrand">
              <span class="productBrand">${item.name}</span>
              <span class="productBrandPrice">R$ ${(item.price * 5.5).toFixed(
                2
              )}</span>
                </div>
                </section>
                </div>`
          )
          .join("");
      }
    })
    .catch((error) => {
      console.log("Falha ao carregar", error);
    });
}

fetchApiData("", true);
