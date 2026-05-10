// user
// mengambil data user dari localStorage
let dataUser = JSON.parse(localStorage.getItem("user"));

// menampilkan nama user
document.querySelector(".akun-pengguna span").textContent = dataUser.name;

// ambil tanggal dari URL
// mengambil parameter URL
const params = new URLSearchParams(window.location.search);

// mengambil nilai date
const date = params.get("date");

// menampilkan tanggal
if (date) {
  // ubah string menjadi object tanggal
  const day = new Date(date);

  // tampilkan format indonesia
  document.getElementById("tanggal").textContent = day.toLocaleDateString(
    "id-ID",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    },
  );
}

// save note
function saveNote() {
  // ambil isi textarea
  const noteContent = document.querySelector(".note-container textarea").value;

  // simpan ke localStorage
  localStorage.setItem(`note-${date}`, noteContent);

  // notifikasi
  alert("Catatan berhasil disimpan!");
}

// Delete note
function deleteNote() {
  // hapus data note
  localStorage.removeItem(`note-${date}`);

  // kosongkan textarea
  document.querySelector(".note-container textarea").value = "";

  // notifikasi
  alert("Catatan berhasil dihapus!");
}

// Load note
function loadNote() {
  // mengambil data note
  const savedNote = localStorage.getItem(`note-${date}`);

  // jika note ada
  if (savedNote) {
    // tampilkan ke textarea
    document.querySelector(".note-container textarea").value = savedNote;
  }
}

// Event listener untuk tombol save dan delete
// tombol save
document.querySelector(".btn-save").addEventListener("click", saveNote);

// tombol delete
document.querySelector(".btn-delete").addEventListener("click", deleteNote);

// dark mode
// mengambil theme
const savedTheme = localStorage.getItem("theme");

// jika dark mode aktif
if (savedTheme === "dark") {
  // tambahkan class dark
  document.body.classList.add("dark");
}

// load page
// jalankan load note saat page dibuka
window.onload = loadNote;
