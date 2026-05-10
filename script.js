// ============================================================
//  RISHAV JHA PORTFOLIO — script.js
// ============================================================

// ---- TYPING ANIMATION ------------------------------------
const phrases = [
  ".NET Full Stack Developer",
  "AI & ML Researcher",
  "Stand-up Comedian 🎤",
  "Angular Developer",
  "From Nepal 🇳🇵",
];
let pi = 0, ci = 0, del = false;
const typedEl = document.getElementById("typedText");

function type() {
  const current = phrases[pi];
  if (!del) {
    typedEl.textContent = current.substring(0, ci + 1);
    ci++;
    if (ci === current.length) {
      del = true;
      setTimeout(type, 1800);
      return;
    }
  } else {
    typedEl.textContent = current.substring(0, ci - 1);
    ci--;
    if (ci === 0) {
      del = false;
      pi = (pi + 1) % phrases.length;
    }
  }
  setTimeout(type, del ? 55 : 85);
}
setTimeout(type, 1200);

// ---- MOBILE MENU TOGGLE ----------------------------------
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    navToggle.textContent = navLinks.classList.contains("active") ? "✕" : "☰";
  });
  // Close menu when a link is clicked
  document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      navToggle.textContent = "☰";
    });
  });
}
const ropeGradientMap = [
  "linear-gradient(135deg, #2f5ad4, #5e90ff)",
  "linear-gradient(135deg, #b93147, #ec6a76)",
  "linear-gradient(135deg, #f3d579, #f6a552)",
  "linear-gradient(135deg, #2d7f4a, #67b67d)",
  "linear-gradient(135deg, #e3b64d, #ffd37f)"
];
const sideRopeFlags = document.querySelectorAll(".side-rope .rope-flag");
const sideRopes = document.querySelectorAll(".side-rope");

function updateSideRopes(scroll) {
  const colorOffset = Math.floor(scroll / 110);
  sideRopeFlags.forEach((flag, index) => {
    const colorIndex = (index + colorOffset) % ropeGradientMap.length;
    flag.style.background = ropeGradientMap[colorIndex];
  });

  sideRopes.forEach((rope, index) => {
    const ropeShift = scroll * 0.05;
    const rotate = index === 0 ? -0.8 : 0.8;
    rope.style.transform = `translateY(${ropeShift}px) rotate(${rotate}deg)`;
  });
}

window.addEventListener("scroll", () => {
  const scroll = window.scrollY;

  document.querySelectorAll(".mountain-layer").forEach((el) => {
    el.style.transform = `translateY(${scroll * 0.2}px)`;
  });

  document.querySelectorAll(".prayer-flags").forEach((el) => {
    el.style.transform = `translateY(${scroll * 0.4}px)`;
  });

  updateSideRopes(scroll);
});
const bird = document.querySelector(".bird-follow");

document.addEventListener("mousemove", (e) => {
  if (!bird) return;
  bird.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
});
// ---- SNOWFALL (hero canvas — hidden, global canvas does the work) ------
const canvas = document.getElementById("snowCanvas");
if (canvas) {
  canvas.width = 0; canvas.height = 0; // hero canvas is now unused
}

// ---- GLOBAL SNOWFALL (full page) ---------------------------------
const gCanvas = document.getElementById("globalSnowCanvas");
const gCtx = gCanvas ? gCanvas.getContext("2d") : null;
let flakes = [];

function resizeGlobalCanvas() {
  if (!gCanvas) return;
  gCanvas.width = window.innerWidth;
  gCanvas.height = window.innerHeight;
}
resizeGlobalCanvas();
window.addEventListener("resize", resizeGlobalCanvas);

const FLAKE_COUNT = 160;
for (let i = 0; i < FLAKE_COUNT; i++) {
  flakes.push({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    r: Math.random() * 1.6 + 0.3,
    speed: Math.random() * 0.35 + 0.08,
    drift: Math.random() * 0.2 - 0.1,
    opacity: Math.random() * 0.5 + 0.15,
    wobble: Math.random() * Math.PI * 2,
    wobbleSpeed: Math.random() * 0.008 + 0.003,
  });
}

