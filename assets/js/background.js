document.addEventListener("DOMContentLoaded", function () {
    const starCount = 150;
    const body = document.body;

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement("div");
        star.classList.add("star");

        const x = Math.random() * 100;
        const y = Math.random() * 100;

        const size = Math.random() * 2 + 1;

        const duration = Math.random() * 3 + 2;
        const delay = Math.random() * 5;

        star.style.left = `${x}%`;
        star.style.top = `${y}%`;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.animationDuration = `${duration}s`;
        star.style.animationDelay = `${delay}s`;

        body.appendChild(star);
    }

    const nebulaCount = 5;
    const colors = [
        'rgba(0, 100, 255, 0.1)',
        'rgba(0, 255, 179, 0.1)',
        'rgba(255, 136, 0, 0.1)',
        'rgba(255,0,30,0.1)',
        'rgba(255, 0, 128, 0.1)',
        'rgba(138, 43, 226, 0.1)'
    ];

    for (let i = 0; i < nebulaCount; i++) {
        const nebula = document.createElement('div');
        nebula.classList.add('nebula');
        body.appendChild(nebula);

        function animateNebula() {
            const size = Math.random() * 1500 + 1000;
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            const color = colors[Math.floor(Math.random() * colors.length)];

            nebula.style.width = `${size}px`;
            nebula.style.height = `${size}px`;
            nebula.style.left = `${x}%`;
            nebula.style.top = `${y}%`;
            nebula.style.backgroundColor = color;
            nebula.style.transform = 'translate(-50%, -50%)';

            setTimeout(animateNebula, 20000);
        }

        animateNebula();
    }
});
