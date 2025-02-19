class Square {
    constructor(gameContainer, scoreDisplay) {
        this.gameContainer = gameContainer;
        this.scoreDisplay = scoreDisplay;
        this.sizes = [20, 40, 60];
        this.points = { 20: 3, 40: 2, 60: 1 };
        this.size = this.sizes[Math.floor(Math.random() * this.sizes.length)];
        this.square = document.createElement("div");
        this.dx = Math.random() > 0.5 ? 2 : -2;
        this.dy = Math.random() > 0.5 ? 2 : -2;
        this.create();
    }

    create() {
        this.square.classList.add("square");
        this.square.style.width = `${this.size}px`;
        this.square.style.height = `${this.size}px`;
        this.square.style.backgroundColor = "red";
        this.square.style.position = "absolute";
        this.x = Math.random() * (400 - this.size);
        this.y = Math.random() * (400 - this.size);
        this.square.style.left = `${this.x}px`;
        this.square.style.top = `${this.y}px`;
        this.gameContainer.appendChild(this.square);
        
        this.square.addEventListener("click", () => this.handleClick());

        this.timer = setTimeout(() => this.remove(), 20000);
        this.move();
    }

    move() {
        const animate = () => {
            this.x += this.dx;
            this.y += this.dy;

            if (this.x <= 0 || this.x >= 400 - this.size) this.dx *= -1;
            if (this.y <= 0 || this.y >= 400 - this.size) this.dy *= -1;

            this.square.style.left = `${this.x}px`;
            this.square.style.top = `${this.y}px`;

            this.animationFrame = requestAnimationFrame(animate);
        };
        animate();
    }

    handleClick() {
        score += this.points[this.size];
        this.scoreDisplay.textContent = score;
        this.remove();
    }

    remove() {
        clearTimeout(this.timer);
        cancelAnimationFrame(this.animationFrame);
        this.square.remove();
        new Square(this.gameContainer, this.scoreDisplay);
    }
}


const gameContainer = document.getElementById("gameContainer");
const scoreDisplay = document.getElementById("score");
let score = 0;

for (let i = 0; i < 5; i++) {
    new Square(gameContainer, scoreDisplay);
}
