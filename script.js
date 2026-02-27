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
    const soundBtn = document.getElementById("soundBtn");
    let isMuted = false;

    // Sound Toggle
    soundBtn.addEventListener("click", () => {
        if (mantra.paused) {
            mantra.play().catch(e => console.log("Audio play failed", e));
            soundBtn.innerText = "🔊";
            isMuted = false;
        } else {
            if (isMuted) {
                mantra.muted = false;
                soundBtn.innerText = "🔊";
                isMuted = false;
            } else {
                mantra.muted = true;
                soundBtn.innerText = "🔇";
                isMuted = true;
            }
        }
    });

    enterBtn.addEventListener("click", () => {
        // Try to play audio on enter
        mantra.volume = 0.5;
        mantra.play().catch(err => {
            console.log("Audio blocked, waiting for user interaction on toggle:", err);
            soundBtn.innerText = "🔇"; // Indicate it's not playing/muted
        });

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

    for (let i = 0; i < 300; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 1.5,
            speed: Math.random() * 0.5 + 0.1,
            opacity: Math.random(),
            twinkleSpeed: Math.random() * 0.02 + 0.005
        });
    }

    function animateStars() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        stars.forEach(star => {
            // Twinkle effect
            star.opacity += star.twinkleSpeed;
            if (star.opacity > 1 || star.opacity < 0.2) {
                star.twinkleSpeed = -star.twinkleSpeed;
            }

            ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
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
        
        // Disable button briefly to prevent spam
        witnessBtn.disabled = true;
        setTimeout(() => witnessBtn.disabled = false, 2000);

        for (let i = 0; i < 40; i++) {
            const petal = document.createElement("span");
            
            // Random horizontal start position
            petal.style.left = Math.random() * 100 + "%";
            
            // Random fall duration
            const duration = 2 + Math.random() * 3;
            petal.style.animationDuration = `${duration}s`;
            
            // Random delay so they don't all fall at once
            petal.style.animationDelay = `${Math.random() * 2}s`;

            petalsContainer.appendChild(petal);
        }
    });

    /* ===============================
       BLESSING SYSTEM (Universal)
    =============================== */

    const blessingBtn = document.getElementById("blessingBtn");
    const blessingText = document.getElementById("blessingText");

    const blessings = [
        "May Lord Shiva grant you strength and fearless determination.",
        "May Goddess Parvati bless you with grace and inner strength.",
        "May your life shine with divine harmony and love.",
        "May you rise with discipline and conquer your challenges.",
        "May sacred energy empower your dreams and spirit.",
        "May divine blessings fill your heart with peace and confidence.",
        "May the light of consciousness guide your every step.",
        "May you find the eternal stillness within the chaos."
    ];

    blessingBtn.addEventListener("click", () => {

        const nameInput = document.getElementById("username");
        const name = nameInput.value.trim();

        if (!name) {
            blessingText.innerText = "Please enter your name to receive a blessing.";
            blessingText.style.color = "#ff6b6b"; // Light red for error
            return;
        }

        const randomBlessing = blessings[Math.floor(Math.random() * blessings.length)];

        blessingText.style.color = "gold";
        blessingText.innerText = `"${name}, ${randomBlessing}"`;

        // Optional: clear input
        nameInput.value = "";
    });

});
