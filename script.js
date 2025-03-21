document.getElementById("generateBtn").addEventListener("click", generatePalette);
        
function generatePalette() {
    const palette = document.getElementById("palette");
    const numColors = document.getElementById("numColors").value;
    palette.innerHTML = "";
    for (let i = 0; i < numColors; i++) {
        let color = getRandomColor();
        let colorBox = document.createElement("div");
        colorBox.className = "color-box";
        colorBox.style.backgroundColor = color;
        colorBox.innerText = color;
        colorBox.addEventListener("click", () => copyToClipboard(color));
        palette.appendChild(colorBox);
    }
}

function getRandomColor() {
    let letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
function copyToClipboard(color) {
    navigator.clipboard.writeText(color);
    
    // Create a custom alert div
    let alertBox = document.createElement("div");
    alertBox.className = "copy-alert";
    alertBox.innerText = `Copied: ${color}`;
    
    document.body.appendChild(alertBox);

    // Remove the alert after 2 seconds
    setTimeout(() => {
        alertBox.remove();
    }, 2000);
}
