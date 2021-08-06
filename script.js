let row_Num_section = document.querySelector(".row_Num_section");
let col_Num_section = document.querySelector(".col_Num_section");
let cell_section = document.querySelector(".cell_section");
let cell = document.querySelector(".grid");
let formulaBar = document.querySelector(".formula_input_section");

let LastSelectedCell;
let Cells_ObjectRecord = {};

cell_section.addEventListener("scroll", (e) => {
  // console.log(cell_section.scrollTop);
  col_Num_section.style.transform = `translateX(-${e.currentTarget.scrollLeft}px)`;
  row_Num_section.style.transform = `translateY(-${e.currentTarget.scrollTop}px)`;
});

//ROW NUMBERS
for (let r = 1; r <= 100; r++) {
  let createDiv = document.createElement("div");
  createDiv.classList.add("rowNum");
  createDiv.innerText = r;
  row_Num_section.append(createDiv);
}
//COLUMN APLHABETS
for (let c = 0; c < 26; c++) {
  let createDiv2 = document.createElement("div");
  let Alphabet = String.fromCharCode(65 + c);
  createDiv2.innerText = Alphabet;
  createDiv2.classList.add("colNum");
  col_Num_section.append(createDiv2);
}

// *_HANDLE INPUT IN CELL_*
for (let i = 1; i <= 100; i++) {
  let create_cellRow = document.createElement("div");
  create_cellRow.classList.add("cellRow");
  for (let j = 0; j < 26; j++) {
    let create_cell = document.createElement("div");
    create_cell.classList.add("cell");
    create_cell.contentEditable = true; // OR..create_cell.setAttribute("contentEditable", true);
    //CALCULATE CELL ADDRESS
    let alphabet = String.fromCharCode(65 + j);
    let cell_address = alphabet + i;
    create_cell.setAttribute("cell-address", cell_address);

    //PROVIDE OUTLINE TO SELECTED CELL
    create_cell.addEventListener("click", (e) => {
      if (LastSelectedCell) {
        LastSelectedCell.classList.remove("currentSelectedCell"); //Remove Previous Selected cell(if any)
      }
      LastSelectedCell = e.target; //Add current Selected Cell
      e.target.classList.add("currentSelectedCell");
      document.querySelector(".selected_Cell_Div").innerText =
        e.target.getAttribute("cell-address");
    });
    //Step-A1:CREATE A GLOBAL OBJECT (cells_objectRecord )-->WHICH KEEPS THE RECORD OF 2600 CELLS OBJECT
    //step-A2: INITIALIZE 2600 OBJECTS FOR EACH CELL WITH THEIR INITIAL VALUES.
    //STEP-A3:ADD INITIALIZED OBJECT TO GLOBAL OBJECT-->WHERE *_KEY=CELL ADDRESS_* and *_VALUE=Current Cell Object_*
    Cells_ObjectRecord[cell_address] = {
      value: undefined,
      formula: undefined,
      upStream: [],
      downStream: [],
      Bold: undefined,
      Italic: undefined,
      Underline: undefined,
      fontStyle: undefined,
      fontSize: undefined,
      textAlign: undefined,
      backgroundColor: undefined,
      fontColor: undefined,
    };
    //ON INPUT IN A CELL-->Update currentcell object's .value property with that input
    create_cell.addEventListener("input", (e) => {
      // console.log(cell_address);-->**CLOSURE** (not sure ki value mil bhi saki hai or nahi bhi, so better k e.currentTarget.getAttribute karle.)

      let currCellAddress = e.currentTarget.getAttribute("cell-address");
      let currCellObj = Cells_ObjectRecord[currCellAddress];

      currCellObj.value = e.target.innerText; //innerText bcz it is a div in which we are giving input
      if (currCellObj.formula != undefined) currCellObj.formula = undefined;
      //UPDATE UPSTREAM-->loop on every parent cell and inform them that i'm no longer depend on you so remove me from your downstream

      for (let u = 0; u < currCellObj.upStream.length; u++) {
        UpdateParentCellsDownStream(currCellObj.upStream[u], cell_address);
      }
      currCellObj.upStream = [];

      //UPDATE DOWNSTREAM-->loop on every derivative of the current cell and inform that i'm updated so update yourself.
      for (let d = 0; d < currCellObj.downStream.length; d++) {
        // let childCell = currCellObj.downStream[d];
        // valueObj[childCell] = Cells_ObjectRecord[childCell].value;
        UpdateDownStreamOfcurrObj(currCellObj.downStream[d]);
      }

      Cells_ObjectRecord[currCellAddress] = currCellObj;
      // console.log(Cells_ObjectRecord);
    });

    create_cellRow.append(create_cell);
  }
  cell_section.append(create_cellRow);
}

