// ========== SMOOTH SCROLLING FOR ANCHOR LINKS ==========
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// ========== SCROLL REVEAL ANIMATION ==========
const revealElements = () => {
  const reveals = document.querySelectorAll(
    ".feature-card, .stat-card, .testimonial-card",
  );

  reveals.forEach((element) => {
    const windowHeight = window.innerHeight;
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;

    if (elementTop < windowHeight - elementVisible) {
      element.classList.add("active");
    }
  });
};

window.addEventListener("scroll", revealElements);

// Initial check on page load
document.addEventListener("DOMContentLoaded", revealElements);

// ========== NAVBAR ACTIVE LINK HIGHLIGHT ==========
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

const updateActiveLink = () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").slice(1) === current) {
      link.classList.add("active");
    }
  });
};

window.addEventListener("scroll", updateActiveLink);

// ========== STATISTICS COUNTER ANIMATION ==========
const animateCounters = () => {
  const statNumbers = document.querySelectorAll(".stat-number");
  const countersAnimated = new Set();

  const startCounter = (element) => {
    if (countersAnimated.has(element)) return;

    const target = element.textContent;
    const numericValue = parseInt(target) || 0;
    const suffix = target.replace(/[0-9]/g, "");
    let current = 0;
    const increment = numericValue / 50;

    const counter = setInterval(() => {
      current += increment;
      if (current >= numericValue) {
        element.textContent = numericValue + suffix;
        clearInterval(counter);
      } else {
        element.textContent = Math.floor(current) + suffix;
      }
    }, 30);

    countersAnimated.add(element);
  };

  const observerOptions = {
    threshold: 0.5,
    rootMargin: "0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        startCounter(entry.target);
      }
    });
  }, observerOptions);

  statNumbers.forEach((number) => observer.observe(number));
};

document.addEventListener("DOMContentLoaded", animateCounters);

// ========== BUTTON INTERACTIONS ==========
const buttons = document.querySelectorAll(".btn, .nav-button");

buttons.forEach((button) => {
  button.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-3px)";
  });

  button.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0)";
  });

  button.addEventListener("click", function (e) {
    const ripple = document.createElement("span");
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
            animation: ripple-animation 0.6s ease-out;
        `;

    this.style.position = "relative";
    this.style.overflow = "hidden";
    this.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
  });
});

// Add ripple animation keyframes
const style = document.createElement("style");
style.textContent = `
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ========== PARALLAX EFFECT ==========
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const floatingShape = document.querySelector(".floating-shape");
  const gradientCircle = document.querySelector(".gradient-circle");

  if (floatingShape) {
    floatingShape.style.transform = `translateY(${scrolled * 0.5}px)`;
  }

  if (gradientCircle) {
    gradientCircle.style.transform = `translate(-50%, -50%) translateY(${scrolled * 0.3}px)`;
  }
});

// ========== CARD FLIP EFFECT ON HOVER ==========
const cards = document.querySelectorAll(
  ".feature-card, .stat-card, .testimonial-card",
);

cards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "perspective(1000px) rotateX(0) rotateY(0)";
  });
});

// ========== TYPING ANIMATION ==========
const typeWriter = () => {
  const typingText = document.querySelector(".typing-text");
  if (!typingText) return;

  const text = "Build Something";
  let index = 0;
  typingText.textContent = "";

  const type = () => {
    if (index < text.length) {
      typingText.textContent += text.charAt(index);
      index++;
      setTimeout(type, 100);
    } else {
      setTimeout(() => {
        typingText.textContent = "";
        index = 0;
        setTimeout(type, 500);
      }, 2000);
    }
  };

  // Start typing after a short delay
  setTimeout(type, 500);
};

document.addEventListener("DOMContentLoaded", typeWriter);

// ========== MOBILE MENU TOGGLE ==========
const createMobileMenu = () => {
  const navContainer = document.querySelector(".nav-container");
  const navMenu = document.querySelector(".nav-menu");

  if (window.innerWidth <= 768 && !document.querySelector(".mobile-toggle")) {
    const toggleBtn = document.createElement("button");
    toggleBtn.className = "mobile-toggle";
    toggleBtn.innerHTML = "☰";
    toggleBtn.style.cssText = `
            display: none;
            background: none;
            border: none;
            color: var(--accent);
            font-size: 1.5rem;
            cursor: pointer;
            z-index: 101;
        `;

    navContainer.appendChild(toggleBtn);

    toggleBtn.addEventListener("click", () => {
      navMenu.style.display =
        navMenu.style.display === "none" ? "flex" : "none";
    });
  }
};

// ========== SCROLL TO TOP BUTTON ==========
const scrollToTopBtn = document.createElement("button");
scrollToTopBtn.innerHTML = "↑";
scrollToTopBtn.className = "scroll-to-top";
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #38BDF8, #0EA5E9);
    color: white;
    border: none;
    border-radius: 50%;
    font-size: 1.5rem;
    cursor: pointer;
    display: none;
    z-index: 99;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(56, 189, 248, 0.4);
`;

document.body.appendChild(scrollToTopBtn);

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    scrollToTopBtn.style.display = "block";
    scrollToTopBtn.style.opacity = "1";
  } else {
    scrollToTopBtn.style.display = "none";
    scrollToTopBtn.style.opacity = "0";
  }
});

scrollToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

scrollToTopBtn.addEventListener("mouseenter", () => {
  scrollToTopBtn.style.transform = "scale(1.1) translateY(-5px)";
});

scrollToTopBtn.addEventListener("mouseleave", () => {
  scrollToTopBtn.style.transform = "scale(1) translateY(0)";
});

// ========== PAGE LOAD ANIMATION ==========
window.addEventListener("load", () => {
  document.body.style.opacity = "1";
});

// ========== INTERSECTION OBSERVER FOR ANIMATIONS ==========
const observerConfig = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

const animationObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerConfig);

// ========== ADD ACTIVE STATE TO NAV LINKS ==========
const style2 = document.createElement("style");
style2.textContent = `
    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style2);

// ========== PREVENT SCROLLING ON BODY DURING ANIMATIONS ==========
document.addEventListener(
  "wheel",
  (e) => {
    // Smooth scroll is handled by CSS scroll-behavior
  },
  { passive: true },
);

// ========== RESPONSIVE CHECK AND ADJUST ==========
window.addEventListener("resize", () => {
  // Adjust layout if needed
  const feature = document.querySelector(".features");
  if (window.innerWidth <= 768) {
    feature?.style.padding = "var(--spacing-lg)";
  }
});

// ========== PERFORMANCE: LAZY LOAD IMAGES (IF ADDED) ==========
if ("IntersectionObserver" in window) {
  const images = document.querySelectorAll("img[data-src]");
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute("data-src");
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));
}

// ========== SMOOTH PAGE LOAD ANIMATION ==========
document.addEventListener("DOMContentLoaded", () => {
  document.body.style.opacity = "0";
  setTimeout(() => {
    document.body.style.transition = "opacity 0.6s ease";
    document.body.style.opacity = "1";
  }, 100);
});

console.log("🚀 Animated Landing Page Loaded Successfully!");
