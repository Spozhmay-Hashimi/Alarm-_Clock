const hourSelect = document.querySelector("#hour");
const minuteSelect = document.querySelector("#minute");
const timeBox = document.querySelector(".time");
const setAlarmBtn = document.querySelector("button");
const statusBox = document.querySelector(".status");

const ringtone = new Audio("Martin-Czerny-Dreaming-of-Us.mp3");
ringtone.preload = "auto";

let alarmTimestamp = null;
let alarmIsSet = false;
let alarmHasRung = false;

function addOptions(select, count) {
  const options = document.createDocumentFragment();

  for (let value = 0; value < count; value += 1) {
    const formattedValue = String(value).padStart(2, "0");
    options.append(new Option(formattedValue, formattedValue));
  }

  select.append(options);
}

addOptions(hourSelect, 24);
addOptions(minuteSelect, 60);

function updateClock() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  timeBox.textContent = `${hours}:${minutes}:${seconds}`;

  // Compare timestamps so the alarm still rings if the browser delays a timer tick.
  if (alarmIsSet && !alarmHasRung && now.getTime() >= alarmTimestamp) {
    alarmHasRung = true;
    statusBox.textContent = "Alarm is ringing. Press Clear Alarm to stop it.";

    const playAttempt = ringtone.play();
    if (playAttempt && typeof playAttempt.catch === "function") {
      playAttempt.catch(() => {
        statusBox.textContent =
          "The alarm time has arrived, but the browser blocked audio playback. Check your sound settings.";
      });
    }
  }
}

function stopRingtone() {
  ringtone.pause();
  ringtone.currentTime = 0;
  ringtone.loop = false;
}

function clearAlarm() {
  alarmTimestamp = null;
  alarmIsSet = false;
  alarmHasRung = false;

  stopRingtone();
  hourSelect.disabled = false;
  minuteSelect.disabled = false;
  hourSelect.value = "";
  minuteSelect.value = "";

  setAlarmBtn.textContent = "Set Alarm";
  setAlarmBtn.setAttribute("aria-pressed", "false");
  statusBox.textContent = "";
}

setAlarmBtn.addEventListener("click", () => {
  if (alarmIsSet) {
    clearAlarm();
    return;
  }

  if (!hourSelect.value || !minuteSelect.value) {
    statusBox.textContent = "لطفاً ساعت و دقیقهٔ هشدار را انتخاب کنید.";
    return;
  }

  const hours = Number(hourSelect.value);
  const minutes = Number(minuteSelect.value);
  const now = new Date();
  const alarmDate = new Date(now);
  alarmDate.setHours(hours, minutes, 0, 0);

  // If today's selected time has already passed, schedule it for tomorrow.
  if (alarmDate.getTime() <= now.getTime()) {
    alarmDate.setDate(alarmDate.getDate() + 1);
  }

  alarmTimestamp = alarmDate.getTime();
  alarmIsSet = true;
  alarmHasRung = false;
  ringtone.loop = true;

  hourSelect.disabled = true;
  minuteSelect.disabled = true;
  setAlarmBtn.textContent = "Clear Alarm";
  setAlarmBtn.setAttribute("aria-pressed", "true");
  statusBox.textContent = `Alarm set for ${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}.`;
});

updateClock();
setInterval(updateClock, 1000);
