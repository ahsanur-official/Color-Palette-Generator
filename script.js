document
  .getElementById("colorType")
  .addEventListener("change", handleTypeChange);
document
  .getElementById("generateBtn")
  .addEventListener("click", generatePalette);

function handleTypeChange() {
  const type = document.getElementById("colorType").value;
  const numColorsControl = document.getElementById("numColorsControl");

  if (type === "mc" || type === "mg") {
    numColorsControl.style.display = "none";
  } else {
    numColorsControl.style.display = "flex";
  }

  document.getElementById("gradientOptions").style.display =
    type === "gradient" || type === "dg" ? "flex" : "none";
  document.getElementById("mixOptions").style.display =
    type === "mc" ? "flex" : "none";
  document.getElementById("mixGradientOptions").style.display =
    type === "mg" ? "flex" : "none";
}

function generatePalette() {
  const palette = document.getElementById("palette");
  const type = document.getElementById("colorType").value;
  const numColors = document.getElementById("numColors").value;
  palette.innerHTML = "";

  if (type === "rgb") {
    for (let i = 0; i < numColors; i++) {
      let color = getRandomColor();
      addColorBox(color, palette);
    }
  } else if (type === "gradient") {
    // FIX: This now creates a unique gradient for each number requested.
    const gradientType = document.getElementById("gradientType").value;
    for (let i = 0; i < numColors; i++) {
      const color1 = getRandomColor();
      const color2 = getRandomColor();
      const colors = [color1, color2];
      let gradient = `${gradientType}-gradient(${
        gradientType === "linear" ? "90deg, " : ""
      }${colors.join(", ")})`;
      addGradientBox(gradient, colors, palette);
    }
  } else if (type === "dc") {
    for (let i = 0; i < numColors; i++) {
      let color = getDarkColor();
      addColorBox(color, palette);
    }
  } else if (type === "dg") {
    // FIX: This now creates a unique dark gradient for each number requested.
    const gradientType = document.getElementById("gradientType").value;
    for (let i = 0; i < numColors; i++) {
      const color1 = getDarkColor();
      const color2 = getDarkColor();
      const colors = [color1, color2];
      let gradient = `${gradientType}-gradient(${
        gradientType === "linear" ? "90deg, " : ""
      }${colors.join(", ")})`;
      addGradientBox(gradient, colors, palette);
    }
  } else if (type === "mc") {
    const color1 = document.getElementById("mixColor1").value;
    const color2 = document.getElementById("mixColor2").value;
    const newColor = mixTwoColors(color1, color2);
    addColorBox(newColor, palette);
  } else if (type === "mg") {
    const gradientType = document.getElementById("mixGradientType").value;
    const color1 = document.getElementById("mixGradientColor1").value;
    const color2 = document.getElementById("mixGradientColor2").value;
    let gradient = `${gradientType}-gradient(${
      gradientType === "linear" ? "90deg, " : ""
    }${color1}, ${color2})`;
    addGradientBox(gradient, [color1, color2], palette);
  }
}

function addColorBox(color, palette) {
  let colorBox = document.createElement("div");
  colorBox.className = "color-box";
  colorBox.style.backgroundColor = color;
  colorBox.innerText = color;
  colorBox.addEventListener("click", () => copyToClipboard(color));
  palette.appendChild(colorBox);
}

function addGradientBox(gradient, colors, palette) {
  let colorBox = document.createElement("div");
  colorBox.className = "color-box";
  colorBox.style.background = gradient;
  const colorText = colors.join("\n");
  colorBox.innerText = colorText;
  colorBox.addEventListener("click", () => copyToClipboard(gradient));
  palette.appendChild(colorBox);
}

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function getDarkColor() {
  const r = Math.floor(Math.random() * 100);
  const g = Math.floor(Math.random() * 100);
  const b = Math.floor(Math.random() * 100);
  return `rgb(${r},${g},${b})`;
}

function hexToRgb(hex) {
  hex = hex.replace("#", "");
  let bigint = parseInt(hex, 16);
  let r = (bigint >> 16) & 255;
  let g = (bigint >> 8) & 255;
  let b = bigint & 255;
  return [r, g, b];
}

function mixTwoColors(c1, c2) {
  const rgb1 = hexToRgb(c1);
  const rgb2 = hexToRgb(c2);
  const mixed = [
    Math.floor((rgb1[0] + rgb2[0]) / 2),
    Math.floor((rgb1[1] + rgb2[1]) / 2),
    Math.floor((rgb1[2] + rgb2[2]) / 2),
  ];
  return `rgb(${mixed[0]},${mixed[1]},${mixed[2]})`;
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text);
  let alertBox = document.createElement("div");
  alertBox.className = "copy-alert";
  alertBox.innerText = `Copied: ${text}`;
  document.body.appendChild(alertBox);
  setTimeout(() => {
    alertBox.remove();
  }, 2000);
}

handleTypeChange();