function animateSnow() {
  if (!gCtx) return;
  gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
  flakes.forEach((f) => {
    f.wobble += f.wobbleSpeed;
    gCtx.beginPath();
    gCtx.arc(f.x + Math.sin(f.wobble) * 0.8, f.y, f.r, 0, Math.PI * 2);
    gCtx.fillStyle = `rgba(240,237,232,${f.opacity})`;
    gCtx.fill();
    f.y += f.speed;
    f.x += f.drift;
    if (f.y > gCanvas.height + 5) { f.y = -5; f.x = Math.random() * gCanvas.width; }
    if (f.x < -5) f.x = gCanvas.width + 5;
    if (f.x > gCanvas.width + 5) f.x = -5;
  });
  requestAnimationFrame(animateSnow);
}
animateSnow();

// ---- SCROLL REVEAL ----------------------------------------
const reveals = document.querySelectorAll(".reveal");
const ro = new IntersectionObserver((entries) => {
  entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); });
}, { threshold: 0.1 });
reveals.forEach((r) => ro.observe(r));

// ---- LANGUAGE BARS ----------------------------------------
const langObs = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      document.querySelectorAll(".lang-fill").forEach((bar) => {
        bar.style.width = bar.getAttribute("data-pct") + "%";
      });
    }
  });
}, { threshold: 0.5 });
const ghSection = document.getElementById("github");
if (ghSection) langObs.observe(ghSection);

