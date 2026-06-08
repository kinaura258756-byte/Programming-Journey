// =========================
// GET TODAY
// =========================

function getToday() {
    return new Date().toDateString();
}

// =========================
// ELEMENTS
// =========================

const boxes =
    document.querySelectorAll(".shalat");

const locationInput =
    document.getElementById("locationInput");

const suggestions =
    document.getElementById("suggestions");

// =========================
// STORAGE
// =========================

let data =
    JSON.parse(
        localStorage.getItem("history")
    ) || {};

let streak =
    parseInt(
        localStorage.getItem("streak")
    ) || 0;

let lastDate =
    localStorage.getItem("lastDate") || "";

let prayerData = {};
let chartInstance = null;
let countdownInterval = null;
let adzanInterval = null;
let selectedCity = "Solo";
let selectedCountry = "Indonesia";

// =========================
// SAVED LOCATION
// =========================

const savedLocation =
    JSON.parse(
        localStorage.getItem(
            "savedLocation"
        )
    );

if (savedLocation) {

    selectedCity =
        savedLocation.city;

    selectedCountry =
        savedLocation.country;
}

// =========================
// LOAD TODAY CHECKLIST
// =========================

if (data[getToday()]) {

    boxes.forEach((b, i) => {

        b.checked =
            data[getToday()][i];

    });
}

// =========================
// THEME
// =========================

const toggle =
    document.getElementById(
        "themeToggle"
    );

const savedTheme =
    localStorage.getItem("theme");

if (savedTheme === "light") {

    document.body.classList.add(
        "light-mode"
    );
}

toggle.onclick = () => {

    document.body.classList.toggle(
        "light-mode"
    );

    if (
        document.body.classList.contains(
            "light-mode"
        )
    ) {

        localStorage.setItem(
            "theme",
            "light"
        );

    } else {

        localStorage.setItem(
            "theme",
            "dark"
        );
    }
};

// =========================
// START APP
// =========================

function startApp() {

    const landing =
        document.getElementById(
            "landing"
        );

    const app =
        document.getElementById(
            "app"
        );

    landing.classList.add(
        "fade-out"
    );

    setTimeout(() => {

        landing.style.display = "none";

        landing.classList.remove(
            "fade-out"
        );

        app.style.display = "block";

        app.classList.add(
            "fade-in"
        );

    }, 600);

    document.getElementById(
        "app"
    ).style.display = "block";

    document.getElementById(
            "todayText"
        ).innerText =
        new Date().toLocaleDateString(
            "id-ID", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric"
            }
        );

    locationInput.value =
        `${selectedCity}, ${selectedCountry}`;

    updateStats();
    updateProgress();
    renderCalendar();
    renderChart();
    fetchPrayerTimes(
        selectedCity,
        selectedCountry
    );

    requestNotification();
    updateDynamicBackground();
}

// =========================
// HELPERS
// =========================

function isFull(arr) {

    return arr.every(v => v);
}

function getChecklist() {

    const arr = [];

    boxes.forEach(b => {

        arr.push(b.checked);

    });

    return arr;
}

// =========================
// SAVE
// =========================

function save() {

    const today =
        getToday();

    const arr =
        getChecklist();

    data[today] = arr;

    if (lastDate !== today) {

        if (isFull(arr)) {

            const yesterday =
                new Date();

            yesterday.setDate(
                yesterday.getDate() - 1
            );

            if (
                lastDate ===
                yesterday.toDateString()
            ) {

                streak++;

            } else {

                streak = 1;
            }

        } else {

            streak = 0;
        }

        lastDate = today;
    }

    localStorage.setItem(
        "history",
        JSON.stringify(data)
    );

    localStorage.setItem(
        "streak",
        streak
    );

    localStorage.setItem(
        "lastDate",
        lastDate
    );

    updateStats();

    updateProgress();

    renderCalendar();

    renderChart();
}

// =========================
// ANIMATE NUMBER
// =========================

function animateValue(
    id,
    start,
    end,
    duration
) {

    const obj =
        document.getElementById(id);

    if (start === end) {

        obj.innerText =
            id === "consistency" ?
            end + "%" :
            end;

        return;
    }

    let current = start;

    const range =
        end - start;

    const increment =
        end > start ? 1 : -1;

    const stepTime =
        Math.abs(
            Math.floor(duration / range)
        );

    const timer =
        setInterval(() => {

            current += increment;

            obj.innerText =
                id === "consistency" ?
                current + "%" :
                current;

            if (current == end) {

                clearInterval(timer);
            }

        }, stepTime);
}

