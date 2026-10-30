const selectMenu = document.querySelectorAll("select");
const timeBox = document.querySelectorAll(".time");
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

  //   timeBox.innerHTML = `${h}:${m}:${s}`;
  timeBox.innerHTML = `${h}:${m}:${s}`;
}, 1000);
