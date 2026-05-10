// user
// Mengambil data user dari localStorage
const dataUser = JSON.parse(localStorage.getItem("user"));

// tampilkan nama user
document.querySelector(".akun-pengguna span").textContent = dataUser.name;

// ambil tanggal dari URL
// mengambil parameter URL
const params = new URLSearchParams(window.location.search);

// mengambil nilai date
const date = params.get("date");

// Menampilkan tanggal
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

// Storage
const key = `checklist-${date}`;
const wadah = document.getElementById("wadah");

// get checklist
function getChecklist() {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
}

// save checklist
function saveChecklist(items) {
  localStorage.setItem(key, JSON.stringify(items));
}

// buat checklist
function buatChecklist() {
  let waktu;
  // Loop untuk validasi waktu (Hanya angka/titik)
  while (true) {
    waktu = prompt("Masukkan waktu checklist (Angka saja, misal: 07.00):");

    // Jika user klik Cancel, batalkan fungsi
    if (waktu === null) return;

    // Cek apakah mengandung angka.
    // Mengunakan isNaN(parseFloat) agar format "07.00" tetap dianggap angka
    if (waktu !== "" && !isNaN(waktu.replace(":", "."))) {
      break; // Input benar, keluar dari loop
    }

    alert("Waktu harus berupa angka! Silakan coba lagi.");
  }

  const deskripsi = prompt("Masukkan deskripsi checklist (misal: Olahraga):");

  // validasi deskripsi kosong
  if (!deskripsi) return;

  // maksimal 50 karakter
  if (deskripsi.length > 50) {
    alert("Deskripsi terlalu panjang! Maksimal 50 karakter.");
    return;
  }

  // ambil data lama
  const checklist = getChecklist();

  // tambah item baru
  checklist.push({
    waktu,
    deskripsi,
    done: false,
  });

  // simpan
  saveChecklist(checklist);

  // render ulang
  renderChecklist();
}

// render checklist
function renderChecklist() {
  // kosongkan wadah
  wadah.innerHTML = "";

  // ambil data
  const checklist = getChecklist();

  // jika kosong
  if (checklist.length === 0) {
    wadah.innerHTML = `
            <p class="empty-message">
                Belum ada checklist hari ini.
            </p>
        `;
    return;
  }

  // looping checklist
  checklist.forEach((itemData, index) => {
    // Container item
    const item = document.createElement("div");
    item.classList.add("item");

    // checkbox
    const checkbox = document.createElement("input");

    checkbox.type = "checkbox";
    checkbox.checked = itemData.done;
    checkbox.classList.add("item-checkbox");

    // text
    const text = document.createElement("span");

    text.classList.add("item-text");
    text.textContent = `${itemData.waktu} - ${itemData.deskripsi}`;

    // jika checklist selesai
    if (itemData.done) {
      text.style.textDecoration = "line-through";
      text.style.opacity = "0.6";
    }

    // event checkbox
    checkbox.addEventListener("change", () => {
      const checklist = getChecklist();

      checklist[index].done = checkbox.checked;

      saveChecklist(checklist);
      renderChecklist();
    });

    // btn delete
    const deleteBtn = document.createElement("button");

    deleteBtn.classList.add("delete-btn");

    deleteBtn.innerHTML = `
            <i class="hgi hgi-stroke hgi-rounded hgi-delete-02"></i>
        `;

    // event delete
    deleteBtn.addEventListener("click", () => {
      const checklist = getChecklist();

      checklist.splice(index, 1);

      saveChecklist(checklist);
      renderChecklist();
    });

    // btn edit
    const editBtn = document.createElement("button");

    editBtn.classList.add("edit-btn");

    editBtn.innerHTML = `
            <i class="hgi hgi-stroke hgi-rounded hgi-edit-01"></i>
        `;

    // event edit
    editBtn.addEventListener("click", () => {
      const waktuBaru = prompt("Masukkan waktu baru:", itemData.waktu);

      const deskripsiBaru = prompt(
        "Masukkan deskripsi baru:",
        itemData.deskripsi,
      );

      // validasi
      if (!waktuBaru || !deskripsiBaru) return;

      const checklist = getChecklist();

      checklist[index].waktu = waktuBaru;
      checklist[index].deskripsi = deskripsiBaru;

      saveChecklist(checklist);
      renderChecklist();
    });

    // action button
    const actionDiv = document.createElement("div");

    actionDiv.classList.add("action-btns");

    actionDiv.appendChild(editBtn);
    actionDiv.appendChild(deleteBtn);

    // susun item
    item.appendChild(checkbox);
    item.appendChild(text);
    item.appendChild(actionDiv);

    // tampilkan ke wadah
    wadah.appendChild(item);
  });
}

// delete all
document.querySelector(".btn-deleteall").addEventListener("click", () => {
  const konfirmasi = confirm("Yakin ingin menghapus semua checklist?");

  if (!konfirmasi) return;

  localStorage.removeItem(key);

  renderChecklist();
});

// button and item
document.querySelector(".btn-additem").addEventListener("click", buatChecklist);

// Dark mode
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  document.body.classList.add("dark");
}

// load
window.onload = renderChecklist;
