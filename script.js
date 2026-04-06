// ===== PARTICLES (OPTIMIZED) =====
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

let particles = [];
let particleCount = Math.min(100, Math.floor(window.innerWidth / 12)); // responsive

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

class Particle {
    constructor() {
        this.reset(true);
    }

    reset(initial = false) {
        this.x = initial ? Math.random() * canvas.width : canvas.width / 2;
        this.y = initial ? Math.random() * canvas.height : canvas.height / 2;

        this.size = Math.random() * 1.8 + 0.4;
        this.speedX = (Math.random() - 0.5) * 0.2;
        this.speedY = (Math.random() - 0.5) * 0.2;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // wrap instead of reset (smoother)
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);

        ctx.fillStyle = "rgba(0,255,166,0.5)";
        ctx.shadowColor = "#00F7A5";
        ctx.shadowBlur = 6;

        ctx.fill();
    }
}

// init
particles = Array.from({ length: particleCount }, () => new Particle());

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let p of particles) {
        p.update();
        p.draw();
    }

    requestAnimationFrame(animate);
}
animate();