// =========================
// UPDATE STATS
// =========================

function updateStats() {

    const keys =
        Object.keys(data);

    let fullDays = 0;

    keys.forEach(k => {

        if (isFull(data[k])) {

            fullDays++;
        }

    });

    const consistency =
        keys.length ?
        Math.round(
            (fullDays / keys.length) * 100
        ) :
        0;

    animateValue(
        "streak",
        0,
        streak,
        400
    );

    animateValue(
        "total",
        0,
        keys.length,
        400
    );

    animateValue(
        "consistency",
        0,
        consistency,
        500
    );
}

// =========================
// UPDATE PROGRESS
// =========================

function updateProgress() {

    let count = 0;

    boxes.forEach(b => {

        if (b.checked) {

            count++;
        }

    });

    document.getElementById(
            "progressText"
        ).innerText =
        count + "/5 selesai";

    document.getElementById(
            "progressFill"
        ).style.width =
        (count / 5 * 100) + "%";

    if (count === 5) {

        document.getElementById(
            "successText"
        ).style.display = "block";

    } else {

        document.getElementById(
            "successText"
        ).style.display = "none";
    }
}

// =========================
// CHECKBOX EVENTS
// =========================

boxes.forEach(box => {

    box.addEventListener(
        "change",
        () => {

            box.parentElement.animate([{
                    transform: "scale(1)"
                },
                {
                    transform: "scale(1.03)"
                },
                {
                    transform: "scale(1)"
                }
            ], {
                duration: 250
            });

            updateProgress();

            save();
        }
    );

});

// =========================
// CALENDAR
// =========================

let currentMonth =
    new Date();

const monthSelect =
    document.getElementById(
        "monthSelect"
    );

const yearSelect =
    document.getElementById(
        "yearSelect"
    );

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
    "Desember"
];

// isi bulan
monthNames.forEach((m, i) => {

    const option =
        document.createElement("option");

    option.value = i;

    option.textContent = m;

    monthSelect.appendChild(option);
});

// isi tahun
for (let y = 2020; y <= 2035; y++) {

    const option =
        document.createElement("option");

    option.value = y;

    option.textContent = y;

    yearSelect.appendChild(option);
}

// saat bulan berubah
monthSelect.onchange = () => {

    currentMonth.setMonth(
        parseInt(monthSelect.value)
    );

    renderCalendar();
};

// saat tahun berubah
yearSelect.onchange = () => {

    currentMonth.setFullYear(
        parseInt(yearSelect.value)
    );

    renderCalendar();
};

function changeMonth(n) {

    currentMonth.setMonth(
        currentMonth.getMonth() + n
    );

    renderCalendar();
}

function renderCalendar() {

    const cal =
        document.getElementById(
            "calendar"
        );

    cal.innerHTML = "";

    const year =
        currentMonth.getFullYear();

    const month =
        currentMonth.getMonth();
    monthSelect.value = month;

    yearSelect.value = year;

    const firstDay =
        new Date(
            year,
            month,
            1
        ).getDay();

    const totalDays =
        new Date(
            year,
            month + 1,
            0
        ).getDate();



    for (let i = 0; i < firstDay; i++) {

        cal.appendChild(
            document.createElement("div")
        );
    }

    for (let d = 1; d <= totalDays; d++) {

        const date =
            new Date(
                year,
                month,
                d
            ).toDateString();

        const div =
            document.createElement("div");

        div.className = "day";

        div.innerText = d;

        if (date === getToday()) {

            div.classList.add("today");
        }

        if (data[date]) {

            if (isFull(data[date])) {

                div.classList.add("full");

            } else if (
                data[date].some(v => v)
            ) {

                div.classList.add("partial");
            }
        }

        div.onclick = () => {

            showDetail(date);
        };

        cal.appendChild(div);
    }
}

// =========================
// DETAIL
// =========================

function showDetail(date) {

    const detail =
        document.getElementById(
            "detailBox"
        );

    if (!data[date]) {

        detail.innerHTML = `
      <b>${date}</b><br>
      Belum ada data.
    `;

        return;
    }

    const names = [
        "Subuh",
        "Dzuhur",
        "Ashar",
        "Maghrib",
        "Isya"
    ];

    let html =
        `<b>${date}</b><br>`;

    data[date].forEach((v, i) => {

        html += `
      ${v ? "✅":"❌"}
      ${names[i]}<br>
    `;
    });

    detail.innerHTML = html;
}

