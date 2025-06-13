// Mouse movement parallax effect
document.addEventListener('mousemove', function(e) {
    const shapes = document.querySelectorAll('.floating-shape');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.5;
        const x = (mouseX - 0.5) * speed * 20;
        const y = (mouseY - 0.5) * speed * 20;
        shape.style.transform = `translate(${x}px, ${y}px)`;
    });
});

document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        document.body.classList.add('enter-pressed');
        setTimeout(() => {
            window.location.href = "/algorithm"; 
        }, 800);
    }
});