/* =====================================================================
   DRAGZORA — SHARED STORE LOGIC
   File: js/store.js   (NAYI FILE)

   Is file me hai:
   1) 20 default products (10 Men + 10 Women)
   2) Admin se add kiye hue products ka storage
   3) Cart (localStorage key "prdInCart" — cart.html / buy.html isi ko use karte hain)
   4) Header, mobile dock, Account sidebar, Cart sidebar, Footer (JS se inject)
   5) Product card, toast, scroll-reveal helpers
   ===================================================================== */
(function (w) {
  "use strict";

  var KEY_PRODUCTS = "lxProducts"; // admin ke add kiye hue products
  var KEY_CART = "prdInCart"; // cart (purane pages ke saath same)
  var SIZES = ["S", "M", "L", "XL"];

  /* ---------------------------------------------------------------
     1) DEFAULT PRODUCTS  (10 men + 10 women)
     Apni images lagani hon to sirf "image" ka path badal dein.
     --------------------------------------------------------------- */
  var SEED = [
    /* ------------------------- MEN ------------------------- */
    {
      id: "m1",
      gender: "men",
      name: "Noir Signature Polo",
      price: 3200,
      cutPrice: 4500,
      image: "images/ms2.webp",
      description:
        "A deep black polo finished with golden contrast tipping on the collar and cuffs. Cut from dense combed cotton piqué that holds its shape all day, with a clean tailored drop and a soft, breathable hand-feel. Effortless from the office to the evening.",
    },
    {
      id: "m2",
      gender: "men",
      name: "Ivory Classic Polo",
      price: 2900,
      cutPrice: 4200,
      image: "images/slide.webp",
      description:
        "The essential white polo, refined. A crisp ribbed collar, minimal chest detail and a smooth premium-cotton body that stays fresh and structured wear after wear. Pairs with anything in your wardrobe.",
    },
    {
      id: "m3",
      gender: "men",
      name: "Midnight Teal Long Sleeve",
      price: 3400,
      cutPrice: 4800,
      image: "images/ms3.webp",
      description:
        "A rich teal long-sleeve crew in a heavyweight jersey with a subtle stretch. Slim through the body, relaxed through the sleeve, with a discreet chest tab that keeps the look quiet and confident.",
    },
    {
      id: "m4",
      gender: "men",
      name: "Number 19 Oversized Tee",
      price: 2600,
      cutPrice: 3600,
      image: "images/ms4.webp",
      description:
        "A bold, athletic-inspired oversized tee with a statement number printed across the back. Dropped shoulders, roomy silhouette and ultra-soft cotton make it a street-ready favourite.",
    },
    {
      id: "m5",
      gender: "men",
      name: "Cloud White Jogger",
      price: 3800,
      cutPrice: 5400,
      image: "images/crgpnt.webp",
      description:
        "Tapered joggers in a soft brushed fleece with a drawcord waist, deep pockets and a clean ribbed cuff. Light, warm and endlessly comfortable — luxury loungewear that steps outside with ease.",
    },
    {
      id: "m6",
      gender: "men",
      name: "Onyx Contrast Polo",
      price: 3500,
      cutPrice: 4900,
      image: "images/ms2.webp",
      description:
        "A sharper take on the classic polo. Midnight-black body, golden trim and a slightly longer hem for a modern, elongated line. Breathable, wrinkle-resistant and made to be noticed quietly.",
    },
    {
      id: "m7",
      gender: "men",
      name: "Ocean Crew Sweat",
      price: 3900,
      cutPrice: 5500,
      image: "images/ms3.webp",
      description:
        "A smooth, mid-weight crew sweat in a deep ocean blue. Structured shoulders, ribbed trims and a buttery inner finish give a premium feel that layers beautifully through the season.",
    },
    {
      id: "m8",
      gender: "men",
      name: "Studio Oversized Jersey",
      price: 2800,
      cutPrice: 3900,
      image: "images/ms4.webp",
      description:
        "A relaxed, gym-to-street oversized jersey with a breathable open weave and bold graphic back. Light on the skin, generous in fit and effortless to style.",
    },
    {
      id: "m9",
      gender: "men",
      name: "Pearl Knit Polo",
      price: 3300,
      cutPrice: 4700,
      image: "images/slide.webp",
      description:
        "A textured pearl-white knit polo with a fine ribbed pattern and a soft, fluid drape. Refined enough for dinner, easy enough for weekends — a wardrobe staple that feels expensive.",
    },
    {
      id: "m10",
      gender: "men",
      name: "Sand Lounge Jogger",
      price: 3600,
      cutPrice: 5000,
      image: "images/crgpnt.webp",
      description:
        "Warm sand-toned lounge joggers cut from a plush, medium-weight fabric. Relaxed thigh, tapered ankle and a hidden zip pocket — comfort with a tailored attitude.",
    },

    /* ------------------------ WOMEN ------------------------ */
    {
      id: "w1",
      gender: "women",
      name: "Ivory Rose Polo",
      price: 2900,
      cutPrice: 4100,
      image: "images/ms1.webp",
      description:
        "A soft ivory polo with a delicate ribbed collar and a fitted, feminine shape. Crafted from smooth stretch cotton that moves with you and pairs perfectly with tailored trousers or denim.",
    },
    {
      id: "w2",
      gender: "women",
      name: "Blush Signature Polo",
      price: 3100,
      cutPrice: 4400,
      image: "images/mwhod.webp",
      description:
        "A romantic blush-pink polo with a half-zip neckline and neat contrast piping. Lightweight, breathable and beautifully flattering — a quiet statement in soft colour.",
    },
    {
      id: "w3",
      gender: "women",
      name: "Pearl Tailored Polo",
      price: 3300,
      cutPrice: 4700,
      image: "images/ms1.webp",
      description:
        "Tailored to skim the body without clinging. Fine-gauge cotton, a sharp collar and a subtle chest emblem create a polished, elevated everyday top.",
    },
    {
      id: "w4",
      gender: "women",
      name: "Rosewater Knit Polo",
      price: 3200,
      cutPrice: 4500,
      image: "images/mwhod.webp",
      description:
        "A fine-knit polo in a muted rosewater tone with a soft, fluid drape. Gentle on the skin and easy to layer, it brings quiet luxury to any outfit.",
    },
    {
      id: "w5",
      gender: "women",
      name: "Emerald Studio Polo",
      price: 3500,
      cutPrice: 4900,
      image: "images/ms1.webp",
      description:
        "Inspired by deep studio backdrops, this polo has a clean silhouette, refined collar and a plush, breathable feel. Dress it up with a skirt or keep it casual with denim.",
    },
    {
      id: "w6",
      gender: "women",
      name: "Petal Soft Polo",
      price: 2800,
      cutPrice: 3900,
      image: "images/mwhod.webp",
      description:
        "Featherlight and ultra-soft, this petal-pink polo is made for long days. A relaxed fit, stretch cotton and a finished collar keep you comfortable and put-together.",
    },
    {
      id: "w7",
      gender: "women",
      name: "Ivory Luxe Top",
      price: 3000,
      cutPrice: 4300,
      image: "images/ms1.webp",
      description:
        "An elevated everyday top in creamy ivory. Smooth handfeel, a gently structured collar and a versatile cut that works tucked in or worn loose.",
    },
    {
      id: "w8",
      gender: "women",
      name: "Rouge Champagne Polo",
      price: 3400,
      cutPrice: 4800,
      image: "images/mwhod.webp",
      description:
        "A warm champagne-rose polo with a refined half-zip and soft contrast edges. Tailored, lightweight and designed for effortless day-to-night dressing.",
    },
    {
      id: "w9",
      gender: "women",
      name: "Midnight Trim Polo",
      price: 3600,
      cutPrice: 5100,
      image: "images/ms1.webp",
      description:
        "A fresh white polo with subtle midnight trim details. Made from premium combed cotton for a crisp, clean finish that keeps its shape.",
    },
    {
      id: "w10",
      gender: "women",
      name: "Sunset Rose Polo",
      price: 3300,
      cutPrice: 4600,
      image: "images/mwhod.webp",
      description:
        "A glowing rose polo inspired by golden-hour light. Smooth stretch fabric, a flattering fit and a soft finish make it an instant favourite.",
    },
  ];

  /* ---------------------------------------------------------------
     helpers
     --------------------------------------------------------------- */
  function lsGet(k) {
    try {
      return localStorage.getItem(k);
    } catch (e) {
      return null;
    }
  }
  function lsSet(k, v) {
    try {
      localStorage.setItem(k, v);
      return true;
    } catch (e) {
      return false;
    }
  }
  function lsDel(k) {
    try {
      localStorage.removeItem(k);
    } catch (e) {}
  }
  function parse(s, fallback) {
    try {
      var v = JSON.parse(s);
      return v === null || v === undefined ? fallback : v;
    } catch (e) {
      return fallback;
    }
  }
  function esc(t) {
    return String(t == null ? "" : t).replace(/[&<>"']/g, function (c) {
      return {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      }[c];
    });
  }
  function num(n) {
    return String(Math.round(Number(n) || 0)).replace(
      /\B(?=(\d{3})+(?!\d))/g,
      ",",
    );
  }
  function money(n) {
    return "Rs " + num(n);
  }
  function discount(p) {
    var c = Number(p.cutPrice),
      pr = Number(p.price);
    return c > pr && pr > 0 ? Math.round(((c - pr) / c) * 100) : 0;
  }
  function genderLabel(g) {
    return g === "women" ? "Women" : "Men";
  }

  /* ---------------------------------------------------------------
     2) PRODUCTS
     --------------------------------------------------------------- */
  function isValid(p) {
    return !!(
      p &&
      p.id &&
      (p.gender === "men" || p.gender === "women") &&
      String(p.name || "").trim() &&
      Number(p.price) > 0 &&
      Number(p.cutPrice) > Number(p.price) &&
      String(p.description || "").trim() &&
      p.image
    );
  }
  function getCustom() {
    var arr = parse(lsGet(KEY_PRODUCTS), []);
    return Array.isArray(arr) ? arr.filter(isValid) : [];
  }
  function saveCustom(arr) {
    return lsSet(KEY_PRODUCTS, JSON.stringify(arr));
  }
  function addCustom(p) {
    var arr = getCustom();
    arr.unshift(p);
    return saveCustom(arr); // false = storage full
  }
  function deleteCustom(id) {
    saveCustom(
      getCustom().filter(function (p) {
        return p.id !== id;
      }),
    );
  }
  function getAll() {
    return getCustom().concat(SEED);
  }
  function getById(id) {
    var all = getAll();
    for (var i = 0; i < all.length; i++) if (all[i].id === id) return all[i];
    return null;
  }
  function byGender(g) {
    return g === "men" || g === "women"
      ? getAll().filter(function (p) {
          return p.gender === g;
        })
      : getAll();
  }
  // Home page "New Arrivals": pehle admin ke naye products, phir men/women mix
  function latest(n) {
    var out = getCustom().slice(0, n);
    var m = SEED.filter(function (p) {
      return p.gender === "men";
    });
    var f = SEED.filter(function (p) {
      return p.gender === "women";
    });
    for (var i = 0; out.length < n && (i < m.length || i < f.length); i++) {
      if (f[i] && out.length < n) out.push(f[i]);
      if (m[i] && out.length < n) out.push(m[i]);
    }
    return out;
  }

  // Image ko chota (max 900px) karke JPEG banata hai — localStorage full na ho
  function readImage(file, max) {
    max = max || 900;
    return new Promise(function (resolve, reject) {
      var r = new FileReader();
      r.onerror = function () {
        reject(new Error("read"));
      };
      r.onload = function () {
        var img = new Image();
        img.onerror = function () {
          reject(new Error("decode"));
        };
        img.onload = function () {
          var s = Math.min(1, max / Math.max(img.width, img.height));
          var cw = Math.max(1, Math.round(img.width * s));
          var ch = Math.max(1, Math.round(img.height * s));
          var c = document.createElement("canvas");
          c.width = cw;
          c.height = ch;
          var ctx = c.getContext("2d");
          ctx.fillStyle = "#fff";
          ctx.fillRect(0, 0, cw, ch);
          ctx.drawImage(img, 0, 0, cw, ch);
          resolve(c.toDataURL("image/jpeg", 0.82));
        };
        img.src = r.result;
      };
      r.readAsDataURL(file);
    });
  }

  /* ---------------------------------------------------------------
     3) CART  (key: prdInCart — item: image,name,price,totalPrice,quantity)
     --------------------------------------------------------------- */
  function getCart() {
    var c = parse(lsGet(KEY_CART), []);
    return Array.isArray(c) ? c : [];
  }
  function saveCart(c) {
    lsSet(KEY_CART, JSON.stringify(c));
  }
  function addToCart(p, qty, size) {
    qty = Math.max(1, parseInt(qty, 10) || 1);
    var name = size ? p.name + " (" + size + ")" : p.name;
    var cart = getCart();
    var found = null;
    for (var i = 0; i < cart.length; i++)
      if (cart[i].name === name) found = cart[i];
    if (found) {
      found.quantity += qty;
      found.totalPrice = found.price * found.quantity;
    } else {
      cart.push({
        id: p.id,
        image: p.image,
        name: name,
        price: Number(p.price),
        totalPrice: Number(p.price) * qty,
        quantity: qty,
      });
    }
    saveCart(cart);
    renderCart();
  }
  function openCart() {
    w.location.hash = "cart__side";
  }

  function renderCart() {
    var box = document.querySelector(".cartdisp");
    if (!box) return;
    var cart = getCart();
    var html = "";
    var count = 0;
    var total = 0;
    cart.forEach(function (it, i) {
      count += it.quantity;
      total += it.totalPrice;
      html +=
        '<div class="cartlist" data-i="' +
        i +
        '">' +
        '<img src="' +
        esc(it.image) +
        '" alt="" id="cart__image">' +
        '<h3 class="cart__name">' +
        esc(it.name) +
        "</h3>" +
        '<h3 class="cart__price">Rs, ' +
        num(it.price) +
        "</h3>" +
        '<div class="quan__boxes">' +
        '<input type="button" name="quan" class="min__btn" value="-">' +
        '<input type="number" class="cart__quan" value="' +
        it.quantity +
        '" readonly>' +
        '<input type="button" name="quan" class="pl__btn" value="+">' +
        "</div>" +
        '<h3 class="cart__tot">Rs, ' +
        num(it.totalPrice) +
        "</h3>" +
        '<div class="remove__icon"><i class="fa-solid fa-xmark reoveItem"></i></div>' +
        "</div>";
    });
    box.innerHTML = html;

    document
      .querySelectorAll("#cart__count, .cart__counte")
      .forEach(function (el) {
        el.textContent = count;
      });
    var tp = document.querySelector(".total__price");
    if (tp) tp.textContent = num(total);

    var has = cart.length > 0;
    function show(sel, on) {
      var el = document.querySelector(sel);
      if (el) el.style.display = on ? "block" : "none";
    }
    show(".subtotal", has);
    show(".priceView", has);
    show(".buy__btn", has);
    show(".end__button", has);
    show(".empty__head", !has);
    show(".continue__button", !has);
  }

  document.addEventListener("click", function (e) {
    var t = e.target;
    if (!t || !t.closest) return;

    // cart sidebar: + / - / remove
    var row = t.closest(".cartlist");
    if (row && row.closest("#cart__side")) {
      var i = parseInt(row.getAttribute("data-i"), 10);
      var cart = getCart();
      var it = cart[i];
      if (!it) return;
      if (t.closest(".pl__btn")) {
        it.quantity += 1;
      } else if (t.closest(".min__btn")) {
        if (it.quantity > 1) it.quantity -= 1;
      } else if (t.closest(".reoveItem")) {
        cart.splice(i, 1);
      } else {
        return;
      }
      if (cart[i]) it.totalPrice = it.price * it.quantity;
      saveCart(cart);
      renderCart();
      return;
    }

    // product card: Quick Add
    var q = t.closest("[data-quick]");
    if (q) {
      e.preventDefault();
      var p = getById(q.getAttribute("data-quick"));
      if (p) {
        addToCart(p, 1, "M");
        toast(p.name + " (M) added to cart");
        openCart();
      }
    }
  });

  /* ---------------------------------------------------------------
     4) UI: toast, reveal, product card
     --------------------------------------------------------------- */
  var toastTimer;
  function toast(msg, type) {
    var el = document.getElementById("lxToast");
    if (!el) {
      el = document.createElement("div");
      el.id = "lxToast";
      el.className = "lx-toast";
      el.setAttribute("role", "status");
      document.body.appendChild(el);
    }
    el.className = "lx-toast" + (type === "error" ? " is-error" : "");
    el.innerHTML =
      '<i class="fa-solid ' +
      (type === "error" ? "fa-circle-exclamation" : "fa-circle-check") +
      '"></i><span>' +
      esc(msg) +
      "</span>";
    void el.offsetWidth;
    el.classList.add("is-show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      el.classList.remove("is-show");
    }, 2800);
  }

  var io = null;
  function reveal(root) {
    var els = (root || document).querySelectorAll(".lx-reveal:not(.is-in)");
    if (!("IntersectionObserver" in w)) {
      els.forEach(function (el) {
        el.classList.add("is-in");
      });
      return;
    }
    if (!io) {
      io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (en) {
            if (en.isIntersecting) {
              en.target.classList.add("is-in");
              io.unobserve(en.target);
            }
          });
        },
        { threshold: 0.08, rootMargin: "0px 0px -40px 0px" },
      );
    }
    els.forEach(function (el) {
      io.observe(el);
    });
  }

  function card(p, i) {
    var off = discount(p);
    var href = "productdetail.html?id=" + encodeURIComponent(p.id);
    return (
      '<article class="lx-card lx-reveal" style="--i:' +
      ((i || 0) % 8) +
      '">' +
      '<div class="lx-card__top">' +
      '<a class="lx-card__media" href="' +
      href +
      '" aria-label="' +
      esc(p.name) +
      '">' +
      '<img src="' +
      esc(p.image) +
      '" alt="' +
      esc(p.name) +
      '" loading="lazy">' +
      '<span class="lx-tag">' +
      genderLabel(p.gender) +
      "</span>" +
      (off > 0 ? '<span class="lx-off">-' + off + "%</span>" : "") +
      '<span class="lx-card__shine"></span>' +
      "</a>" +
      '<button type="button" class="lx-card__quick" data-quick="' +
      esc(p.id) +
      '"><i class="fa-solid fa-bag-shopping"></i> Quick Add</button>' +
      "</div>" +
      '<a class="lx-card__body" href="' +
      href +
      '">' +
      '<h3 class="lx-card__name">' +
      esc(p.name) +
      "</h3>" +
      '<div class="lx-card__price"><b>' +
      money(p.price) +
      "</b><s>" +
      money(p.cutPrice) +
      "</s></div>" +
      '<div class="lx-stars">★★★★★</div>' +
      "</a></article>"
    );
  }

  /* ---------------------------------------------------------------
     5) CHROME: header + dock + sidebars + footer
     active = "home" | "men" | "women" | "add" | ""
     --------------------------------------------------------------- */
  function chromeTop(active) {
    function cls(k) {
      return "header__link" + (active === k ? " is-active" : "");
    }
    function dcls(k) {
      return "nav__link" + (active === k ? " is-active" : "");
    }
    return (
      '<div class="header"><div class="header__navbar">' +
      '<div class="header__logo">' +
      '<a href="index.html" class="logo"><img src="images/logo.png" alt="Dragzora" class="store__logo" /></a>' +
      '<input type="text" id="searchBar" placeholder="Search" autocomplete="off" />' +
      '<i class="fa-solid fa-magnifying-glass bar__search" id="searchGo" style="cursor:pointer"></i>' +
      "</div>" +
      '<nav class="header__nav"><ul class="header__ul">' +
      '<li class="header__li"><a href="index.html" class="' +
      cls("home") +
      '">Home</a></li>' +
      '<li class="header__li"><a href="collection.html?g=men" class="' +
      cls("men") +
      '">Men</a></li>' +
      '<li class="header__li"><a href="collection.html?g=women" class="' +
      cls("women") +
      '">Women</a></li>' +
      '<li class="header__li"><a href="product.html" class="' +
      cls("add") +
      '">Add Product</a></li>' +
      '<li class="header__li"><a href="signup.html" class="header__link">Sign up</a></li>' +
      '<li class="header__li"><a href="#name__cart" class="header__link acc__link" id="sign__succ"><p class="sign__inp">Account</p></a></li>' +
      '<li class="header__li"><a href="#cart__side" class="cart header__link"><i class="fa-solid fa-cart-shopping cart__icon"></i><p id="cart__count">0</p></a></li>' +
      "</ul></nav></div></div>" +
      // mobile dock
      '<div id="nav__navbar"><ul class="nav__ul">' +
      '<li class="nav__li"><a href="index.html" class="' +
      dcls("home") +
      '"><i class="fa-solid fa-house home__icon"></i><br />Home</a></li>' +
      '<li class="nav__li"><a href="collection.html?g=men" class="' +
      dcls("men") +
      '"><i class="fa-solid fa-person home__icon"></i><br />Men</a></li>' +
      '<li class="nav__li"><a href="collection.html?g=women" class="' +
      dcls("women") +
      '"><i class="fa-solid fa-person-dress home__icon"></i><br />Women</a></li>' +
      '<li class="nav__li"><a href="#name__cart" class="nav__link"><i class="fa-solid fa-user home__icon"></i><br />Account</a></li>' +
      '<li class="nav__li"><a href="#cart__side" class="cart nav__link"><i class="fa-solid fa-cart-shopping cart__icon" id="cart__nav"></i><p class="cart__counte">0</p></a></li>' +
      "</ul></div>" +
      // account sidebar
      '<div class="sidebar" id="name__cart">' +
      '<div class="close__icon"><a href="#" class="close__link"><i class="fa-solid fa-xmark sidebar__close"></i></a></div>' +
      '<div class="name__sec"><div class="name__text"><h3 class="name__text">' +
      '<span class="wel__text">Welcome,</span> <span class="sign__inw"></span></h3></div>' +
      '<div class="view__prof"><a href="login.html" class="view__link">View profile</a></div></div>' +
      '<div class="logout__btn" id="name__bbtnn"><button type="button" class="logout-btn name__btn" id="logout_btn">Logout</button></div>' +
      "</div>" +
      // cart sidebar
      '<div class="sidebar" id="cart__side">' +
      '<div class="close__icon"><a href="#" class="close__link"><i class="fa-solid fa-xmark sidebar__close"></i></a></div>' +
      '<div class="head"><p>My Cart</p></div>' +
      '<div class="cartdisp"></div>' +
      '<div class="totalPriceCart"><div class="subtotal" style="display:none">total</div>' +
      '<div class="priceView" style="display:none"><h2><span>Rs,</span> <span class="total__price">00</span></h2></div></div>' +
      '<div class="buy__btn" style="display:none"><a href="cart.html" class="buy__button">View cart</a></div>' +
      '<div class="end__button" style="display:none"><a href="buy.html" class="buy__button">Check it out</a></div>' +
      '<div class="empty__head" style="display:none"><h3 class="empty__text">Your cart is empty</h3></div>' +
      '<div class="continue__button" style="display:none"><a href="index.html" class="continue__btn buy__button">Continue shopping</a></div>' +
      "</div>"
    );
  }

  function chromeFooter() {
    return (
      '<footer><div class="footer">' +
      '<div class="footer-section"><div class="footer-logo">Dragzora</div>' +
      "<p>Discover timeless fashion at unbeatable prices. Shop now and enjoy a luxury experience from cart to doorstep.</p>" +
      '<div class="social-icons">' +
      '<a href="#" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>' +
      '<a href="#" aria-label="Twitter"><i class="fab fa-twitter"></i></a>' +
      '<a href="#" aria-label="Instagram"><i class="fab fa-instagram"></i></a>' +
      '<a href="#" aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a></div></div>' +
      '<div class="footer-section footer-links"><h3>Quick Links</h3>' +
      '<a href="index.html">Home</a>' +
      '<a href="collection.html?g=men">Men</a>' +
      '<a href="collection.html?g=women">Women</a>' +
      '<a href="cart.html">Cart</a>' +
      '<a href="signup.html">Sign up</a>' +
      '<a href="login.html">Login</a></div>' +
      '<div class="footer-section newsletter"><h3>Newsletter</h3>' +
      "<p>Subscribe to our newsletter for the latest updates.</p>" +
      '<input type="email" placeholder="Enter your email" /><button type="button">Subscribe</button></div>' +
      '</div><div class="copyright">&copy; 2024 Dragzora Store. All Rights Reserved.' +
      '<span style="display:block;margin-top:10px;letter-spacing:0.22em;">Designed &amp; built by <a href="https://pantrix-flax.vercel.app/" target="_blank" rel="noopener noreferrer" style="color:var(--gold);font-weight:500;border-bottom:1px solid var(--gold);padding-bottom:1px;">Pantrix</a></span></div></footer>'
    );
  }

  function wireAuth() {
    var signedIn = lsGet("signin") === "true";
    var logout = document.getElementById("logout_btn");
    var prof = document.querySelector(".view__prof");
    var wel = document.querySelector(".wel__text");
    var nm = document.querySelector(".sign__inw");
    var name =
      (lsGet("saveName") === "true" && lsGet("welcomeName")) ||
      lsGet("name") ||
      "";
    if (signedIn) {
      if (nm) nm.textContent = name;
    } else {
      if (wel)
        wel.innerHTML =
          'Please <a href="signup.html" style="color:var(--gold)">create an account</a>';
      if (nm) nm.style.display = "none";
      if (prof) prof.style.display = "none";
      if (logout) logout.style.display = "none";
    }
    if (logout)
      logout.addEventListener("click", function (e) {
        e.preventDefault();
        // sirf login wali keys hatate hain (cart / products / users safe rehte hain)
        [
          "signin",
          "name",
          "password",
          "email",
          "saveName",
          "welcomeName",
          "welcomeEmail",
          "editName",
        ].forEach(lsDel);
        w.location.href = "index.html";
      });
  }

  function wireSearch() {
    var input = document.getElementById("searchBar");
    var go = document.getElementById("searchGo");
    if (!input) return;
    function jump() {
      var v = input.value.trim();
      w.location.href =
        "collection.html?g=all" + (v ? "&q=" + encodeURIComponent(v) : "");
    }
    input.addEventListener("input", function () {
      if (typeof w.LX_onSearch === "function") w.LX_onSearch(input.value);
    });
    input.addEventListener("keydown", function (e) {
      if (e.key === "Enter" && typeof w.LX_onSearch !== "function") jump();
    });
    if (go)
      go.addEventListener("click", function () {
        if (typeof w.LX_onSearch === "function") input.focus();
        else jump();
      });
  }

  function mount(active) {
    document.documentElement.classList.add("lx-js");
    document.body.insertAdjacentHTML("afterbegin", chromeTop(active || ""));
    var foot = document.getElementById("lxFooter");
    if (foot) foot.innerHTML = chromeFooter();
    wireAuth();
    wireSearch();
    renderCart();
    reveal();
  }

  w.LX = {
    SIZES: SIZES,
    esc: esc,
    money: money,
    num: num,
    discount: discount,
    genderLabel: genderLabel,
    isValid: isValid,
    getAll: getAll,
    getById: getById,
    byGender: byGender,
    latest: latest,
    getCustom: getCustom,
    addCustom: addCustom,
    deleteCustom: deleteCustom,
    readImage: readImage,
    addToCart: addToCart,
    openCart: openCart,
    renderCart: renderCart,
    card: card,
    toast: toast,
    reveal: reveal,
    mount: mount,
  };
})(window);
