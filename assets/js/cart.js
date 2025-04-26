document.addEventListener("DOMContentLoaded", () => {
  const cartCount = document.getElementById("cart_count");
  const productsContainer = document.getElementById("cart_items");
  const totalPriceElement = document.getElementById("total_price");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function updateCartCount() {
    cartCount.innerText = cart.length;
  }

  function renderCartItems() {
    productsContainer.innerHTML = "";
    let total = 0;

    cart.forEach((product, index) => {
      const productCard = document.createElement("div");
      productCard.classList.add(
        "cart_item",
        "d-flex",
        "align-items-center",
        "justify-content-between",
        "mb-3",
        "border",
        "p-3"
      );

      productCard.innerHTML = `
        <div class="d-flex align-items-center">
          <img src="${product.thumbnail}" alt="${
        product.title
      }" width="50" height="50" class="me-3">
          <span>${product.title}</span>
        </div>
        <div class="d-flex align-items-center">
          <button class="btn btn-sm btn-outline-secondary decrease_quantity me-2" data-index="${index}">-</button>
          <span>${product.quantity}</span>
          <button class="btn btn-sm btn-outline-secondary increase_quantity ms-2" data-index="${index}">+</button>
        </div>
        <span class="price">$${(product.price * product.quantity).toFixed(
          2
        )}</span>
        <button class="btn btn-sm btn-danger remove_item ms-3" data-index="${index}">Remove</button>
      `;

      productsContainer.appendChild(productCard);

      total += product.price * product.quantity;

      // Add event listeners for increase, decrease, and remove buttons
      const increaseButton = productCard.querySelector(".increase_quantity");
      const decreaseButton = productCard.querySelector(".decrease_quantity");
      const removeButton = productCard.querySelector(".remove_item");

      increaseButton.addEventListener("click", () => increaseQuantity(index));
      decreaseButton.addEventListener("click", () => decreaseQuantity(index));
      removeButton.addEventListener("click", () => removeItem(index));
    });

    totalPriceElement.innerText = `Total: $${total.toFixed(2)}`;
  }

  function increaseQuantity(index) {
    cart[index].quantity += 1;
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCartItems();
  }

  function decreaseQuantity(index) {
    if (cart[index].quantity > 1) {
      cart[index].quantity -= 1;
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCartItems();
    }
  }

  function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCartItems();
  }

  renderCartItems();
  updateCartCount();
});

document.addEventListener("DOMContentLoaded", () => {
  const cartCount = document.getElementById("cart_count");
  const productsContainer = document.getElementById("products_container");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function updateCartCount() {
    let totalQuantity = 0;
    cart.forEach((item) => {
      totalQuantity += item.quantity;
    });
    cartCount.innerText = totalQuantity;
  }

  function renderProducts(productList) {
    productsContainer.innerHTML = "";
    productList.forEach((product) => {
      const card = document.createElement("div");
      card.className = "product_card card p-2 m-2";

      card.innerHTML = `
        <img src="${product.thumbnail}" alt="${product.title}" class="card-img-top" style="height: 200px; object-fit: cover;">
        <div class="card-body">
          <h5 class="card-title">${product.title}</h5>
          <p class="card-text">${product.category}</p>
          <p class="card-text fw-bold">$${product.price}</p>
          <button class="btn btn-primary add_to_cart_button">Add to Cart</button>
        </div>
      `;

      const addToCartButton = card.querySelector(".add_to_cart_button");
      addToCartButton.addEventListener("click", () => {
        addToCart(product);
      });

      productsContainer.appendChild(card);
    });
  }

  function addToCart(product) {
    // Check if product already exists in cart
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
  }

  fetch("https://dummyjson.com/products")
    .then((response) => response.json())
    .then((data) => {
      renderProducts(data.products);
    })
    .catch((error) => console.error("Error fetching products:", error));

  updateCartCount();
});
