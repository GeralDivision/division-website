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
const customCursor = document.querySelector(".custom-cursor");

if (customCursor) {
    document.addEventListener("mousemove", (event) => {
        customCursor.style.left = `${event.clientX}px`;
        customCursor.style.top = `${event.clientY}px`;
    });

    const interactiveElements = document.querySelectorAll(
        "a, button, .image, img"
    );

    interactiveElements.forEach((element) => {
        element.addEventListener("mouseenter", () => {
            customCursor.classList.add("hover");
        });

        element.addEventListener("mouseleave", () => {
            customCursor.classList.remove("hover");
        });
    });
}