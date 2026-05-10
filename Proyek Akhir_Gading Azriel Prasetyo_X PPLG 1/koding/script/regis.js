// Function register
function tambahuser(event) {
  // Mencegah form reload otomatis
  event.preventDefault();
  // Mengambil value input
  let inname = document.getElementById("name").value.trim();
  let inemail = document.getElementById("email").value.trim();
  let inpassword = document.getElementById("password").value.trim();
  let inconfirm = document.getElementById("confirm").value.trim();

  // Validasi input
  // Cek input kosong
  if (
    inname === "" ||
    inemail === "" ||
    inpassword === "" ||
    inconfirm === ""
  ) {
    alert("Semua field harus diisi!");
    return;
  }

  // Validasi password minimal
  if (inpassword.length < 6) {
    alert("Password minimal 6 karakter!");
    return;
  }

  // Validasi konfirmasi password
  if (inpassword !== inconfirm) {
    alert("Password tidak sesuai!");
    return;
  }

  // object user
  let user = {
    name: inname,
    email: inemail,
    password: inpassword,
  };

  // Simpan ke localStorage
  saveToStorage(user);
  alert("Registrasi berhasil!");

  // Pindah halaman
  window.location.href = "./login.html";
}

// Function menyimpan data ke localStorage
function saveToStorage(user) {
  // Ubah object menjadi string JSON
  let stringdataUser = JSON.stringify(user);
  // Simpan ke localStorage
  localStorage.setItem("user", stringdataUser);
}