//*_HANDLE INPUT IN FORMULA BAR_*
formulaBar.addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    let typedFormula = e.currentTarget.value;
    if (!LastSelectedCell) return;
    let SelectdeCellAdd = LastSelectedCell.getAttribute("cell-address");
    let CellObj = Cells_ObjectRecord[SelectdeCellAdd];
    CellObj.formula = typedFormula;

    let Cellupstream = CellObj.upStream;
    for (let u = 0; u < Cellupstream.length; u++) {
      //-->remove current cell's address from parent cell's .downstream array.
      UpdateParentCellsDownStream(Cellupstream[u], SelectdeCellAdd);
    }
    CellObj.upStream = [];
    //On the basis of new formula update current cell upstream array with new parents.
    let SplitFormulaArr = typedFormula.split(" ");
    for (let f = 0; f < SplitFormulaArr.length; f++) {
      if (
        SplitFormulaArr[f] != "+" &&
        SplitFormulaArr[f] != "-" &&
        SplitFormulaArr[f] != "%" &&
        SplitFormulaArr[f] != "*" &&
        isNaN(SplitFormulaArr[f])
      ) {
        CellObj.upStream.push(SplitFormulaArr[f]);
      }
    }
    let newValues = {};
    for (u = 0; u < CellObj.upStream.length; u++) {
      Cells_ObjectRecord[CellObj.upStream[u]].downStream.push(SelectdeCellAdd);
      newValues[CellObj.upStream[u]] =
        Cells_ObjectRecord[CellObj.upStream[u]].value;
    }
    console.log(newValues);
    //evaluate new formula
    for (let key in newValues) {
      typedFormula = typedFormula.replace(key, newValues[key]);
      //Console.log(typedFormula);
    }
    // console.log(typedFormula);
    CellObj.value = eval(typedFormula);

    //Handle Downstream
    for (let d = 0; d < CellObj.downStream.length; d++) {
      UpdateDownStreamOfcurrObj(CellObj.downStream[d]);
    }

    document.querySelector(`[cell-address=${SelectdeCellAdd}]`).innerText =
      CellObj.value;
    Cells_ObjectRecord[SelectdeCellAdd] = CellObj;
    // console.log(Cells_ObjectRecord);
    formulaBar.value = "";
  }
});

function UpdateParentCellsDownStream(parentCellAdd, childCellAdd) {
  //step-1: fetch karo parent cell ki downstream ko or use ek object mei daal lo
  //step-2: filter karo parentcell ki downStream ko and vo kasie?-->jobi child add aaya h use remove kark bcz ab vo parent cell par depend nahi karta hai
  //step-3:update kardo parent cell k downstream ko filtered downstream array se.
  let filteredDownStream = [];
  let ParentCellDownStream = Cells_ObjectRecord[parentCellAdd].downStream;
  for (let d = 0; d < ParentCellDownStream.length; d++) {
    if (ParentCellDownStream[d] != childCellAdd) {
      filteredDownStream.push(ParentCellDownStream[d]);
    }
  }
  Cells_ObjectRecord[parentCellAdd].downStream = filteredDownStream;
}

function UpdateDownStreamOfcurrObj(currChildAdd) {
  //step-1:Loop over downstream array of current cell .downstream property and go on its each child.
  //step-2:Now child which is dependent on  our current cell for its value--> obviously has some formula-->and we have to evaluate that formula again with new values(updated values)
  //step-3:HOW WE GET NEW VALUES FOR FORMULA?--> cells whose value we required ,their cell address are present in child's upstream array from there we extract all the values.
  //childcell formula="2 + C1 + B1 " the valueobj --> valueobj={C1:3,B1:8}
  let currChildObj = Cells_ObjectRecord[currChildAdd];
  let UpStream = currChildObj.upStream;
  let formula = currChildObj.formula;
  let valObj = {};
  for (let up = 0; up < UpStream.length; up++) {
    valObj[UpStream[up]] = Cells_ObjectRecord[UpStream[up]].value;
  }
  for (let key in valObj) {
    formula = formula.replace(key, valObj[key]);
  }
  let newFormulaValue = eval(formula);
  Cells_ObjectRecord[currChildAdd].value = newFormulaValue;

  //RECURSION ->and yha for loop hi baseCase hai bcz agr downstram hua to for loop chlega hi nahi
  let descendantofChild = currChildObj.downStream;
  for (let d = 0; d < descendantofChild.length; d++) {
    UpdateDownStreamOfcurrObj(descendantofChild[d]);
  }
}
