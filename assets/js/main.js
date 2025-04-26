const slides = document.querySelectorAll(".slide");
const dotsContainer = document.querySelector(".slider_dots");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

let currentIndex = 0;

// Generate dots dynamically
slides.forEach((_, index) => {
  const dot = document.createElement("span");
  dot.addEventListener("click", () => moveToSlide(index));
  dotsContainer.appendChild(dot);
});

const dots = dotsContainer.querySelectorAll("span");

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
    dots[i].classList.toggle("active", i === index);
  });
}

function moveToSlide(index) {
  currentIndex = index;
  showSlide(currentIndex);
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % slides.length;
  showSlide(currentIndex);
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  showSlide(currentIndex);
}

nextBtn.addEventListener("click", nextSlide);
prevBtn.addEventListener("click", prevSlide);

showSlide(currentIndex); // initial

// Auto slide
setInterval(nextSlide, 5000);

async function fetchProducts() {
  try {
    const res = await fetch("https://dummyjson.com/products");
    const data = await res.json();
    renderProducts(data.products);
  } catch (err) {
    console.error("Error fetching products:", err);
  }
}

function renderProducts(productList) {
  const container = document.getElementById("products_container");
  container.innerHTML = "";

  productList.forEach((product) => {
    const card = document.createElement("div");
    card.className = "product_card";

    card.innerHTML = `
      <img src="${product.thumbnail}" alt="${product.title}">
      <div class="product_info">
        <h4>${product.title}</h4>
        <p>${product.category}</p>
        <div class="price">$${product.price}</div>
      </div>
      <div class="favorite_icon" onclick="toggleFavorite(this)">&#9825;</div>
    `;

    container.appendChild(card);
  });
}

function toggleFavorite(icon) {
  icon.classList.toggle("active");
}

fetchProducts();
