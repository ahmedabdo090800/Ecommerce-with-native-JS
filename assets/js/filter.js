document.addEventListener("DOMContentLoaded", async () => {
  const cartCount = document.getElementById("cart_count");
  const productsContainer = document.getElementById("products_container");
  const categoryFiltersContainer = document.getElementById("category-filters");
  const minPriceValue = document.getElementById("min-price-value");
  const maxPriceValue = document.getElementById("max-price-value");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let allProducts = [];

  function updateCartCount() {
    let totalQuantity = 0;
    cart.forEach((item) => {
      totalQuantity += item.quantity;
    });
    cartCount.innerText = totalQuantity;
  }

  async function fetchProducts() {
    const res = await fetch("https://dummyjson.com/products");
    const data = await res.json();
    allProducts = data.products;
    renderCategories(); // Display categories after products are fetched
    renderProducts(allProducts); // Render all products initially
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

  function renderCategories() {
    const uniqueCategories = [...new Set(allProducts.map((p) => p.category))];
    categoryFiltersContainer.innerHTML = "";

    uniqueCategories.forEach((cat) => {
      const filterItem = document.createElement("div");
      filterItem.classList.add("filter");
      filterItem.innerHTML = `
          <input type="checkbox" class="category-checkbox" value="${cat}" id="${cat}">
          <label for="${cat}">${cat}</label>
        `;
      categoryFiltersContainer.appendChild(filterItem);
    });

    // Apply filters when categories are checked
    const categoryCheckboxes = document.querySelectorAll(".category-checkbox");
    categoryCheckboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", applyFilters);
    });
  }

  function applyFilters() {
    const selectedCategories = Array.from(
      document.querySelectorAll(".category-checkbox:checked")
    ).map((cb) => cb.value);
    const minPrice = document.getElementById("min-price").value;
    const maxPrice = document.getElementById("max-price").value;

    let filteredProducts = [...allProducts];

    if (selectedCategories.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        selectedCategories.includes(product.category)
      );
    }

    if (minPrice) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price >= minPrice
      );
    }

    if (maxPrice) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price <= maxPrice
      );
    }

    renderProducts(filteredProducts); // Re-render filtered products
  }

  function addToCart(product) {
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
  }

  // Update price labels when the sliders change
  document.getElementById("min-price").addEventListener("input", () => {
    minPriceValue.innerText = `$${document.getElementById("min-price").value}`;
  });

  document.getElementById("max-price").addEventListener("input", () => {
    maxPriceValue.innerText = `$${document.getElementById("max-price").value}`;
  });

  fetchProducts();
});
