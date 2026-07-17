const header = document.querySelector("header");

window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 50);
});

document.querySelectorAll(".gallery .image img").forEach((img) => {

    function setOrientation() {
        const container = img.parentElement;

        container.classList.remove("horizontal", "vertical", "square");

        if (img.naturalWidth > img.naturalHeight) {
            container.classList.add("horizontal");
        } else if (img.naturalHeight > img.naturalWidth) {
            container.classList.add("vertical");
        } else {
            container.classList.add("square");
        }
    }

    if (img.complete) {
        setOrientation();
    } else {
        img.addEventListener("load", setOrientation);
    }

});

const testimonials = document.querySelectorAll(".testimonial");
const previousTestimonialButton = document.querySelector(
    ".testimonial-btn.prev"
);
const nextTestimonialButton = document.querySelector(
    ".testimonial-btn.next"
);
const testimonialDotsContainer = document.querySelector(
    ".testimonial-dots"
);

let currentTestimonial = 0;

if (
    testimonials.length > 0 &&
    previousTestimonialButton &&
    nextTestimonialButton &&
    testimonialDotsContainer
) {
    testimonials.forEach((_, index) => {
        const dot = document.createElement("button");

        dot.classList.add("testimonial-dot");
        dot.setAttribute("aria-label", `Ver feedback ${index + 1}`);

        dot.addEventListener("click", () => {
            showTestimonial(index);
        });

        testimonialDotsContainer.appendChild(dot);
    });

    const testimonialDots = document.querySelectorAll(".testimonial-dot");

    function showTestimonial(index) {
        testimonials[currentTestimonial].classList.remove("active");
        testimonialDots[currentTestimonial].classList.remove("active");

        currentTestimonial =
            (index + testimonials.length) % testimonials.length;

        testimonials[currentTestimonial].classList.add("active");
        testimonialDots[currentTestimonial].classList.add("active");
    }

    previousTestimonialButton.addEventListener("click", () => {
        showTestimonial(currentTestimonial - 1);
    });

    nextTestimonialButton.addEventListener("click", () => {
        showTestimonial(currentTestimonial + 1);
    });

    testimonialDots[0].classList.add("active");

    setInterval(() => {
        showTestimonial(currentTestimonial + 1);
    }, 6000);
}
const cursor = document.querySelector(".custom-cursor");

if (cursor) {
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    document.addEventListener("mousemove", (event) => {
        mouseX = event.clientX;
        mouseY = event.clientY;
    });

    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.18;
        cursorY += (mouseY - cursorY) * 0.18;

        cursor.style.transform =
            `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`;

        requestAnimationFrame(animateCursor);
    }

    animateCursor();

    document
        .querySelectorAll("a, button, .gallery img")
        .forEach((element) => {
            element.addEventListener("mouseenter", () => {
                cursor.classList.add("hover");
            });

            element.addEventListener("mouseleave", () => {
                cursor.classList.remove("hover");
            });
        });
}
