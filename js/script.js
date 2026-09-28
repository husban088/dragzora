window.onload = function () {
  let userName = localStorage.getItem("name");

  document.querySelector(".sign__inw").innerHTML = userName;
};

const btn = document.getElementsByClassName("prod__btn");

const products = [];

window.addEventListener("load", function () {
  for (var i = 0; i < btn.length; i++) {
    let cartBtn = btn[i];
    cartBtn.addEventListener("click", (event) => {
      // Get the price from the clicked product
      let priceElement =
        event.target.parentElement.parentElement.querySelector(".prod__price");

      // Extract the price text
      let priceText = priceElement.textContent.trim();

      // Remove any non-numeric characters from the price text
      let priceNumeric = priceText.replace(/\D/g, "");

      // Convert the price to a number
      let price = parseFloat(priceNumeric);

      let product = {
        image:
          event.target.parentElement.parentElement.children[0].children[0].src,
        name: event.target.parentElement.parentElement.children[1].children[0]
          .textContent,
        price: price,
        totalPrice: price,
        quantity: 1,
      };

      console.log(product);
      console.log("working");

      addItemToLocal(product);
    });
  }
});

// Passing product(the one we created above) in the addItemToLocal
function addItemToLocal(product) {
  // this line of code says that there is something in array or there is an emtpy array
  let cartItem = JSON.parse(localStorage.getItem("prdInCart")) || [];
  let found = false;

  // HERE ALSO I USED FOREACH YOU SHOULD ALSO USE THIS
  cartItem.forEach((item) => {
    if (product.name === item.name) {
      // now check if the product name and the item name matche if it does then
      // add the quantiity
      // update the total price
      // and set true the found
      item.quantity++;
      item.totalPrice += product.price;
      found = true;
    }
  });

  if (!found) {
    cartItem.push(product);
  }

  localStorage.setItem("prdInCart", JSON.stringify(cartItem));
  cartNumberDisplay();
  location.href = "#cart__side";
  window.location.reload();
}

function cartNumberDisplay() {
  let cartItem = JSON.parse(localStorage.getItem("prdInCart")) || [];
  let cartNumbers = cartItem.reduce((acc, item) => acc + item.quantity, 0);
  document.querySelector("#cart__count").textContent = cartNumbers;
  document.querySelector(".cart__counte").textContent = cartNumbers;
}

let subtotal = document.querySelector(".subtotal");
let priceView = document.querySelector(".priceView");
let continue__button = document.querySelector(".continue__button");
let empty__head = document.querySelector(".empty__head");
let buy__btn = document.querySelector(".buy__btn");
let end__button = document.querySelector(".end__button");

function dispCartItem() {
  let html = "";
  let cartItem = JSON.parse(localStorage.getItem("prdInCart")) || [];
  cartItem.forEach((item) => {
    html += `
        <div class="cartlist">
          <img src="${item.image}" alt="" id='cart__image'>
          <h3 class='cart__name'>${item.name}</h3>
          <h3 class='cart__price'>Rs, ${item.price}</h3>
          <div class="quan__boxes">
            <input type='button' name='quan' class="min__btn" value='-'>
            <input type="number" class='cart__quan' value="${item.quantity}" readonly>
            <input type='button' name='quan' class="pl__btn" value='+'>
          </div>
          <h3 class='cart__tot'>Rs, ${item.totalPrice}</h3>
          <div class="remove__icon">
            <i class="fa-solid fa-xmark reoveItem"></i>
          </div>
        </div>`;
  });
  document.querySelector(".cartdisp").innerHTML = html;

  if (html.length === 0) {
    buy__btn.style.display = "none";
    subtotal.style.display = "none";
    priceView.style.display = "none";
    continue__button.style.display = "block";
    empty__head.style.display = "block";
    end__button.style.display = "none";
  } else {
    buy__btn.style.display = "block";
    subtotal.style.display = "block";
    priceView.style.display = "block";
    continue__button.style.display = "none";
    empty__head.style.display = "none";
    end__button.style.display = "block";
  }
}
dispCartItem();

// HERE IS THE INCREMENT AND DECREMENT FUNCTIONALITY

// Selecting all the .pl__btn as there are alots of items card
// Keep remeber when we have more than one elements in our HTML we use querrySelectorAll to get them
// and then we use forEach method to get data from it.

document.querySelectorAll(".pl__btn").forEach((btn) => {
  // now exactly in our previous addToCart btn here we are getting the btn (for each of the item card)
  btn.addEventListener("click", (event) => {
    // the input value is the one that gets added after clicking the plus btn
    let input = event.target.parentElement.querySelector(".cart__quan");
    // converted the input value to numerice value..
    input.value = parseInt(input.value) + 1;
    // Function for updating the quantity
    updateQuantity(input);
  });
});

// NOW HERE IS THE DECREMENT FUNCTIONLAITY

// Exactly same here we are also selecting all the min__btn as there are alot of item cards
document.querySelectorAll(".min__btn").forEach((btn) => {
  btn.addEventListener("click", (event) => {
    let input = event.target.parentElement.querySelector(".cart__quan");
    // Here we are saying that if the input value is greater then one then decrement otherwise don't
    if (parseInt(input.value) > 1) {
      input.value = parseInt(input.value) - 1;
      updateQuantity(input);
    }
  });
});

