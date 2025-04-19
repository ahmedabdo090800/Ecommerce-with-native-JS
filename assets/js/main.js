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
