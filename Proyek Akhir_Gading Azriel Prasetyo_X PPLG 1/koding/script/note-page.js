// User
// Ambil data user dari localStorage
let dataUser = JSON.parse(localStorage.getItem("user"));

// Tampilkan nama user
if (dataUser) {
  document.querySelector(".akun-pengguna span").textContent = dataUser.name;
}

// Dark mode
const savedTheme = localStorage.getItem("theme");
// Jika dark mode aktif
if (savedTheme === "dark") {
  document.body.classList.add("dark");
}

// Kaldender
// Ambil elemen
const monthYear = document.getElementById("monthyear");
const daysContainer = document.getElementById("days");

const prev = document.getElementById("prev");
const next = document.getElementById("next");

const prevYear = document.getElementById("prevyear");
const nextYear = document.getElementById("nextyear");

const yearText = document.getElementById("yeartext");

// Tanggal sekarang
let date = new Date();

// Render kalender
function renderCalendar() {
  // Tahun & bulan
  const year = date.getFullYear();
  const month = date.getMonth();

  // Tampilkan tahun
  yearText.textContent = year;

  // Nama bulan
  const monthNames = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  // Tampilkan bulan
  monthYear.textContent = `${monthNames[month]} ${year}`;

  // Hari pertama
  const firstDay = new Date(year, month, 1).getDay();

  // Jumlah tanggal
  const lastDate = new Date(year, month + 1, 0).getDate();

  // Reset isi kalender
  daysContainer.innerHTML = "";

  // Kotak kosong sebelum tanggal 1
  for (let i = 0; i < firstDay; i++) {
    const empty = document.createElement("div");
    empty.classList.add("empty");
    daysContainer.appendChild(empty);
  }

  // Isi tanggal
  for (let i = 1; i <= lastDate; i++) {
    const day = document.createElement("div");
    day.innerText = i;

    // Hari minggu
    const dayIndex = new Date(year, month, i).getDay();

    if (dayIndex === 0) {
      day.classList.add("minggu");
    }
    // Hari ini
    const today = new Date();

    if (
      i === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    ) {
      day.classList.add("today");
    }

    // Klik tanggal
    day.addEventListener("click", () => {
      const selectedDate = `${year}-${month + 1}-${i}`;

      // Pindah halaman
      window.location.href = `note-mode.html?date=${selectedDate}`;
    });

    // Masukkan ke kalender
    daysContainer.appendChild(day);
  }
}

// Button bulan
// Bulan berikutnya
next.addEventListener("click", () => {
  date.setMonth(date.getMonth() + 1);
  renderCalendar();
});

// Bulan sebelumnya
prev.addEventListener("click", () => {
  date.setMonth(date.getMonth() - 1);
  renderCalendar();
});

// Button tahun
// Tahun berikutnya
nextYear.onclick = () => {
  date.setFullYear(date.getFullYear() + 1);
  renderCalendar();
};

// Tahun sebelumnya
prevYear.onclick = () => {
  date.setFullYear(date.getFullYear() - 1);
  renderCalendar();
};

// Render pertama kali
renderCalendar();
