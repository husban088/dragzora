var productList = [];

let imagePreview = document.querySelector("#imagePreview");

let imageInput = document.querySelector("#imageInput");

imageInput.onchange = function () {
  var file = imageInput.files[0];
  var reader = new FileReader();

  reader.onload = function () {
    imagePreview.src = reader.result;
  };

  if (file) {
    reader.readAsDataURL(file);
  }
};

function addProduct(event) {
  event.preventDefault();

  var productName = document.getElementById("productName").value;
  var productPrice = document.getElementById("productPrice").value;
  // var productSize = document.getElementById('productSize').value;
  var imagePreview = document.getElementById("imagePreview").src;

  var product = {
    name: productName,
    price: productPrice,
    // size: productSize,
    image: imagePreview,
  };

  productList.push(product);
  localStorage.setItem("productsList", JSON.stringify(productList));
  const productArr = JSON.parse(localStorage.getItem("productsList"));
  productArr.forEach((el) => console.log(el.name));

  displayProducts();
  resetForm();
}

function displayProducts() {
  var productListContainer = document.getElementById("productList");
  productListContainer.innerHTML = "";

  const productArr = JSON.parse(localStorage.getItem("productsList"));

  if (!productArr || productArr.length === 0) {
    var noProductMessage = document.createElement("p");
    noProductMessage.textContent = "No products added yet.";
    productListContainer.appendChild(noProductMessage);
    return; // Exit the function if there are no products
  }

  productArr.forEach((product) => {
    var productCard = document.createElement("div");
    productCard.classList.add("product-card");

    var productImage = document.createElement("img");
    productImage.src = product.image;
    productImage.alt = product.name;
    productCard.appendChild(productImage);

    // localStorage.setItem("productImage", product.image);

    productImage.style.width = "25rem";
    productImage.style.height = "25rem";
    productImage.style.objectFit = "contain";
    productImage.style.backgroundSize = "contain";
    productImage.style.borderRadius = "5px";
    productImage.style.backgroundPosition = "center";

    productImage.classList.add("product__pics");

    var productName = document.createElement("h3");
    productName.textContent = product.name;
    productCard.appendChild(productName);

    localStorage.setItem("productName", product.name);

    productName.classList.add("product__prizee");

    var productPrice = document.createElement("p");
    productPrice.textContent = "Rs, " + product.price;
    productCard.appendChild(productPrice);

    var productPrice = document.createElement("p");
    productPrice.textContent = "★★★★★";
    productCard.appendChild(productPrice);

    productPrice.classList.add("prod__price");

    productPrice.classList.add("prod__prices");

    // var productButton = document.createElement('p');
    // productButton.textContent = "Add to cart";
    // productCard.appendChild(productButton);

    // productButton.classList.add("prod__btn");

    // var productSize = document.createElement('p');
    // productSize.textContent = product.size;
    // productCard.appendChild(productSize);

    // var productButton = document.createElement('button');
    // productButton.textContent = 'Add to cart';
    // productCard.appendChild(productButton);

    // productButton.classList.add("prod__btn");

    var deleteButton = document.createElement("icon");
    deleteButton.innerHTML = '<i class="fa-solid fa-xmark"></i>';

    deleteButton.style.backgroundColor = "#000";
    deleteButton.style.padding = "0.5rem 1.1rem";
    deleteButton.style.color = "#fff";
    deleteButton.style.borderRadius = "50%";
    deleteButton.style.border = "none";
    deleteButton.style.outline = "none";
    deleteButton.style.cursor = "pointer";
    deleteButton.classList.add("delete__btn");

    deleteButton.addEventListener("click", function () {
      deleteProduct(productArr.indexOf(product));
    });
    productCard.appendChild(deleteButton);

    productListContainer.appendChild(productCard);
  });
}

function resetForm() {
  document.getElementById("productForm").reset();
  document.getElementById("imagePreview").src = "images/profileimg.webp";
}

function editProduct(product) {
  var newImage = document.getElementById("imagePreview").src;
  product.image = newImage;
}

function deleteProduct(index) {
  if (index > -1) {
    productList.splice(index, 1);
    localStorage.setItem("productsList", JSON.stringify(productList));
    displayProducts();
  }
}

displayProducts();

function prodSearc() {
  let filter = document.getElementById("searchBar").value.toUpperCase();
  let itemss = document.querySelectorAll(".product-card");
  let l = document.querySelectorAll(".product__prizee");
  for (var i = 0; i <= l.length; i++) {
    let a = itemss[i].querySelectorAll(".product__prizee")[0];
    let value = a.innerHTML || a.innerText || a.textContent;
    if (value.toUpperCase().indexOf(filter) > -1) {
      itemss[i].style.display = "";
    } else {
      itemss[i].style.display = "none";
    }
  }
}
