window.onload = function () {
  let userName = localStorage.getItem("name");
  document.querySelector(".sign__inw").innerHTML = userName;
};

// Creating the Products Array
const products = [];

// Modify the event listener for the "Add to cart" button

//Selecting all the prod__btn as there are going to be alots of items card
document.querySelectorAll(".prod__btn").forEach((cartBtn) => {
  // naming each .prod__btn as the cartBtn....  YOU SHOULD USE THE FOREACH METHOD INSTEAD OF FOR LOOP
  cartBtn.addEventListener("click", (event) => {
    // Taking the priceELement
    let priceElement =
      event.target.parentElement.parentElement.querySelector(".prod__price");
    // Taking the priceText
    let priceText = priceElement.textContent.trim();
    // and then parseFlaot it to convert it to a number from a string
    let price = parseFloat(priceText);

    // Creating product object which we will pass in the products Array
    let product = {
      image:
        event.target.parentElement.parentElement.querySelector(".prod__img")
          .src,
      name: event.target.parentElement.parentElement.querySelector(
        ".prod__name",
      ).textContent,
      price: price,
      totalPrice: price,
      quantity: 1,
    };

    //Calling the addItemToLocal function
    addItemToLocal(product);
  });
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
}

function cartNumberDisplay() {
  let cartItem = JSON.parse(localStorage.getItem("prdInCart")) || [];
  let cartNumbers = cartItem.reduce((acc, item) => acc + item.quantity, 0);
  document.querySelector("#cart__count").textContent = cartNumbers;
  document.querySelector(".cart__counte").textContent = cartNumbers;
}

let check__button = document.querySelector(".check__button");

let continue__button = document.querySelector(".continue__button");
let empty__head = document.querySelector(".empty__head");
let cart__details = document.querySelector(".cart__details");
let cart__head = document.querySelector(".cart__head");
let subtotal = document.querySelector(".subtotal");
let priceView = document.querySelector(".priceView");

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
        <h3 class='cart__tot'><span>Rs,</span> ${item.totalPrice}</h3>
        <div class="remove__icon">
          <i class="fa-solid fa-xmark reoveItem"></i>
        </div>
      </div>`;
  });
  document.querySelector(".cartdisp").innerHTML = html;

  if (html.length === 0) {
    check__button.style.display = "none";
    continue__button.style.display = "block";
    empty__head.style.display = "block";
    cart__details.style.display = "none";
    cart__head.style.display = "none";
    subtotal.style.display = "none";
    priceView.style.display = "none";
  } else {
    check__button.style.display = "block";
    continue__button.style.display = "none";
    empty__head.style.display = "none";
    cart__details.style.display = "block";
    cart__head.style.display = "block";
    subtotal.style.display = "block";
    priceView.style.display = "block";
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
  // row ka total bhi screen par update karo
  let totEl = input.parentElement.parentElement.querySelector(".cart__tot");
  if (totEl) totEl.innerHTML = "<span>Rs,</span> " + item.totalPrice;
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
        ".cart__name",
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
