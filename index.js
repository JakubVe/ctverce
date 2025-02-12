const gameContainer = document.getElementById("gameContainer");
const scoreDisplay = document.getElementById("score");
let score = 0;
const sizes = [20, 40, 60];
const points = { 20: 3, 40: 2, 60: 1 };

function createSquare() {
    const square = document.createElement("div");
    const size = sizes[Math.floor(Math.random() * sizes.length)];
    square.classList.add("square");
    square.style.width = `${size}px`;
    square.style.height = `${size}px`;
    square.style.backgroundColor = "red";
    square.style.left = `${Math.random() * (400 - size)}px`;
    square.style.top = `${Math.random() * (400 - size)}px`;
    
    square.addEventListener("click", function() {
        score += points[size];
        scoreDisplay.textContent = score;
        square.remove();
        createSquare();
    });
    
    gameContainer.appendChild(square);
    moveSquare(square, size);
}

function moveSquare(square, size) {
    let x = parseInt(square.style.left);
    let y = parseInt(square.style.top);
    let dx = Math.random() > 0.5 ? 2 : -2;
    let dy = Math.random() > 0.5 ? 2 : -2;
    
    function move() {
        x += dx;
        y += dy;
        if (x <= 0 || x >= 400 - size) dx *= -1;
        if (y <= 0 || y >= 400 - size) dy *= -1;
        square.style.left = `${x}px`;
        square.style.top = `${y}px`;
        requestAnimationFrame(move);
    }
    move();
}

for (let i = 0; i < 5; i++) {
    createSquare();
}