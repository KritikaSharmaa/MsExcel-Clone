let fileChild = document.querySelectorAll(".file_child>li");
let title = document.querySelector(".title").innerText;

fileChild[0].addEventListener("click", () => {
  localStorage.setItem(`${title}`, JSON.stringify(Cells_ObjectRecord));
});

fileChild[1].addEventListener("click", () => {
  localStorage.removeItem(`${title}`);
  location.reload();
});

//if Data object is already present then load its value on UI
if (
  localStorage.getItem(`${title}`) != null &&
  localStorage.getItem(`${title}`) != ""
) {
  let dataObj = JSON.parse(localStorage.getItem(`${title}`));
  for (let cellAdd in dataObj) {
    let currCell = document.querySelector(`[cell-address=${cellAdd}]`);

    if (dataObj[cellAdd].value != undefined) {
      currCell.innerText = dataObj[cellAdd].value;
      Cells_ObjectRecord[cellAdd].value = dataObj[cellAdd].value;
    }
    if (dataObj[cellAdd].Bold != undefined) {
      currCell.style.font = dataObj[cellAdd].Bold;
      Cells_ObjectRecord[cellAdd].Bold = dataObj[cellAdd].Bold;
    }

    if (dataObj[cellAdd].Italic != undefined) {
      currCell.style.font = dataObj[cellAdd].Italic;
      Cells_ObjectRecord[cellAdd].Italic = dataObj[cellAdd].Italic;
    }

    if (dataObj[cellAdd].Underline != undefined) {
      currCell.style.textDecoration = dataObj[cellAdd].Underline;
      Cells_ObjectRecord[cellAdd].Underline = dataObj[cellAdd].Underline;
    }

    if (dataObj[cellAdd].fontStyle != undefined) {
      currCell.style.fontFamily = dataObj[cellAdd].fontStyle;
      Cells_ObjectRecord[cellAdd].fontStyle = dataObj[cellAdd].fontStyle;
    }

    if (dataObj[cellAdd].fontSize != undefined) {
      currCell.style.fontSize = dataObj[cellAdd].fontSize + "px";
      Cells_ObjectRecord[cellAdd].fontSize = dataObj[cellAdd].fontSize;
    }
    //..
    if (dataObj[cellAdd].textAlign != undefined) {
      currCell.style.textAlign = dataObj[cellAdd].textAlign;
      Cells_ObjectRecord[cellAdd].textAlign = dataObj[cellAdd].textAlign;
    }
    //..
    if (dataObj[cellAdd].backgroundColor != undefined) {
      currCell.style.backgroundColor = dataObj[cellAdd].backgroundColor;
      Cells_ObjectRecord[cellAdd].backgroundColor =
        dataObj[cellAdd].backgroundColor;
    }

    if (dataObj[cellAdd].fontColor != undefined) {
      currCell.style.color = dataObj[cellAdd].fontColor;
      Cells_ObjectRecord[cellAdd].fontColor = dataObj[cellAdd].fontColor;
    }
  }
}