// =========================
// CHART
// =========================

function renderChart() {

    const last7 = [];

    const values = [];

    for (let i = 6; i >= 0; i--) {

        const d =
            new Date();

        d.setDate(
            d.getDate() - i
        );

        const key =
            d.toDateString();

        last7.push(
            d.toLocaleDateString(
                "id-ID", {
                    weekday: "short"
                }
            )
        );

        if (data[key]) {

            values.push(
                data[key]
                .filter(v => v)
                .length
            );

        } else {

            values.push(0);
        }
    }

    const ctx =
        document.getElementById(
            "ibadahChart"
        );

    if (chartInstance) {

        chartInstance.destroy();
    }

    chartInstance =
        new Chart(ctx, {
            type: "line",

            data: {
                labels: last7,

                datasets: [{
                    label: "Shalat",
                    data: values,
                    tension: 0.4
                }]
            },

            options: {
                responsive: true,

                scales: {
                    y: {
                        beginAtZero: true,
                        max: 5
                    }
                }
            }
        });
}

// =========================
// LOCATION SEARCH
// =========================

locationInput.addEventListener(
    "input",
    async (e) => {

        const keyword =
            e.target.value.trim();

        if (keyword.length < 2) {

            suggestions.innerHTML = "";

            return;
        }

        try {

            const response =
                await fetch(
                    `https://geocoding-api.open-meteo.com/v1/search?
                     name=${keyword}&count=5&language=id&format=json`
                );

            const result =
                await response.json();

            suggestions.innerHTML = "";

            if (!result.results) {

                suggestions.innerHTML = `
          <div class="suggestion-item">
            Lokasi tidak ditemukan
          </div>
        `;

                return;
            }

            result.results.forEach(loc => {

                const item =
                    document.createElement("div");

                item.className =
                    "suggestion-item";

                item.innerHTML = `
          <b>${loc.name}</b><br>
          <small>${loc.country}</small>
        `;

                item.onclick = () => {

                    selectedCity =
                        loc.name;

                    selectedCountry =
                        loc.country;

                    locationInput.value =
                        `${selectedCity}, ${selectedCountry}`;

                    suggestions.innerHTML = "";

                    localStorage.setItem(
                        "savedLocation",
                        JSON.stringify({
                            city: selectedCity,
                            country: selectedCountry
                        })
                    );

                    fetchPrayerTimes(
                        selectedCity,
                        selectedCountry
                    );
                };

                suggestions.appendChild(item);
            });

        } catch (err) {

            console.log(err);
        }
    }
);

// =========================
// FETCH PRAYER TIMES
// =========================

async function fetchPrayerTimes(
    city = "Solo",
    country = "Indonesia"
) {

    try {

        const response =
            await fetch(
                `https://api.aladhan.com/v1/timingsByCity?
                city=${city}&country=${country}&method=11`
            );

        const result =
            await response.json();

        const t =
            result.data.timings;

        prayerData = t;

        document.getElementById(
            "subuh"
        ).innerText = t.Fajr;

        document.getElementById(
            "dzuhur"
        ).innerText = t.Dhuhr;

        document.getElementById(
            "ashar"
        ).innerText = t.Asr;

        document.getElementById(
            "maghrib"
        ).innerText = t.Maghrib;

        document.getElementById(
            "isya"
        ).innerText = t.Isha;

        startCountdown();

        startAdzanNotifier();

    } catch (err) {

        console.log(err);
    }
}

// =========================
// COUNTDOWN FIXED
// =========================

