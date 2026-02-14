document.addEventListener("DOMContentLoaded", () => {

    /* ===============================
       SCROLL REVEAL
    =============================== */

    const sections = document.querySelectorAll(".section");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateY(0)";
                }
            });
        },
        { threshold: 0.2 }
    );

    sections.forEach(section => {
        section.style.opacity = "0";
        section.style.transform = "translateY(40px)";
        section.style.transition = "all 0.8s ease";
        observer.observe(section);
    });

    /* ===============================
       HERO BUTTON + AUDIO
    =============================== */

    const enterBtn = document.getElementById("enterBtn");
    const mantra = document.getElementById("mantra");

    enterBtn.addEventListener("click", () => {

        // Play audio (required user interaction)
        mantra.play().catch(err => console.log("Audio blocked:", err));

        // Scroll to next section
        document.getElementById("tapasya").scrollIntoView({
            behavior: "smooth"
        });
    });

    /* ===============================
       GALAXY BACKGROUND
    =============================== */

    const canvas = document.getElementById("galaxy");
    const ctx = canvas.getContext("2d");

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const stars = [];

    for (let i = 0; i < 250; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 1.5,
            speed: Math.random() * 0.7
        });
    }

    function animateStars() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "white";

        stars.forEach(star => {
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fill();

            star.y += star.speed;
            if (star.y > canvas.height) {
                star.y = 0;
                star.x = Math.random() * canvas.width;
            }
        });

        requestAnimationFrame(animateStars);
    }

    animateStars();

    /* ===============================
       PETAL ANIMATION
    =============================== */

    const witnessBtn = document.getElementById("witnessBtn");
    const petalsContainer = document.getElementById("petals");

    witnessBtn.addEventListener("click", () => {

        petalsContainer.innerHTML = "";

        for (let i = 0; i < 50; i++) {
            const petal = document.createElement("span");

            petal.style.left = Math.random() * 100 + "%";
            petal.style.animationDuration = (3 + Math.random() * 3) + "s";
            petal.style.opacity = Math.random();

            petalsContainer.appendChild(petal);
        }
    });

    /* ===============================
       BLESSING SYSTEM (Gender Based)
    =============================== */

    const blessingBtn = document.getElementById("blessingBtn");
    const blessingText = document.getElementById("blessingText");

    const maleBlessings = [
        "May Lord Shiva grant you strength and fearless determination.",
        "May your path be guided by divine courage and wisdom.",
        "May you rise with discipline and conquer your challenges.",
        "May divine power protect and elevate your journey."
    ];

    const femaleBlessings = [
        "May Goddess Parvati bless you with grace and inner strength.",
        "May your life shine with divine harmony and love.",
        "May sacred energy empower your dreams and spirit.",
        "May divine blessings fill your heart with peace and confidence."
    ];

    blessingBtn.addEventListener("click", () => {

        const nameInput = document.getElementById("username");
        const name = nameInput.value.trim();

        if (!name) {
            blessingText.innerText = "Please enter your name.";
            return;
        }

        // Simple gender guess (basic heuristic)
        const lastChar = name.slice(-1).toLowerCase();

        let blessingArray;

        if (["a", "i"].includes(lastChar)) {
            blessingArray = femaleBlessings;
        } else {
            blessingArray = maleBlessings;
        }

        const randomBlessing =
            blessingArray[Math.floor(Math.random() * blessingArray.length)];

        blessingText.innerText = `${name}, ${randomBlessing}`;

        nameInput.value = "";
    });

});
