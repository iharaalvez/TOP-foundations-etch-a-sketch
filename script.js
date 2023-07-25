const DEFAULT_SIZE = 16;
const DEFAULT_MODE = "picker";

let currentColor;
let currentSize = DEFAULT_SIZE;
let currentMode = DEFAULT_MODE;

const gridContainer = document.getElementById("grid--container");
const colorPicker = document.getElementById("input--color");
const sizePicker = document.getElementById("input--grid-size");
const buttonRgb = document.getElementById("button--rgb");
const buttonPicker = document.getElementById("button--picker");
const buttonEraser = document.getElementById("button--eraser");
const buttonClear = document.getElementById("button--clear");
const buttonShadow = document.getElementById("button--shadow");

colorPicker.oninput = (e) => setColor(e.target.value);
sizePicker.onchange = (e) => setSize(e.target.value);
buttonRgb.onclick = (e) => setMode(e.target.value);
buttonPicker.onclick = (e) => setMode(e.target.value);
buttonEraser.onclick = (e) => setMode(e.target.value);
buttonClear.onclick = (e) => generateGrid(currentSize);
buttonShadow.onclick = (e) => setMode(e.target.value);

function setColor(newColor) {
  currentColor = newColor;
}

function setSize(newSize) {
  currentSize = newSize;
  generateGrid(currentSize);
}

function setMode(newMode) {
  currentMode = newMode;
}

function draw(element) {
  let currentInteractions =
    Number(element.target.getAttribute("cell-interactions")) || 0;

  switch (currentMode) {
    case "picker":
      element.target.style.backgroundColor = currentColor;
      break;
    case "rainbow":
      let r = Math.floor(Math.random() * 256);
      let b = Math.floor(Math.random() * 256);
      let g = Math.floor(Math.random() * 256);
      element.target.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
      break;
    case "shadow":
      if (currentInteractions < 10) {
        let currentBackgroundColor = window.getComputedStyle(
          element.target
        ).backgroundColor;
        let rgbValues = currentBackgroundColor.match(/\d+/g); // Extract RGB values
        let r = Math.max(rgbValues[0] - Math.floor(rgbValues[0] * 0.1), 0);
        let g = Math.max(rgbValues[1] - Math.floor(rgbValues[1] * 0.1), 0);
        let b = Math.max(rgbValues[2] - Math.floor(rgbValues[2] * 0.1), 0);

        element.target.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
        element.target.setAttribute(
          "cell-interactions",
          currentInteractions + 1
        );
      }
      break;
    case "eraser":
      element.target.style.backgroundColor = "#ebe9e9";
      break;
  }
}

function clear() {
  gridContainer.innerHTML = "";
}

function generateGrid(size) {
  clear();

  gridContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  gridContainer.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  for (let i = 0; i < size * size; i++) {
    const div = document.createElement("div");
    gridContainer.appendChild(div);
    div.addEventListener("mouseenter", draw);
  }
}

function startGame() {
  generateGrid(DEFAULT_SIZE);
  setColor(colorPicker.value);
}

startGame();