function startCountdown() {

    // hapus interval lama
    if (countdownInterval) {

        clearInterval(
            countdownInterval
        );
    }

    function updateCountdown() {

        const prayers = [{
                name: "Subuh",
                time: prayerData.Fajr
            },
            {
                name: "Dzuhur",
                time: prayerData.Dhuhr
            },
            {
                name: "Ashar",
                time: prayerData.Asr
            },
            {
                name: "Maghrib",
                time: prayerData.Maghrib
            },
            {
                name: "Isya",
                time: prayerData.Isha
            }
        ];

        const now =
            new Date();

        let nextPrayer =
            null;

        for (let p of prayers) {

            const [h, m] =
            p.time.split(":");

            const prayerTime =
                new Date();

            prayerTime.setHours(
                parseInt(h),
                parseInt(m),
                0,
                0
            );

            if (prayerTime > now) {

                nextPrayer = {
                    name: p.name,
                    time: prayerTime
                };

                break;
            }
        }

        // kalau semua lewat
        if (!nextPrayer) {

            const [h, m] =
            prayers[0].time.split(":");

            const tomorrow =
                new Date();

            tomorrow.setDate(
                tomorrow.getDate() + 1
            );

            tomorrow.setHours(
                parseInt(h),
                parseInt(m),
                0,
                0
            );

            nextPrayer = {
                name: "Subuh",
                time: tomorrow
            };
        }

        const diff =
            nextPrayer.time - now;

        const hours =
            Math.floor(
                diff / 1000 / 60 / 60
            );

        const minutes =
            Math.floor(
                diff / 1000 / 60
            ) % 60;

        const seconds =
            Math.floor(
                diff / 1000
            ) % 60;

        document.getElementById(
                "nextPrayerName"
            ).innerText =
            `Menuju ${nextPrayer.name}`;

        document.getElementById(
                "countdown"
            ).innerText =
            `${String(hours).padStart(2,"0")}:${String(minutes).
            padStart(2,"0")}:${String(seconds).padStart(2,"0")}`;
    }

    updateCountdown();

    countdownInterval =
        setInterval(
            updateCountdown,
            1000
        );
}

// =========================
// NOTIFICATION
// =========================

async function requestNotification() {

    if (
        Notification.permission !==
        "granted"
    ) {

        await Notification.requestPermission();
    }
}

// =========================
// ADZAN NOTIFIER FIXED
// =========================

function startAdzanNotifier() {

    // hapus interval lama
    if (adzanInterval) {

        clearInterval(
            adzanInterval
        );
    }

    adzanInterval =
        setInterval(() => {

            const now =
                new Date();

            const current =
                `${String(now.getHours()).padStart(2,"0")}
                :${String(now.getMinutes()).padStart(2,"0")}`;

            const prayers = {
                Subuh: prayerData.Fajr,
                Dzuhur: prayerData.Dhuhr,
                Ashar: prayerData.Asr,
                Maghrib: prayerData.Maghrib,
                Isya: prayerData.Isha
            };

            for (let name in prayers) {

                if (
                    current ===
                    prayers[name]
                ) {

                    new Notification(
                        `🕌 Waktu ${name}`, {
                            body: `Saatnya shalat ${name}`
                        }
                    );
                }
            }

        }, 60000);
}

// =========================
// DYNAMIC BACKGROUND
// =========================

function updateDynamicBackground() {

    const hour = 
        new Date().getHours();

    // hapus semua class lama
    document.body.classList.remove(
        "subuh-bg",
        "dzuhur-bg",
        "ashar-bg",
        "maghrib-bg",
        "isya-bg"
    );

    // 🌅 SUBUH
    if (hour >= 4 && hour < 11) {

        document.body.classList.add(
            "subuh-bg"
        );
    }

    // ☀️ DZUHUR
    else if (hour >= 11 && hour < 15) {

        document.body.classList.add(
            "dzuhur-bg"
        );
    }

    // 🌤 ASHAR
    else if (hour >= 15 && hour < 18) {

        document.body.classList.add(
            "ashar-bg"
        );
    }

    // 🌇 MAGHRIB
    else if (hour >= 18 && hour < 19) {

        document.body.classList.add(
            "maghrib-bg"
        );
    }

    // 🌙 ISYA
    else {

        document.body.classList.add(
            "isya-bg"
        );
    }
}

// jalankan pertama kali
updateDynamicBackground();

// update otomatis tiap menit
setInterval(
    updateDynamicBackground,
    60000
);

// =========================
// BACK TO LANDING
// =========================

function backToLanding() {

    const app =
        document.getElementById(
            "app"
        );

    const landing =
        document.getElementById(
            "landing"
        );

    // app keluar pelan
    app.classList.add(
        "fade-out"
    );

    setTimeout(() => {

        app.style.display = "none";

        app.classList.remove(
            "fade-out"
        );

        // munculin landing
        landing.style.display = "flex";

        // reset opacity
        landing.classList.add(
            "fade-in"
        );

    }, 600);
}