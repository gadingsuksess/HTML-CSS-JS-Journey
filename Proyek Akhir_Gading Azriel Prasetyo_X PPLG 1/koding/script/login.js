// Function login
function login(event) {
  // Mencegah form reload otomatis
  event.preventDefault();

  // Ambil value email dan password
  let inemail = document.getElementById("email").value.trim();
  let inpassword = document.getElementById("password").value.trim();

  // Ambil data user dari localStorage
  let userdb = getFromStorage();

  // Cek apakah data user ada
  if (!userdb) {
    alert("Belum ada akun terdaftar!");
    return;
  }

  // Validasi login
  if (inemail === userdb.email && inpassword === userdb.password) {
    alert("Login berhasil!");
    // Pindah ke dashboard
    window.location.href = "./dashboard.html";
  } else if (inemail === userdb.email && inpassword !== userdb.password) {
    alert("Password salah!");
  } else {
    alert("Email tidak ditemukan!");
  }
}

// Function mengambil data localStorage
function getFromStorage() {
  let dataUser = localStorage.getItem("user");
  return JSON.parse(dataUser);
}
