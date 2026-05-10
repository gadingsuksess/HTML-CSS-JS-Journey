//  USER DATA
let dataUser = JSON.parse(localStorage.getItem("user"));

// Tampilkan nama user
document.querySelector(".akun-pengguna span").textContent = dataUser.name;

// Tampilkan email
document.getElementById("email").textContent = `${dataUser.email}!`;

// dark mode
const toggle = document.getElementById("darkToggle");

// Ambil theme dari localStorage
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  toggle.textContent = "☀️";
}

// Event dark mode
toggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  // Jika dark aktif
  if (document.body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
    toggle.textContent = "☀️";
  }

  // Jika dark nonaktif
  else {
    localStorage.setItem("theme", "light");
    toggle.textContent = "🌙";
  }
});
