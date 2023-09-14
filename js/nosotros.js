const carousel = document.querySelector('.carousel');
const boxes = document.querySelectorAll('.box');
const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');

let currentIndex = 0;

function showBox(index) {
    boxes.forEach((box, i) => {
        if (i === index) {
            box.style.opacity = '1';
            const translateX = -i * (box.clientWidth + 20); // 20px de margen derecho
            carousel.style.transform = `translateX(${translateX}px)`;
        } else {
            box.style.opacity = '0';
        }
    });
}

nextButton.addEventListener('click', () => {
    currentIndex++;
    if (currentIndex >= boxes.length) {
        currentIndex = 0;
    }
    showBox(currentIndex);
});

prevButton.addEventListener('click', () => {
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = boxes.length - 1;
    }
    showBox(currentIndex);
});

// Mostrar la primera caja al cargar la página
showBox(currentIndex);
