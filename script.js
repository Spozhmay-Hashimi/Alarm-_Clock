const selectMenu = document.querySelectorAll("select");
const timeBox = document.querySelector(".time");
const setAlarmBtn = document.querySelector("button");
const content = document.querySelector(".content");
let alarmTime,
  alramState = "noset";
const ringtone = new Audio("Martin-Czerny-Dreaming-of-Us.mp3");
// console.log(selectMenu);
for (let i = 23; i >= 0; i--) {
  i = i < 10 ? "0" + i : i;
  let option = `<option value="${i}">${i}</option>`;
  selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
  console.log(option);
}

for (let i = 59; i >= 0; i--) {
  i = i < 10 ? "0" + i : i;
  let option = `<option value="${i}">${i}</option>`;
  selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
  console.log(option);
}

setInterval(() => {
  let date = new Date();
  let h = date.getHours();
  let m = date.getMinutes();
  let s = date.getSeconds();

  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;

  timeBox.innerHTML = `${h}:${m}:${s}`;
  if (alarmTime == `${h}:${m}`) {
    ringtone.play();
    ringtone.loop = true;
  }
}, 1000);

setAlarmBtn.addEventListener("click", () => {
  alarmTime = `${selectMenu[0].value}:${selectMenu[1].value}`;
  //   console.log(alarmTime);
  if (alarmTime.includes("Hour") || alarmTime.includes("Minute")) {
    return alert("زمان هشدار را به درستی مشخص کنید");
  }
  checkState(alramState);
});

function checkState(state) {
  if (state == "noset") {
    content.classList.add("disable");
    setAlarmBtn.innerHTML = "clear Alarm";
    alramState = "set";
  } else {
    content.classList.remove("disable");
    alarmTime = "";
    ringtone.pause();
    alramState = "noset";
    setAlarmBtn.innerHTML = "Set Alarm";
  }
}
