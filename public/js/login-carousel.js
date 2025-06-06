var slides = document.querySelectorAll(".slide");
var dots = document.querySelectorAll(".dot");
let index = 0;

function showSlide(i) {
    slides.forEach((slide, idx) => {
        slide.classList.toggle("active", idx === i);
        dots[idx].classList.toggle("active", idx === i);
    });
    index = i;
}

function nextSlide() {
    index = (index + 1) % slides.length;
    showSlide(index);
}

dots.forEach(dot => {
    dot.addEventListener("click", () => {
        showSlide(Number(dot.dataset.index));
    });
});


setInterval(nextSlide, 4000);