// ---- CERTIFICATES -----------------------------------------
// Certificate photo grid filtering
document.addEventListener("DOMContentLoaded", () => {
  const certSection = document.getElementById("certificates");
  if (!certSection) return;
  
  const certFilterBtns = certSection.querySelectorAll(".cert-filters .filter-btn");
  const certCards = certSection.querySelectorAll(".cert-photo-card");
  
  certFilterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      // Update active button
      certFilterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      
      const filter = btn.getAttribute("data-filter");
      
      // Show/hide cards based on filter
      certCards.forEach(card => {
        const cardCategory = card.getAttribute("data-cat");
        
        if (filter === "all" || cardCategory === filter) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
});

// Certificate card click to show modal
document.addEventListener("DOMContentLoaded", () => {
  const certCards = document.querySelectorAll(".cert-photo-card");
  const certModal = document.getElementById("certModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalProvider = document.getElementById("modalProvider");
  const modalClose = document.getElementById("modalClose");
  
  if (!certModal) return;
  
  certCards.forEach(card => {
    card.addEventListener("click", () => {
      const title = card.querySelector(".cert-photo-title").textContent;
      const provider = card.querySelector(".cert-photo-provider").textContent;
      const img = card.querySelector(".cert-img");
      
      // Get the background image or img src for modal
      const certIcon = card.querySelector(".cert-photo-badge").textContent;
      
      modalTitle.textContent = title;
      modalProvider.textContent = provider;
      document.getElementById("modalIcon").textContent = "📜";
      
      certModal.classList.add("open");
    });
  });
  
  if (modalClose) {
    modalClose.addEventListener("click", () => {
      certModal.classList.remove("open");
    });
  }
  
  certModal.addEventListener("click", (e) => {
    if (e.target === certModal) {
      certModal.classList.remove("open");
    }
  });
});

// ---- CONTACT FORM -----------------------------------------
function handleContact(e) {
  e.preventDefault();
  const btn = e.target.querySelector("button[type=submit]");
  btn.textContent = "Sent! 🎉";
  btn.style.background = "var(--jade)";
  setTimeout(() => {
    btn.textContent = "Send Message 🚀";
    btn.style.background = "";
    e.target.reset();
  }, 3000);
}

// ---- EASTER EGG / TERMINAL --------------------------------
const codeHint = document.getElementById("codeHint");
const easterPanel = document.getElementById("easterPanel");
const easterClose = document.getElementById("easterClose");
const easterInput = document.getElementById("easterInput");
const easterBody = document.getElementById("easterBody");

codeHint.addEventListener("click", () => {
  easterPanel.classList.toggle("open");
  if (easterPanel.classList.contains("open")) easterInput.focus();
});
easterClose.addEventListener("click", () => easterPanel.classList.remove("open"));

const cmds = {
  help: () => [
    { c: "e-y", t: "Available commands:" },
    { c: "e-r", t: "whoami · joke · mountain · skills · hire · nepal · buddha" },
  ],
  whoami: () => [
    { c: "e-w", t: "Rishav Jha" },
    { c: "e-r", t: "→ .NET Full Stack Developer @ Wipro" },
    { c: "e-r", t: "→ AI Researcher (IEEE Published, 3 papers)" },
    { c: "e-r", t: "→ Stand-up Comedian (3+ years)" },
    { c: "e-r", t: "→ From Kathmandu 🇳🇵 → Bangalore 📍" },
  ],
  joke: () => [
    { c: "e-y", t: "Why do programmers prefer dark mode?" },
    { c: "e-w", t: "..." },
    { c: "e-g", t: "Because light attracts bugs! 🐛" },
    { c: "e-r", t: "(3 years on stage and this is what I have)" },
  ],
  mountain: () => [
    { c: "e-y", t: "       /\\" },
    { c: "e-y", t: "      /  \\  *** Mount Everest 8,848m ***" },
    { c: "e-y", t: "     / ** \\" },
    { c: "e-w", t: "    /      \\  नेपाल 🇳🇵" },
    { c: "e-w", t: "   /🏯  🌲  \\" },
    { c: "e-w", t: "  /___🐂____\\" },
    { c: "e-r", t: "Like code, the summit is earned not given." },
  ],
  skills: () => [
    { c: "e-y", t: "Top Skills:" },
    { c: "e-g", t: "[█████████░] .NET / C#   — 90%" },
    { c: "e-g", t: "[████████░░] Angular     — 85%" },
    { c: "e-g", t: "[████████░░] Python/ML   — 80%" },
    { c: "e-g", t: "[███████░░░] Research    — 75%" },
    { c: "e-g", t: "[██████████] Comedy      — 99%" },
  ],
  hire: () => [
    { c: "e-g", t: "✓ Initiating hire sequence..." },
    { c: "e-w", t: "→ Scrolling to contact section..." },
    { c: "e-r", t: "→ Please fill the form. I promise to reply!" },
    { c: "e-y", t: "→ rishavjha@gmail.com" },
  ],
  nepal: () => [
    { c: "e-y", t: "🇳🇵 Nepal — Land of the Himalayas" },
    { c: "e-w", t: "Capital: Kathmandu" },
    { c: "e-w", t: "Home of Everest (8848m) & Lumbini (Buddha's birthplace)" },
    { c: "e-r", t: "My home. My roots. My superpowers." },
  ],
  buddha: () => [
    { c: "e-y", t: "☸ The Dharma Wheel turns..." },
    { c: "e-w", t: "'Three things cannot be long hidden:" },
    { c: "e-w", t: "the sun, the moon, and the truth.'" },
    { c: "e-r", t: "— Gautam Buddha" },
    { c: "e-g", t: "ॐ मणि पद्मे हूँ" },
  ],
};

easterInput.addEventListener("keydown", (e) => {
  if (e.key !== "Enter") return;
  const cmd = easterInput.value.trim().toLowerCase();
  easterInput.value = "";
  const inLine = document.createElement("div");
  inLine.className = "e-out";
  inLine.innerHTML = `<span class="e-r">$ </span><span class="e-w">${cmd}</span>`;
  easterBody.appendChild(inLine);
  const fn = cmds[cmd];
  if (fn) {
    fn().forEach(({ c, t }) => {
      const out = document.createElement("div");
      out.className = "e-out";
      out.innerHTML = `<span class="${c}">${t}</span>`;
      easterBody.appendChild(out);
    });
    if (cmd === "hire")
      setTimeout(() => document.getElementById("contact").scrollIntoView({ behavior: "smooth" }), 1000);
  } else {
    const out = document.createElement("div");
    out.className = "e-out";
    out.innerHTML = `<span class="e-r">Command not found: ${cmd}. Try 'help'</span>`;
    easterBody.appendChild(out);
  }
  easterBody.scrollTop = easterBody.scrollHeight;
});

// ============================================================
// PROJECT FILTERING & SHOW MORE FUNCTIONALITY
// ============================================================

const projectsGrid = document.getElementById("projectsGrid");
const showMoreBtn = document.getElementById("showMoreBtn");
let isExpanded = false;

// Initialize: Add collapsed class to show only first 4 projects
if (projectsGrid) {
  projectsGrid.classList.add("collapsed");
}

// Show More button functionality
if (showMoreBtn) {
  showMoreBtn.addEventListener("click", () => {
    isExpanded = !isExpanded;
    
    if (isExpanded) {
      projectsGrid.classList.remove("collapsed");
      showMoreBtn.querySelector(".show-more-text").textContent = "Show Less Projects";
      showMoreBtn.querySelector(".show-more-icon").textContent = "↑";
    } else {
      projectsGrid.classList.add("collapsed");
      showMoreBtn.querySelector(".show-more-text").textContent = "Show More Projects";
      showMoreBtn.querySelector(".show-more-icon").textContent = "↓";
    }
  });
}

// Project filter functionality
document.addEventListener("DOMContentLoaded", () => {
  const projectSection = document.getElementById("projects");
  if (!projectSection) return;
  
  const projectFilterBtns = projectSection.querySelectorAll(".filter-btn");
  const projectCards = projectSection.querySelectorAll(".project-card");
  
  projectFilterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      // Remove active class from all buttons
      projectFilterBtns.forEach(b => b.classList.remove("active"));
      // Add active class to clicked button
      btn.classList.add("active");
      
      const filterValue = btn.getAttribute("data-filter");
      let visibleCount = 0;
      
      projectCards.forEach((card, index) => {
        const category = card.getAttribute("data-category");
        
        if (filterValue === "all" || category === filterValue) {
          card.style.display = "block";
          visibleCount++;
          // Reset to showing only first 4 when filtering
          if (!isExpanded && visibleCount > 4) {
            card.style.display = "none";
          }
        } else {
          card.style.display = "none";
        }
      });
      
      // Reset expand state when filtering
      isExpanded = false;
      projectsGrid.classList.add("collapsed");
      if (showMoreBtn) {
        showMoreBtn.querySelector(".show-more-text").textContent = "Show More Projects";
        showMoreBtn.querySelector(".show-more-icon").textContent = "↓";
      }
    });
  });

  const certsGrid = document.getElementById("certsGrid");
  const showMoreCertsBtn = document.getElementById("showMoreCertsBtn");
  let certsExpanded = false;
  let activeCertFilter = "all";

  const certSection = document.getElementById("certificates");
  const certFilterBtns = certSection
    ? certSection.querySelectorAll(".cert-filters .filter-btn")
    : [];
  const certCards = certSection
    ? Array.from(certSection.querySelectorAll(".cert-photo-card"))
    : [];

  const updateCertificateVisibility = () => {
    let visibleCount = 0;

    certCards.forEach((card) => {
      const cardCategory = card.getAttribute("data-cat");
      const matchesFilter = activeCertFilter === "all" || cardCategory === activeCertFilter;

      if (!matchesFilter) {
        card.classList.add("hidden");
      } else {
        visibleCount += 1;
        if (!certsExpanded && visibleCount > 4) {
          card.classList.add("hidden");
        } else {
          card.classList.remove("hidden");
        }
      }
    });

    if (showMoreCertsBtn) {
      if (visibleCount <= 4) {
        showMoreCertsBtn.classList.add("hidden");
      } else {
        showMoreCertsBtn.classList.remove("hidden");
      }
    }
  };

  if (certSection) {
    certFilterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        certFilterBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        activeCertFilter = btn.getAttribute("data-filter");
        certsExpanded = false;
        if (showMoreCertsBtn) {
          showMoreCertsBtn.querySelector(".show-more-text").textContent = "Show More Certificates";
          showMoreCertsBtn.querySelector(".show-more-icon").textContent = "↓";
        }
        updateCertificateVisibility();
      });
    });

    updateCertificateVisibility();
  }

  if (showMoreCertsBtn) {
    showMoreCertsBtn.addEventListener("click", () => {
      certsExpanded = !certsExpanded;
      if (certsExpanded) {
        showMoreCertsBtn.querySelector(".show-more-text").textContent = "Show Less Certificates";
        showMoreCertsBtn.querySelector(".show-more-icon").textContent = "↑";
      } else {
        showMoreCertsBtn.querySelector(".show-more-text").textContent = "Show More Certificates";
        showMoreCertsBtn.querySelector(".show-more-icon").textContent = "↓";
      }
      updateCertificateVisibility();
    });
  }
});