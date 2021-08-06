let BIU = document.querySelectorAll(".BIU_area span");
let AlignArea = document.querySelectorAll(".align_area span");

let Boldicon = BIU[0];
let italicicon = BIU[1];
let Undelineicon = BIU[2];
let leftAlign = AlignArea[0];
let CenterAlign = AlignArea[1];
let RightAlign = AlignArea[2];

Boldicon.addEventListener("click", () => {
  if (LastSelectedCell) {
    let cellAdd = LastSelectedCell.getAttribute("cell-address");
    LastSelectedCell.style.font = "bold 17px arial,sans-serif";
    Cells_ObjectRecord[cellAdd].Bold = "bold 17px arial,sans-serif";
  }
});
italicicon.addEventListener("click", () => {
  if (LastSelectedCell) {
    let cellAdd = LastSelectedCell.getAttribute("cell-address");
    LastSelectedCell.style.font = "italic 17px arial,serif";
    Cells_ObjectRecord[cellAdd].Italic = "italic 17px arial,serif";
  }
});
Undelineicon.addEventListener("click", () => {
  if (LastSelectedCell) {
    let cellAdd = LastSelectedCell.getAttribute("cell-address");
    LastSelectedCell.style.textDecoration = "underline";
    Cells_ObjectRecord[cellAdd].Underline = "underline";
  }
});
leftAlign.addEventListener("click", () => {
  if (LastSelectedCell) {
    let cellAdd = LastSelectedCell.getAttribute("cell-address");
    LastSelectedCell.style.textAlign = "left";
    Cells_ObjectRecord[cellAdd].textAlign = "left";
  }
});
RightAlign.addEventListener("click", () => {
  if (LastSelectedCell) {
    let cellAdd = LastSelectedCell.getAttribute("cell-address");
    LastSelectedCell.style.textAlign = "right";
    Cells_ObjectRecord[cellAdd].textAlign = "right";
  }
});
CenterAlign.addEventListener("click", () => {
  if (LastSelectedCell) {
    let cellAdd = LastSelectedCell.getAttribute("cell-address");
    LastSelectedCell.style.textAlign = "center";
    Cells_ObjectRecord[cellAdd].textAlign = "center";
  }
});

document.querySelector(".colorPal").addEventListener("change", (e) => {
  if (LastSelectedCell) {
    let cellAdd = LastSelectedCell.getAttribute("cell-address");
    LastSelectedCell.style.backgroundColor = `${e.currentTarget.value}`;
    Cells_ObjectRecord[cellAdd].backgroundColor = e.currentTarget.value;
  }
});

document.querySelector(".fontColorsPal").addEventListener("change", (e) => {
  if (LastSelectedCell) {
    let cellAdd = LastSelectedCell.getAttribute("cell-address");
    LastSelectedCell.style.color = `${e.currentTarget.value}`;
    Cells_ObjectRecord[cellAdd].fontColor = e.currentTarget.value;
  }
});
document.querySelector(".font").addEventListener("change", (e) => {
  //   console.log(e.currentTarget.value);
  if (LastSelectedCell) {
    let cellAdd = LastSelectedCell.getAttribute("cell-address");
    LastSelectedCell.style.fontFamily = `${e.currentTarget.value}`;
    Cells_ObjectRecord[cellAdd].fontStyle = e.currentTarget.value;
  }
});
document.querySelector(".font_size").addEventListener("change", (e) => {
  if (LastSelectedCell) {
    let cellAdd = LastSelectedCell.getAttribute("cell-address");
    LastSelectedCell.style.fontSize = `${e.currentTarget.value}px`;
    Cells_ObjectRecord[cellAdd].fontSize = e.currentTarget.value;
  }
});
document.querySelector(".file").addEventListener("click", () => {
  let selectFileChild = document.querySelector(".file_child");
  if (selectFileChild.classList.contains("hide")) {
    selectFileChild.classList.remove("hide");
  } else {
    selectFileChild.classList.add("hide");
  }
});
document.querySelector(".help").addEventListener("click", () => {
  let modal = document.querySelector("#myModal");
  if (modal.classList.contains("hide")) {
    modal.classList.remove("hide");
  } else {
    modal.classList.add("hide");
  }
});
