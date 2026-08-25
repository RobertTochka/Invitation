(() => {
  const envelopeScreen = document.getElementById("envelopeScreen");
  const invitation = document.getElementById("invitation");
  const openButton = document.getElementById("openInvitation");

  // Пока открыт конверт, страница физически не может скроллиться.
  document.body.classList.remove("invitation-open");

  openButton.addEventListener("click", () => {
    envelopeScreen.classList.add("open");
    invitation.classList.add("visible");
    invitation.setAttribute("aria-hidden", "false");
    document.body.classList.add("invitation-open");
    window.scrollTo(0, 0);
  });

  // Календарь сентября 2026.
  const calendar = document.getElementById("calendar");
  ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"].forEach((name) => {
    const el = document.createElement("div");
    el.className = "weekday";
    el.textContent = name;
    calendar.appendChild(el);
  });

  const first = new Date(2026, 8, 1);
  const offset = (first.getDay() + 6) % 7;
  for (let i = 0; i < offset; i++)
    calendar.appendChild(document.createElement("div"));
  for (let day = 1; day <= 30; day++) {
    const el = document.createElement("div");
    el.className = "day" + (day === 26 ? " wedding" : "");
    el.textContent = day;
    calendar.appendChild(el);
  }

  // Обратный отсчёт до 26 сентября 2026, 15:00 (МСК).
  const target = new Date("2026-09-26T15:00:00+03:00").getTime();
  const pad = (n, len) => String(n).padStart(len, "0");

  function updateCountdown() {
    const diff = Math.max(0, target - Date.now());
    const total = Math.floor(diff / 1000);
    const days = Math.floor(total / 86400);
    const hours = Math.floor((total % 86400) / 3600);
    const minutes = Math.floor((total % 3600) / 60);
    const seconds = total % 60;
    document.getElementById("days").textContent = pad(days, 2);
    document.getElementById("hours").textContent = pad(hours, 2);
    document.getElementById("minutes").textContent = pad(minutes, 2);
    document.getElementById("seconds").textContent = pad(seconds, 2);
  }
  updateCountdown();
  setInterval(updateCountdown, 1000);
})();
