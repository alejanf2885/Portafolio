const canvas = document.getElementById('starCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  const container = document.querySelector('.col-2');
  canvas.width = container.clientWidth;
  canvas.height = container.clientHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

const stars = [];
const starCount = 100; // Número de estrellas

// Crear estrellas iniciales
for (let i = 0; i < starCount; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 2,
    speedX: (Math.random() - 0.5) * 0.5, // Velocidad horizontal
    speedY: (Math.random() - 0.5) * 0.5, // Velocidad vertical
    brightness: Math.random() * 255
  });
}

// Función para dibujar estrellas
function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  stars.forEach(star => {
    ctx.fillStyle = `rgba(${star.brightness}, ${star.brightness}, ${star.brightness}, 1)`;
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
    ctx.fill();

    // Actualizar posición de la estrella
    star.x += star.speedX;
    star.y += star.speedY;

    // Rebotar en los bordes
    if (star.x < 0 || star.x > canvas.width) star.speedX *= -1;
    if (star.y < 0 || star.y > canvas.height) star.speedY *= -1;
  });

  requestAnimationFrame(drawStars);
}

drawStars();