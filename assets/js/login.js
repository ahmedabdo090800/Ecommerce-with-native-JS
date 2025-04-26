document.addEventListener("DOMContentLoaded", function () {
  // الحصول على البيانات المخزنة من localStorage
  const storedUser = JSON.parse(localStorage.getItem("user"));

  if (storedUser) {
    // إذا كان هناك مستخدم مسجل
    const authButtons = document.querySelector(".auth_buttons");
    if (authButtons) {
      authButtons.innerHTML = ""; // مسح الأزرار القديمة
      updateHeaderWithUser(storedUser.username); // تحديث الهيدر باسم المستخدم
    }
  } else {
    // إذا لم يكن هناك مستخدم مسجل، عرض الأزرار
    const authButtons = document.querySelector(".auth_buttons");
    if (authButtons) {
      authButtons.innerHTML = `
          <a href="login.html" class="btn login">
            Login <i class="fa-solid fa-right-to-bracket"></i>
          </a>
          <a href="register.html" class="btn signup">
            Sign UP <i class="fa-solid fa-user-plus"></i>
          </a>
        `;
    }
  }
});

// دالة لتحديث الهيدر باسم المستخدم
function updateHeaderWithUser(username) {
  const userHeader = document.getElementById("user_header");
  if (userHeader) {
    userHeader.textContent = `Welcome, ${username}`;
  }
}
