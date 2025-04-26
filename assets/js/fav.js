let favoriteProducts = [];

// إضافة / إزالة المنتجات من المفضلة
function toggleFavorite(icon, product) {
  icon.classList.toggle("active");

  const foundIndex = favoriteProducts.findIndex(
    (item) => item.id === product.id
  );

  if (foundIndex > -1) {
    favoriteProducts.splice(foundIndex, 1); // إزالة المنتج
  } else {
    favoriteProducts.push(product); // إضافة المنتج
  }

  updateFavoriteCount();
}

// تحديث عدد المنتجات المفضلة
function updateFavoriteCount() {
  const favCountElement = document.getElementById("fav_count");
  favCountElement.textContent = favoriteProducts.length; // تحديث العد
}

// عرض المنتجات المفضلة في الـ Sidebar
function showFavoriteProducts() {
  const container = document.getElementById("favorite_container");
  container.innerHTML = ""; // مسح المحتوى القديم

  if (favoriteProducts.length === 0) {
    container.innerHTML = "<p>No favorite products yet!</p>"; // إذا مفيش منتجات مفضلة
  } else {
    favoriteProducts.forEach((product) => {
      const card = document.createElement("div");
      card.className = "product_card";

      card.innerHTML = `
        <img src="${product.thumbnail}" alt="${product.title}">
        <div class="product_info">
          <h4>${product.title}</h4>
          <p>${product.category}</p>
          <div class="price">$${product.price}</div>
        </div>
        <div class="favorite_icon active" onclick="toggleFavorite(this, ${JSON.stringify(
          product
        ).replace(/"/g, "&quot;")})">&#10084;</div>
      `;

      container.appendChild(card); // إضافة البطاقة للـ container
    });
  }

  // عرض الـ Sidebar
  document.getElementById("favorite_sidebar").style.right = "0";
}

// إخفاء الـ Sidebar عند الضغط على زر الإغلاق
document.getElementById("close_sidebar").addEventListener("click", () => {
  document.getElementById("favorite_sidebar").style.right = "-350px";
});

// إظهار المنتجات المفضلة عند الضغط على أيقونة المفضلة
document
  .getElementById("fav_icon")
  .addEventListener("click", showFavoriteProducts);

// إضافة أو إزالة المنتجات من المفضلة عند الضغط على زر "Add to Favorites"
const favoriteButtons = document.querySelectorAll(".favorite_btn");

favoriteButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const productElement = e.target.closest(".product");
    const product = {
      id: productElement.dataset.id,
      title: productElement.dataset.title,
      thumbnail: productElement.dataset.thumbnail,
      price: productElement.dataset.price,
      category: productElement.dataset.category,
    };

    const icon = productElement.querySelector(".favorite_btn");

    toggleFavorite(icon, product);
  });
});