// NOW THIS IS THE FUNCTINO TO UPDATES THE QUANTITY WE ARE DOING IT ONLY FOR TOTAL

function updateQuantity(input) {
  // 1) first getting the cartItem from the locastorage
  let cartItem = JSON.parse(localStorage.getItem("prdInCart")) || [];
  // 2) second getting the name of the item from the HTML
  let itemName =
    input.parentElement.parentElement.querySelector(".cart__name").textContent;
  // 3) than we are using find method that if there is the item.name(from the localstorage) and the itemName(from the HTML) are same
  let item = cartItem.find((item) => item.name === itemName);
  // 4) then take the item.quantity
  item.quantity = parseInt(input.value);
  // 5) and update the totlPrice by multiplying the item.price with the quantity number
  item.totalPrice = item.price * item.quantity;
  // 6) lasting updating the cartItme in the locastorage
  localStorage.setItem("prdInCart", JSON.stringify(cartItem));
  cartNumberDisplay();
  cartPrice();
}

function cartPrice() {
  let cartItem = JSON.parse(localStorage.getItem("prdInCart")) || [];
  let subTotal = cartItem.reduce((acc, item) => acc + item.totalPrice, 0);
  document.querySelector(".total__price").textContent = subTotal;
}

document.querySelectorAll(".reoveItem").forEach((removeBtn) => {
  removeBtn.addEventListener("click", () => {
    let cartItem = JSON.parse(localStorage.getItem("prdInCart")) || [];
    let itemName =
      removeBtn.parentElement.parentElement.querySelector(
        ".cart__name"
      ).textContent;
    let updatedCart = cartItem.filter((item) => item.name !== itemName);
    localStorage.setItem("prdInCart", JSON.stringify(updatedCart));
    dispCartItem();
    cartNumberDisplay();
    cartPrice();
    window.location.reload();
  });
});

cartNumberDisplay();
cartPrice();

function serach() {
  let filter = document.getElementById("searchBar").value.toUpperCase();
  let itemss = document.querySelectorAll(".prod__box");
  let l = document.querySelectorAll(".prod__name");
  for (var i = 0; i <= l.length; i++) {
    let a = itemss[i].querySelectorAll(".prod__name")[0];
    let value = a.innerHTML || a.innerText || a.textContent;
    if (value.toUpperCase().indexOf(filter) > -1) {
      itemss[i].style.display = "";
    } else {
      itemss[i].style.display = "none";
    }
  }
}

document.addEventListener("DOMContentLoaded", function () {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartDisplay = document.querySelector(".cartdisp");
  const cartCount = document.getElementById("cart__count");
  const totalPriceElement = document.querySelector(".total__price");
  const subtotal = document.querySelector(".subtotal");
  const priceView = document.querySelector(".priceView");
  const buyBtn = document.querySelector(".buy__btn");
  const endButton = document.querySelector(".end__button");

  // Add event listeners to all "Add to Cart" buttons
  document.querySelectorAll(".prod__btn").forEach((button, index) => {
    button.addEventListener("click", () => {
      const productBox = button.closest(".prod__box");
      const name = productBox.querySelector(".prod__name").textContent;
      const price = parseInt(
        productBox.querySelector(".prod__price").textContent
      );
      const image = productBox.querySelector(".prod__img").src;

      addToCart(name, price, image);
    });
  });

  function addToCart(name, price, image) {
    let existingItem = cart.find((item) => item.name === name);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ name, price, image, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartUI();
  }

  function updateCartUI() {
    cartDisplay.innerHTML = "";
    let total = 0;
    cart.forEach((item, index) => {
      total += item.price * item.quantity;
      cartDisplay.innerHTML += `
                <div class="cartlist">
                  <img src="${item.image}" alt="${item.name}" id="cart__image"/>
                    <p class="cart__name">${item.name}</p>
                    <h3 class='cart__price'>Rs,${item.price}</h3>
                    <div class="quan__boxes">
                      <button class="decrease min__btn" data-index="${index}">-</button>
                      <span class='cart__quan'>${item.quantity}</span>
                      <button class="increase pl__btn" data-index="${index}">+</button>
                    </div>
           <div class="remove__icon">
                      <i class="fa-solid fa-xmark reoveItem remove" data-index="${index}"></i>
                       </div>
                </div>


              `;
    });

    totalPriceElement.textContent = total;
    cartCount.textContent = cart.length;
    subtotal.style.display = cart.length > 0 ? "block" : "none";
    priceView.style.display = cart.length > 0 ? "block" : "none";
    buyBtn.style.display = cart.length > 0 ? "block" : "none";
    endButton.style.display = cart.length > 0 ? "block" : "none";

    attachCartEventListeners();
  }

  function attachCartEventListeners() {
    document.querySelectorAll(".increase").forEach((button) => {
      button.addEventListener("click", (e) => {
        const index = e.target.dataset.index;
        cart[index].quantity += 1;
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartUI();
      });
    });

    document.querySelectorAll(".decrease").forEach((button) => {
      button.addEventListener("click", (e) => {
        const index = e.target.dataset.index;
        if (cart[index].quantity > 1) {
          cart[index].quantity -= 1;
        } else {
          cart.splice(index, 1);
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartUI();
      });
    });

    document.querySelectorAll(".remove").forEach((button) => {
      button.addEventListener("click", (e) => {
        const index = e.target.dataset.index;
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartUI();
      });
    });
  }

  updateCartUI();
});
