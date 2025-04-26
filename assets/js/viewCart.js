// عندما يتم تحميل الصفحة بالكامل
document.addEventListener("DOMContentLoaded", () => {
  // تعريف العناصر من الصفحة
  const checkoutButton = document.getElementById("checkout_button");
  const checkoutFormSection = document.getElementById("checkout_form_section");
  const cartCount = document.getElementById("cart_count");
  const productsContainer = document.getElementById("cart_items");
  const totalPriceElement = document.getElementById("total_price");

  // تحميل الكارت من localStorage أو تهيئته كمصفوفة فاضية
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // دالة لتحديث عدد المنتجات في الأيقونة
  function updateCartCount() {
    if (cartCount) {
      cartCount.innerText = cart.length;
    }
  }

  // دالة لعرض المنتجات داخل صفحة الكارت
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
                <span>${product.quantity || 1}</span>
                <button class="btn btn-sm btn-outline-secondary increase_quantity ms-2" data-index="${index}">+</button>
              </div>
              <span class="price">$${(
                product.price * (product.quantity || 1)
              ).toFixed(2)}</span>
              <button class="btn btn-sm btn-danger remove_item ms-3" data-index="${index}">Remove</button>
        `;

      productsContainer.appendChild(productCard);

      total += product.price * (product.quantity || 1);

      // إضافة أحداث للزرار زيادة ونقصان وإزالة
      const increaseButton = productCard.querySelector(".increase_quantity");
      const decreaseButton = productCard.querySelector(".decrease_quantity");
      const removeButton = productCard.querySelector(".remove_item");

      increaseButton.addEventListener("click", () => increaseQuantity(index));
      decreaseButton.addEventListener("click", () => decreaseQuantity(index));
      removeButton.addEventListener("click", () => removeItem(index));
    });

    // عرض السعر الإجمالي
    totalPriceElement.innerText = `Total: $${total.toFixed(2)}`;
  }

  // دالة لزيادة كمية منتج
  function increaseQuantity(index) {
    cart[index].quantity = (cart[index].quantity || 1) + 1;
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCartItems();
  }

  // دالة لتقليل كمية منتج
  function decreaseQuantity(index) {
    if ((cart[index].quantity || 1) > 1) {
      cart[index].quantity -= 1;
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCartItems();
    }
  }

  // دالة لحذف منتج من الكارت
  function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCartItems();
    updateCartCount();
  }

  // لما المستخدم يضغط على زرار "Checkout"
  checkoutButton.addEventListener("click", () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      // لو مش مسجل، نحفظ انه كان رايح يعمل تشيك أوت ونوديه لتسجيل حساب
      localStorage.setItem("redirectToCheckout", "true");
      window.location.href = "register.html";
    } else {
      // لو مسجل، نظهر الفورم ونعبي بياناته
      checkoutFormSection.style.display = "block";
      checkoutButton.style.display = "none";

      document.getElementById("checkout_name").value = user.name || "";
      document.getElementById("checkout_phone").value = user.phone || "";
      document.getElementById("checkout_address").value = user.address || "";
    }
  });

  // لما المستخدم يعمل "Submit" للفورم
  document
    .getElementById("checkout_form")
    .addEventListener("submit", function (event) {
      event.preventDefault(); // منع إرسال الفورم بشكل افتراضي

      // تجهيز بيانات الأوردر
      const orderData = {
        name: document.getElementById("checkout_name").value,
        phone: document.getElementById("checkout_phone").value,
        address: document.getElementById("checkout_address").value,
        cartItems: cart, // كل المنتجات اللي كانت بالكارت
        totalPrice: totalPriceElement.innerText,
        date: new Date().toLocaleString(), // وقت وتاريخ الطلب
      };

      const user = JSON.parse(localStorage.getItem("user"));

      if (user) {
        // تحميل الطلبات السابقة لو موجودة
        const userOrders =
          JSON.parse(localStorage.getItem(user.id + "_orders")) || [];

        // إضافة الطلب الجديد
        userOrders.push(orderData);

        // حفظ الطلبات كلها مرة تانية
        localStorage.setItem(user.id + "_orders", JSON.stringify(userOrders));

        // ✅ مسح الكارت بعد ما خلص الأوردر
        localStorage.removeItem("cart");
        cart = [];
        updateCartCount();
        renderCartItems();

        // ✅ عرض رسالة نجاح صغيرة (اختياري)
        // alert("Order placed successfully!");

        // تحويل المستخدم إلى صفحة الطلبات
        window.location.href = "orders.html";
      } else {
        // لو مش مسجل دخوله، نرجعه للتسجيل
        alert("Please log in to place an order.");
        window.location.href = "register.html";
      }
    });

  // عرض الكارت عند تحميل الصفحة
  renderCartItems();
  updateCartCount();

  // معالجة حالة كان المستخدم رايح للتشيك أوت بعد التسجيل
  const user = JSON.parse(localStorage.getItem("user"));
  const redirect = localStorage.getItem("redirectToCheckout");
  if (user && redirect) {
    checkoutFormSection.style.display = "block";
    checkoutButton.style.display = "none";

    document.getElementById("checkout_name").value = user.name || "";
    document.getElementById("checkout_phone").value = user.phone || "";
    document.getElementById("checkout_address").value = user.address || "";

    // حذف علامة التحويل عشان متكررش كل مرة
    localStorage.removeItem("redirectToCheckout");
  }
});
