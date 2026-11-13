/**
 * ============================================================================
 * SHIRSH & TANU ROYAL WEDDING INVITATION - JAVASCRIPT
 * Wedding Date: 07 December 2026, Monday
 * Venue: Rajan Inter College, Ballia, Uttar Pradesh, India
 * ============================================================================
 */
import { subscribeToWishes, submitWishToFirebase } from "./src/wishesFirebase.ts";

// ----------------------------------------------------------------------------
// CONFIGURATION VARIABLES (Customizable by User)
// ----------------------------------------------------------------------------
// You can replace this URL with the exact Google Maps link for your venue:
const GOOGLE_MAPS_VENUE_URL = "https://www.google.com/maps/search/?api=1&query=Rajan+Inter+College+Ballia+Uttar+Pradesh+India";

// Wedding Target Date: 7 December 2026 00:00:00 (Local Time)
const WEDDING_DATE = new Date("2026-12-07T00:00:00").getTime();

// Couple Names & Details
const GROOM_NAME = "Shirsh Kumar Srivastav (Mohit)";
const BRIDE_NAME = "Tanu Srivastav (Vaishali)";
const VENUE_NAME = "Rajan Inter College, Ballia, Uttar Pradesh, India";

// Full Photo Gallery Items (All 16 photos with rich metadata & categories)
const GALLERY_ITEMS = [
  {
    id: 0,
    src: "./assets/couple-hero.png",
    alt: "Shirsh and Tanu - The Royal Mandap Portrait",
    title: "The Royal Mandap Portrait",
    subtitle: "A digital celebration under the golden lights of togetherness",
    category: "portraits"
  },
  {
    id: 1,
    src: "./assets/couple-illustration.png",
    alt: "Shirsh and Tanu - Elegance & Tradition",
    title: "Elegance & Tradition",
    subtitle: "Regal peacock lehenga and embroidered ivory sherwani",
    category: "portraits"
  },
  {
    id: 2,
    src: "./assets/gallery/moment-mandap.jpeg",
    alt: "Shirsh & Tanu in Front of the Wedding Stage",
    title: "Shubh Vivah Stage",
    subtitle: "Grace and poise before the golden floral arch",
    category: "portraits"
  },
  {
    id: 3,
    src: "./assets/gallery/moment-gaze.jpeg",
    alt: "A Candid Look of Adoration",
    title: "A Gaze of Forever",
    subtitle: "A silent promise of eternal love and companionship",
    category: "portraits"
  },
  {
    id: 4,
    src: "./assets/gallery/namaste-welcome.jpeg",
    alt: "Shirsh & Tanu Greeting with Pranaam",
    title: "Pranaam & Warm Greetings",
    subtitle: "Welcoming all cherished guests with folded hands and respect",
    category: "rituals"
  },
  {
    id: 5,
    src: "./assets/gallery/groom-tilak.jpeg",
    alt: "Shirsh During the Auspicious Tilak Ceremony",
    title: "Shubh Tilak Ceremony",
    subtitle: "Sacred vermilion mark, marigold garland, and Vedic blessings",
    category: "rituals"
  },
  {
    id: 6,
    src: "./assets/gallery/sacred-hands.jpeg",
    alt: "Hathleva - Sacred Holding of Hands with Henna and Bangles",
    title: "Hathleva & Sacred Union",
    subtitle: "Intricate bridal mehndi and glittering bangles joined in destiny",
    category: "rituals"
  },
  {
    id: 7,
    src: "./assets/gallery/walk-together.jpeg",
    alt: "Couple Walking Together Hand in Hand",
    title: "Stepping Towards Eternity",
    subtitle: "Walking down the petal-strewn aisle toward a joyous new dawn",
    category: "rituals"
  },
  {
    id: 8,
    src: "./assets/gallery/bride-royal.jpeg",
    alt: "Tanu in Full Royal Bridal Attire",
    title: "The Royal Bride",
    subtitle: "Radiating timeless beauty in her handcrafted lehenga",
    category: "elegance"
  },
  {
    id: 9,
    src: "./assets/gallery/bride-smile.jpeg",
    alt: "Tanu Smiling Gracefully",
    title: "Bridal Grace & Radiance",
    subtitle: "A tender smile that illuminates every corner of our hearts",
    category: "elegance"
  },
  {
    id: 10,
    src: "./assets/gallery/moment-close.jpeg",
    alt: "Shirsh and Tanu Smiling Together",
    title: "Heart to Heart",
    subtitle: "Cherishing every laughter-filled second of our festivities",
    category: "portraits"
  },
  {
    id: 11,
    src: "./assets/gallery/moment-joy.jpeg",
    alt: "Joyful Celebrations",
    title: "Joy & High Spirits",
    subtitle: "Smiling bright as family and friends gather to celebrate",
    category: "portraits"
  },
  {
    id: 12,
    src: "./assets/gallery/holding-hands.jpeg",
    alt: "Shirsh and Tanu Holding Hands Softly",
    title: "Bound by Devotion",
    subtitle: "United by destiny and blessed by the divine elders",
    category: "rituals"
  },
  {
    id: 13,
    src: "./assets/gallery/couple-grace.jpeg",
    alt: "Poise and Harmony",
    title: "Harmony & Grace",
    subtitle: "Standing together in quiet elegance and deep understanding",
    category: "elegance"
  },
  {
    id: 14,
    src: "./assets/couple-photo-1.png",
    alt: "Together Forever Portrait",
    title: "Together Forever",
    subtitle: "A lifetime of boundless love, companionship, and peace",
    category: "portraits"
  },
  {
    id: 15,
    src: "./assets/couple-photo-2.png",
    alt: "Pure Joy & Laughter",
    title: "Pure Joy & Laughter",
    subtitle: "Every joyful smile holds a chapter of our eternal romance",
    category: "portraits"
  }
];

// Pre-populated Heartfelt Family & Friends Wishes
const DEFAULT_WISHES = [
  {
    name: "Srivastav Family Elders",
    relation: "Grandparents & Family Elders",
    text: "May Lord Ganesha and Maa Lakshmi shower their divine blessings upon Shirsh and Tanu. Wishing you both a lifetime of happiness, peace, and eternal harmony!",
    time: "Blessings from Elders",
    avatar: "ॐ"
  },
  {
    name: "Abhishek & Priya Srivastav",
    relation: "Cousins",
    text: "Congratulations Mohit bhaiya and Vaishali bhabhi! We cannot wait to dance our hearts out at the Barat and Haldi. Wishing you endless laughter and adventures together!",
    time: "Celebration Wishes",
    avatar: "A"
  },
  {
    name: "Rajesh & Sunita Srivastav",
    relation: "Mamu & Mami",
    text: "May your sacred union be as radiant as the morning sun and as tranquil as the starlit sky. Lots of love, blessings, and warm hugs to our dearest couple!",
    time: "Family Love",
    avatar: "R"
  },
  {
    name: "Rohan & College Friends",
    relation: "Friends & Batchmates",
    text: "To the most wonderful couple! You two are truly made for each other. Here is to a beautiful journey full of spontaneous road trips, love, and sweet memories!",
    time: "Warm Wishes",
    avatar: "F"
  }
];

// ----------------------------------------------------------------------------
// 1. PRELOADER & AUTOMATIC ROMANTIC MUSIC ON USER INTERACTION
// ----------------------------------------------------------------------------
let userHasInteracted = false;

function handleUserInteractionAndPlay() {
  if (!userHasInteracted) {
    userHasInteracted = true;
    if (typeof window.startWeddingAudio === "function") {
      window.startWeddingAudio();
    }
  }
}

window.addEventListener("DOMContentLoaded", () => {
  const preloader = document.getElementById("preloader");
  const enterBtn = document.getElementById("preloader-enter-btn");

  function dismissPreloader(e) {
    if (e) e.stopPropagation();
    handleUserInteractionAndPlay();

    if (preloader && !preloader.classList.contains("fade-out")) {
      preloader.classList.add("fade-out");
      setTimeout(() => {
        preloader.remove();
      }, 800);
    }
  }

  if (enterBtn) {
    enterBtn.addEventListener("click", dismissPreloader);
    enterBtn.addEventListener("touchend", dismissPreloader);
  }

  if (preloader) {
    preloader.addEventListener("click", dismissPreloader);
    preloader.addEventListener("touchend", dismissPreloader);
  }

  // Global listener: first click, touch, or key anywhere immediately starts audio
  ["click", "touchstart", "keydown"].forEach((evt) => {
    document.addEventListener(evt, handleUserInteractionAndPlay, { once: true, passive: true });
  });
});

// ----------------------------------------------------------------------------
// 2. LIVE COUNTDOWN TIMER
// ----------------------------------------------------------------------------
function initCountdown() {
  const daysEl = document.getElementById("countdown-days");
  const hoursEl = document.getElementById("countdown-hours");
  const minutesEl = document.getElementById("countdown-minutes");
  const secondsEl = document.getElementById("countdown-seconds");
  const gridEl = document.getElementById("countdown-grid");
  const passedMsgEl = document.getElementById("countdown-passed-msg");

  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

  function updateTimer() {
    const now = new Date().getTime();
    const distance = WEDDING_DATE - now;

    if (distance <= 0) {
      if (gridEl) gridEl.style.display = "none";
      if (passedMsgEl) passedMsgEl.style.display = "block";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.textContent = String(days).padStart(2, "0");
    hoursEl.textContent = String(hours).padStart(2, "0");
    minutesEl.textContent = String(minutes).padStart(2, "0");
    secondsEl.textContent = String(seconds).padStart(2, "0");
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

// ----------------------------------------------------------------------------
// 3. FLOATING FLOWER PETALS (CANVAS ANIMATION WITH CELEBRATION BURST)
// ----------------------------------------------------------------------------
let triggerCelebrationBurst = null;

function initPetalsCanvas() {
  const canvas = document.getElementById("petals-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const petalsCount = window.innerWidth < 768 ? 16 : 28;
  const petals = [];

  const petalColors = [
    "rgba(233, 160, 168, 0.75)",  // Soft blush pink rose
    "rgba(201, 162, 77, 0.7)",    // Gold foil shimmer
    "rgba(255, 183, 77, 0.65)",   // Marigold yellow
    "rgba(107, 24, 48, 0.55)"     // Royal Maroon petal
  ];

  for (let i = 0; i < petalsCount; i++) {
    petals.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 8 + 7,
      speedY: Math.random() * 1.2 + 0.6,
      speedX: Math.random() * 0.8 - 0.4,
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 2,
      color: petalColors[Math.floor(Math.random() * petalColors.length)],
      sway: Math.random() * 2,
      swaySpeed: Math.random() * 0.02 + 0.01
    });
  }

  // Celebration burst when user submits a wish!
  triggerCelebrationBurst = function () {
    for (let i = 0; i < 40; i++) {
      petals.push({
        x: width / 2 + (Math.random() - 0.5) * 200,
        y: height / 2 + (Math.random() - 0.5) * 100,
        size: Math.random() * 10 + 8,
        speedY: (Math.random() - 0.7) * 4,
        speedX: (Math.random() - 0.5) * 6,
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 6,
        color: petalColors[Math.floor(Math.random() * petalColors.length)],
        sway: Math.random() * 3,
        swaySpeed: 0.03
      });
    }
    // Trim extra after burst settles
    setTimeout(() => {
      if (petals.length > petalsCount) {
        petals.splice(petalsCount, petals.length - petalsCount);
      }
    }, 4500);
  };

  let isCanvasActive = true;

  document.addEventListener("visibilitychange", () => {
    isCanvasActive = !document.hidden;
    if (isCanvasActive) renderPetals();
  });

  function renderPetals() {
    if (!isCanvasActive) return;

    ctx.clearRect(0, 0, width, height);

    for (let p of petals) {
      p.y += p.speedY;
      p.x += Math.sin(p.y * p.swaySpeed) * p.sway + p.speedX;
      p.rotation += p.rotSpeed;

      if (p.y > height + 20) {
        p.y = -20;
        p.x = Math.random() * width;
      }
      if (p.x > width + 20) p.x = -20;
      if (p.x < -20) p.x = width + 20;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);

      // Draw elegant petal shape
      ctx.beginPath();
      ctx.moveTo(0, -p.size);
      ctx.bezierCurveTo(p.size * 0.7, -p.size * 0.6, p.size * 0.9, p.size * 0.5, 0, p.size);
      ctx.bezierCurveTo(-p.size * 0.9, p.size * 0.5, -p.size * 0.7, -p.size * 0.6, 0, -p.size);
      ctx.fillStyle = p.color;
      ctx.fill();

      // Subtle center vein
      ctx.beginPath();
      ctx.moveTo(0, -p.size * 0.7);
      ctx.lineTo(0, p.size * 0.7);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
      ctx.lineWidth = 0.8;
      ctx.stroke();

      ctx.restore();
    }

    requestAnimationFrame(renderPetals);
  }

  renderPetals();
}

// ----------------------------------------------------------------------------
// 4. SCROLL REVEAL (INTERSECTION OBSERVER)
// ----------------------------------------------------------------------------
function initScrollReveal() {
  const reveals = document.querySelectorAll(".reveal");
  if (!reveals.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  reveals.forEach((el) => observer.observe(el));
}

// ----------------------------------------------------------------------------
// 5. GALLERY FILTER TABS
// ----------------------------------------------------------------------------
function initGalleryFilters() {
  const filterBtns = document.querySelectorAll(".gallery-filter-btn");
  const galleryItems = document.querySelectorAll(".gallery-item");

  if (!filterBtns.length) return;

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter") || "all";

      galleryItems.forEach((item) => {
        const cat = item.getAttribute("data-category") || "";
        if (filter === "all" || cat === filter) {
          item.removeAttribute("data-hidden");
          item.style.opacity = "0";
          item.style.transform = "scale(0.96)";
          setTimeout(() => {
            item.style.opacity = "1";
            item.style.transform = "scale(1)";
          }, 50);
        } else {
          item.setAttribute("data-hidden", "true");
        }
      });
    });
  });
}

// ----------------------------------------------------------------------------
// 6. RESPONSIVE FULL-SCREEN LIGHTBOX MODAL
// ----------------------------------------------------------------------------
let currentLightboxIndex = 0;
let activeLightboxItems = [...GALLERY_ITEMS];

function initLightbox() {
  const modal = document.getElementById("lightbox-modal");
  const lightboxImg = document.getElementById("lightbox-img");
  const captionEl = document.getElementById("lightbox-caption");
  const counterEl = document.getElementById("lightbox-counter");
  const closeBtn = document.getElementById("lightbox-close");
  const prevBtn = document.getElementById("lightbox-prev");
  const nextBtn = document.getElementById("lightbox-next");

  if (!modal || !lightboxImg) return;

  // Open Lightbox
  window.openLightbox = function (index) {
    currentLightboxIndex = index;
    updateLightboxContent();
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  };

  function updateLightboxContent() {
    const item = GALLERY_ITEMS[currentLightboxIndex];
    if (!item) return;

    lightboxImg.src = item.src;
    lightboxImg.alt = item.alt;
    if (captionEl) captionEl.textContent = item.title;
    if (counterEl) {
      counterEl.textContent = `${currentLightboxIndex + 1} of ${GALLERY_ITEMS.length}`;
    }
  }

  function closeLightbox() {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }

  function showPrev() {
    currentLightboxIndex = (currentLightboxIndex - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length;
    updateLightboxContent();
  }

  function showNext() {
    currentLightboxIndex = (currentLightboxIndex + 1) % GALLERY_ITEMS.length;
    updateLightboxContent();
  }

  if (closeBtn) closeBtn.addEventListener("click", closeLightbox);
  if (prevBtn) prevBtn.addEventListener("click", showPrev);
  if (nextBtn) nextBtn.addEventListener("click", showNext);

  // Close on backdrop click
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeLightbox();
  });

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (!modal.classList.contains("active")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") showPrev();
    if (e.key === "ArrowRight") showNext();
  });

  // Touch Swipe for Mobile
  let touchStartX = 0;
  let touchEndX = 0;
  modal.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  modal.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    if (touchStartX - touchEndX > 50) {
      showNext();
    } else if (touchEndX - touchStartX > 50) {
      showPrev();
    }
  }, { passive: true });

  // Attach click to gallery items
  const galleryCards = document.querySelectorAll(".gallery-card");
  galleryCards.forEach((card) => {
    card.addEventListener("click", () => {
      const idx = parseInt(card.getAttribute("data-gallery-index") || "0", 10);
      window.openLightbox(idx);
    });
  });
}

// ----------------------------------------------------------------------------
// 7. BLESSINGS & HEARTFELT WISHES (SHARED REAL-TIME FIRESTORE WISH WALL)
// ----------------------------------------------------------------------------
function initWishesWall() {
  const wallEl = document.getElementById("wishes-wall-container");
  const form = document.getElementById("wish-submit-form");
  const submitBtn = document.getElementById("wish-submit-btn");
  const toast = document.getElementById("wish-success-toast");
  const errorToast = document.getElementById("wish-error-toast");

  if (!wallEl || !form) return;

  let liveWishes = [];

  function escapeHtml(str) {
    if (!str) return "";
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function renderWishes() {
    const combinedList = [...liveWishes, ...DEFAULT_WISHES];
    wallEl.innerHTML = "";

    combinedList.forEach((w) => {
      const card = document.createElement("article");
      card.className = "wish-card";

      const initial = w.avatar || (w.name ? w.name.trim().charAt(0).toUpperCase() : "❤️");

      card.innerHTML = `
        <div class="wish-card-header">
          <div class="wish-sender-info">
            <div class="wish-avatar">${escapeHtml(initial)}</div>
            <div>
              <h4 class="wish-author-name">${escapeHtml(w.name)}</h4>
              <span class="wish-relation-tag">${escapeHtml(w.relation || "Well-wisher")}</span>
            </div>
          </div>
          <span class="wish-quote-symbol" aria-hidden="true">&ldquo;</span>
        </div>
        <p class="wish-body-text">${escapeHtml(w.text)}</p>
        <span class="wish-time">${escapeHtml(w.time || "Blessed with love")}</span>
      `;

      wallEl.appendChild(card);
    });
  }

  // Initial render while connecting to Firestore
  renderWishes();

  // Subscribe to real-time Firestore wishes so everyone sees all sent wishes
  try {
    subscribeToWishes(
      (wishes) => {
        liveWishes = wishes;
        renderWishes();
      },
      (err) => {
        console.warn("Unable to sync wishes live:", err);
      }
    );
  } catch (err) {
    console.warn("Firestore subscription error:", err);
  }

  // Handle new wish submission to shared Firestore database
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nameInput = document.getElementById("wish-name");
    const relationInput = document.getElementById("wish-relation");
    const textInput = document.getElementById("wish-text");

    const name = nameInput.value.trim();
    const relation = relationInput.value.trim() || "Well-wisher";
    const text = textInput.value.trim();

    if (!name || !text) return;

    if (errorToast) errorToast.style.display = "none";
    if (toast) toast.style.display = "none";

    const originalBtnHtml = submitBtn ? submitBtn.innerHTML : "";
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = "<span>&#10047;</span> Posting Blessing...";
    }

    try {
      await submitWishToFirebase({ name, relation, text });

      // Trigger celebration burst of petals
      if (triggerCelebrationBurst) {
        triggerCelebrationBurst();
      }

      if (toast) {
        toast.style.display = "block";
        setTimeout(() => {
          toast.style.display = "none";
        }, 4500);
      }

      form.reset();
    } catch (err) {
      console.error("Failed to submit wish:", err);
      if (errorToast) {
        errorToast.style.display = "block";
        setTimeout(() => {
          errorToast.style.display = "none";
        }, 5000);
      }
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHtml;
      }
    }
  });
}

// ----------------------------------------------------------------------------
// 8. BACKGROUND MUSIC PLAYER (YOUTUBE IFRAME API & AUTOMATIC ROMANTIC MUSIC)
// ----------------------------------------------------------------------------
let ytPlayer = null;
let isYtReady = false;
let shouldPlayWhenReady = false;
// Default: Aaj Sajeya (x9l2VRJ5-3k) starting at 27s
let currentYtVideoId = "x9l2VRJ5-3k";
let currentYtStartSeconds = 27;

// Master Function to Start Wedding Music on User Interaction
window.startWeddingAudio = function () {
  shouldPlayWhenReady = true;
  const musicBtn = document.getElementById("music-toggle-btn");
  const musicAudio = document.getElementById("wedding-audio");

  // 1. If YouTube Player is already initialized & ready, play immediately
  if (ytPlayer && isYtReady && typeof ytPlayer.playVideo === "function") {
    try {
      if (currentYtStartSeconds > 0) {
        ytPlayer.seekTo(currentYtStartSeconds, true);
      }
      ytPlayer.playVideo();
      if (musicBtn) {
        musicBtn.classList.add("playing");
        musicBtn.setAttribute("title", "Pause Wedding Music");
      }
      return;
    } catch (err) {
      console.warn("YouTube play attempt", err);
    }
  }

  // 2. Simultaneously unlock & play local audio / fallback in synchronous user gesture context
  if (musicAudio) {
    musicAudio.play().then(() => {
      if (musicBtn) {
        musicBtn.classList.add("playing");
        musicBtn.setAttribute("title", "Pause Wedding Music");
      }
    }).catch(() => {
      // Procedural synthesizer fallback
      if (typeof window.startAmbientSynthFallback === "function") {
        window.startAmbientSynthFallback();
        if (musicBtn) {
          musicBtn.classList.add("playing");
          musicBtn.setAttribute("title", "Pause Wedding Music");
        }
      }
    });
  }
};

// Helper to extract YouTube Video ID and start time from any URL or raw ID
function extractYouTubeDetails(urlOrId) {
  if (!urlOrId) return { videoId: null, startSeconds: 0 };
  urlOrId = urlOrId.trim();

  let startSeconds = 0;
  const tMatch = urlOrId.match(/[?&#](?:t|start)=(\d+)/);
  if (tMatch) {
    startSeconds = parseInt(tMatch[1], 10) || 0;
  }

  if (/^[a-zA-Z0-9_-]{11}$/.test(urlOrId)) {
    return { videoId: urlOrId, startSeconds };
  }

  const match = urlOrId.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
  return {
    videoId: match ? match[1] : null,
    startSeconds
  };
}

function extractYouTubeId(urlOrId) {
  return extractYouTubeDetails(urlOrId).videoId;
}

// Load YouTube IFrame Player API
(function loadYouTubeApi() {
  if (window.YT && window.YT.Player) {
    onYouTubeIframeAPIReady();
    return;
  }
  const tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";
  const firstScriptTag = document.getElementsByTagName("script")[0];
  if (firstScriptTag && firstScriptTag.parentNode) {
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  } else {
    document.head.appendChild(tag);
  }
})();

window.onYouTubeIframeAPIReady = function () {
  const container = document.getElementById("youtube-audio-player");
  if (!container || !window.YT) return;

  try {
    ytPlayer = new window.YT.Player("youtube-audio-player", {
      height: "200",
      width: "200",
      videoId: currentYtVideoId,
      playerVars: {
        autoplay: 1,
        controls: 0,
        disablekb: 1,
        fs: 0,
        loop: 1,
        start: currentYtStartSeconds,
        playlist: currentYtVideoId,
        modestbranding: 1,
        rel: 0
      },
      events: {
        onReady: () => {
          isYtReady = true;
          const statusMsg = document.getElementById("yt-status-msg");
          if (statusMsg) statusMsg.textContent = "Romantic Wedding Music Active 🎶 (Aaj Sajeya - Wedding Anthem)";

          // If the user has already tapped or clicked to dismiss preloader, start YouTube immediately
          if (shouldPlayWhenReady) {
            try {
              const musicAudio = document.getElementById("wedding-audio");
              if (musicAudio) musicAudio.pause();
              if (typeof window.stopAmbientSynthFallback === "function") {
                window.stopAmbientSynthFallback();
              }
              if (currentYtStartSeconds > 0) {
                ytPlayer.seekTo(currentYtStartSeconds, true);
              }
              ytPlayer.playVideo();
              const musicBtn = document.getElementById("music-toggle-btn");
              if (musicBtn) {
                musicBtn.classList.add("playing");
                musicBtn.setAttribute("title", "Pause Wedding Music");
              }
            } catch (e) {
              console.warn("Error playing YouTube upon onReady", e);
            }
          }
        },
        onStateChange: (event) => {
          const musicBtn = document.getElementById("music-toggle-btn");
          if (!musicBtn) return;
          // 1 = PLAYING, 2 = PAUSED, 0 = ENDED
          if (event.data === window.YT.PlayerState.PLAYING) {
            musicBtn.classList.add("playing");
            musicBtn.setAttribute("title", "Pause Wedding Music");
          } else if (event.data === window.YT.PlayerState.PAUSED || event.data === window.YT.PlayerState.ENDED) {
            musicBtn.classList.remove("playing");
            musicBtn.setAttribute("title", "Play Wedding Music");
          }
        },
        onError: () => {
          console.warn("YouTube player encountered an issue, fallback active.");
        }
      }
    });
  } catch (err) {
    console.warn("YouTube initialization error", err);
  }
};

function initMusicPlayer() {
  const musicBtn = document.getElementById("music-toggle-btn");
  const musicSettingsBtn = document.getElementById("music-settings-btn");
  const musicModal = document.getElementById("music-modal");
  const musicModalClose = document.getElementById("music-modal-close");
  const customYtInput = document.getElementById("custom-yt-input");
  const customYtBtn = document.getElementById("custom-yt-btn");
  const ytStatusMsg = document.getElementById("yt-status-msg");
  const presetItems = document.querySelectorAll(".music-preset-item");
  const musicAudio = document.getElementById("wedding-audio");

  if (!musicBtn) return;

  let isPlayingLocal = false;
  let audioCtx = null;
  let synthInterval = null;

  // Authentic procedural Indian Raag / Shehnai acoustic synthesizer fallback
  function startIndianAmbientSynth() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!audioCtx) audioCtx = new AudioContext();
      if (audioCtx.state === "suspended") audioCtx.resume();

      const masterGain = audioCtx.createGain();
      masterGain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      masterGain.connect(audioCtx.destination);

      const droneFreqs = [138.59, 207.65, 277.18];
      droneFreqs.forEach((freq) => {
        const osc = audioCtx.createOscillator();
        const droneGain = audioCtx.createGain();
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

        const filter = audioCtx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(450, audioCtx.currentTime);

        droneGain.gain.setValueAtTime(0.02, audioCtx.currentTime);
        osc.connect(filter);
        filter.connect(droneGain);
        droneGain.connect(masterGain);
        osc.start();
      });

      const ragaNotes = [277.18, 311.13, 349.23, 369.99, 415.3, 466.16, 523.25, 554.37];
      synthInterval = setInterval(() => {
        if (!isPlayingLocal || !audioCtx) return;
        const note = ragaNotes[Math.floor(Math.random() * ragaNotes.length)];
        const osc = audioCtx.createOscillator();
        const noteGain = audioCtx.createGain();
        const filter = audioCtx.createBiquadFilter();

        osc.type = "sine";
        osc.frequency.setValueAtTime(note, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(note * 1.01, audioCtx.currentTime + 0.4);

        filter.type = "bandpass";
        filter.frequency.setValueAtTime(note * 1.5, audioCtx.currentTime);
        filter.Q.setValueAtTime(3, audioCtx.currentTime);

        const now = audioCtx.currentTime;
        noteGain.gain.setValueAtTime(0.001, now);
        noteGain.gain.linearRampToValueAtTime(0.05, now + 0.2);
        noteGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.6);

        osc.connect(filter);
        filter.connect(noteGain);
        noteGain.connect(masterGain);

        osc.start(now);
        osc.stop(now + 1.8);
      }, 950);
    } catch (e) {
      console.warn("Synth unavailable", e);
    }
  }

  function stopIndianAmbientSynth() {
    if (synthInterval) {
      clearInterval(synthInterval);
      synthInterval = null;
    }
    if (audioCtx) {
      audioCtx.close().catch(() => {});
      audioCtx = null;
    }
  }

  window.startAmbientSynthFallback = startIndianAmbientSynth;
  window.stopAmbientSynthFallback = stopIndianAmbientSynth;

  // Toggle Play / Pause function
  async function togglePlay() {
    if (ytPlayer && isYtReady && typeof ytPlayer.getPlayerState === "function") {
      const state = ytPlayer.getPlayerState();
      if (state === window.YT.PlayerState.PLAYING) {
        ytPlayer.pauseVideo();
        musicBtn.classList.remove("playing");
        musicBtn.setAttribute("title", "Play Wedding Music");
      } else {
        ytPlayer.playVideo();
        musicBtn.classList.add("playing");
        musicBtn.setAttribute("title", "Pause Wedding Music");
      }
      return;
    }

    // Fallback: MP3 or Procedural Web Audio Synth
    if (!isPlayingLocal) {
      isPlayingLocal = true;
      musicBtn.classList.add("playing");
      musicBtn.setAttribute("title", "Pause Wedding Music");

      if (musicAudio && musicAudio.src) {
        try {
          await musicAudio.play();
        } catch (err) {
          startIndianAmbientSynth();
        }
      } else {
        startIndianAmbientSynth();
      }
    } else {
      isPlayingLocal = false;
      musicBtn.classList.remove("playing");
      musicBtn.setAttribute("title", "Play Wedding Music");

      if (musicAudio) {
        musicAudio.pause();
      }
      stopIndianAmbientSynth();
    }
  }

  musicBtn.addEventListener("click", togglePlay);

  // Music Settings Modal Handlers
  if (musicSettingsBtn && musicModal) {
    musicSettingsBtn.addEventListener("click", () => {
      musicModal.classList.add("active");
    });

    if (musicModalClose) {
      musicModalClose.addEventListener("click", () => {
        musicModal.classList.remove("active");
      });
    }

    musicModal.addEventListener("click", (e) => {
      if (e.target === musicModal) {
        musicModal.classList.remove("active");
      }
    });

    // Preset Selection
    presetItems.forEach((item) => {
      item.addEventListener("click", () => {
        const videoId = item.getAttribute("data-yt-id");
        const start = parseInt(item.getAttribute("data-start") || "0", 10);
        const title = item.getAttribute("data-title") || "Wedding Track";

        presetItems.forEach((p) => p.classList.remove("active"));
        item.classList.add("active");

        if (videoId && ytPlayer && typeof ytPlayer.loadVideoById === "function") {
          currentYtVideoId = videoId;
          currentYtStartSeconds = start;
          ytPlayer.loadVideoById({
            videoId: videoId,
            startSeconds: start
          });
          ytPlayer.playVideo();
          musicBtn.classList.add("playing");

          if (ytStatusMsg) {
            ytStatusMsg.textContent = `Now Playing: ${title} 🎶`;
          }
        }
      });
    });

    // Custom YouTube Link Submission
    if (customYtBtn && customYtInput) {
      customYtBtn.addEventListener("click", () => {
        const raw = customYtInput.value.trim();
        const { videoId: extractedId, startSeconds } = extractYouTubeDetails(raw);

        if (!extractedId) {
          if (ytStatusMsg) {
            ytStatusMsg.textContent = "Please enter a valid YouTube link or video ID.";
            ytStatusMsg.style.color = "#C62828";
          }
          return;
        }

        if (ytPlayer && typeof ytPlayer.loadVideoById === "function") {
          currentYtVideoId = extractedId;
          currentYtStartSeconds = startSeconds;
          ytPlayer.loadVideoById({
            videoId: extractedId,
            startSeconds: startSeconds
          });
          ytPlayer.playVideo();
          musicBtn.classList.add("playing");

          presetItems.forEach((p) => p.classList.remove("active"));

          if (ytStatusMsg) {
            ytStatusMsg.textContent = `Custom YouTube track loaded & playing! 🎶 (ID: ${extractedId}${startSeconds ? `, start: ${startSeconds}s` : ""})`;
            ytStatusMsg.style.color = "#2E7D32";
          }
        } else {
          if (ytStatusMsg) {
            ytStatusMsg.textContent = "YouTube player is loading, please try in a moment.";
          }
        }
      });
    }
  }
}

// ----------------------------------------------------------------------------
// 9. VENUE GOOGLE MAPS DIRECTION
// ----------------------------------------------------------------------------
function initVenueDirections() {
  const directionsBtn = document.getElementById("venue-directions-btn");
  if (directionsBtn) {
    directionsBtn.addEventListener("click", (e) => {
      e.preventDefault();
      window.open(GOOGLE_MAPS_VENUE_URL, "_blank", "noopener,noreferrer");
    });
  }
}

// ----------------------------------------------------------------------------
// 10. ADD TO CALENDAR (GOOGLE CALENDAR & ICAL / ICS)
// ----------------------------------------------------------------------------
function initCalendarButtons() {
  const gcalBtn = document.getElementById("add-to-gcal-btn");
  const icalBtn = document.getElementById("download-ical-btn");

  if (gcalBtn) {
    gcalBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const title = encodeURIComponent("Wedding of Shirsh & Tanu (Mohit & Vaishali)");
      const details = encodeURIComponent(
        "Join us to celebrate the joyous Shubh Vivah ceremony of Shirsh Kumar Srivastav & Tanu Srivastav.\n\nVenue: Rajan Inter College, Ballia, Uttar Pradesh, India"
      );
      const location = encodeURIComponent(VENUE_NAME);
      // Event: 07 Dec 2026, 18:00 to 08 Dec 2026 02:00 (IST is UTC+5:30)
      const dates = "20261207T123000Z/20261207T203000Z";
      const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
      window.open(gcalUrl, "_blank", "noopener,noreferrer");
    });
  }

  if (icalBtn) {
    icalBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const icsData = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "PRODID:-//Shirsh & Tanu Wedding//EN",
        "BEGIN:VEVENT",
        "SUMMARY:Wedding of Shirsh & Tanu (Mohit & Vaishali)",
        "DESCRIPTION:With joyous hearts, we invite you to celebrate the wedding ceremony of Shirsh Kumar Srivastav and Tanu Srivastav.",
        "LOCATION:Rajan Inter College, Ballia, Uttar Pradesh, India",
        "DTSTART:20261207T123000Z",
        "DTEND:20261207T203000Z",
        "STATUS:CONFIRMED",
        "END:VEVENT",
        "END:VCALENDAR"
      ].join("\r\n");

      const blob = new Blob([icsData], { type: "text/calendar;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const tempLink = document.createElement("a");
      tempLink.href = url;
      tempLink.setAttribute("download", "Shirsh-Tanu-Wedding.ics");
      document.body.appendChild(tempLink);
      tempLink.click();
      document.body.removeChild(tempLink);
      URL.revokeObjectURL(url);
    });
  }
}

// ----------------------------------------------------------------------------
// 11. WHATSAPP INVITATION SHARING (WITH UPLOADED WEDDING INVITATION CARD)
// ----------------------------------------------------------------------------
function initWhatsAppSharing() {
  const shareBtn = document.getElementById("whatsapp-share-btn");
  const hintEl = document.getElementById("share-hint-tip");
  if (!shareBtn) return;

  shareBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    const currentUrl = window.location.href;
    const invitationText = `🙏 Shree Ganeshaya Namah 🙏\n\nTogether with their families, you are cordially invited to celebrate the Shubh Vivah of\n\n✨ Shirsh & Tanu ✨\n(Mohit & Vaishali)\n\n🗓️ Date: Monday, 07 December 2026\n📍 Venue: Rajan Inter College, Ballia, Uttar Pradesh\n\nPlease view our wedding invitation here:\n${currentUrl}\n\nWith Love & Blessings,\nThe Srivastav Family ❤️`;

    // 1. Try sharing with the actual Wedding Invitation Card image via Web Share API (Android, iOS)
    if (navigator.share) {
      try {
        const cardUrl = new URL("./assets/aistudio/image_3e44442a.png", window.location.href).href;
        const res = await fetch(cardUrl);
        const blob = await res.blob();
        const file = new File([blob], "Shirsh-Tanu-Wedding-Invitation-Card.png", { type: "image/png" });

        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({
            title: "Shirsh & Tanu | Royal Wedding Invitation",
            text: invitationText,
            files: [file],
          });
          return;
        }
      } catch (shareErr) {
        if (shareErr && shareErr.name === "AbortError") {
          return;
        }
        console.warn("Native file share fallback:", shareErr);
      }
    }

    // 2. Desktop / Fallback: Trigger download of card + open WhatsApp with link & OG preview
    if (hintEl) {
      hintEl.innerHTML = '<span>📥</span> Card download ho raha hai — WhatsApp par message ke sath attach kar sakte hain!';
    }
    const downloadLink = document.getElementById("download-card-btn");
    if (downloadLink) {
      downloadLink.click();
    }
    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(invitationText)}`;
    window.open(waUrl, "_blank", "noopener,noreferrer");
  });
}

// ----------------------------------------------------------------------------
// 12. STICKY NAVBAR & MOBILE MENU TOGGLE
// ----------------------------------------------------------------------------
function initNavbar() {
  const navbar = document.querySelector(".royal-navbar");
  const toggleBtn = document.querySelector(".mobile-nav-toggle");
  const navLinks = document.querySelector(".navbar-links");

  if (navbar) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    });
  }

  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener("click", () => {
      toggleBtn.classList.toggle("open");
      navLinks.classList.toggle("open");
    });

    // Close menu when clicking any nav link
    const links = navLinks.querySelectorAll("a");
    links.forEach((link) => {
      link.addEventListener("click", () => {
        toggleBtn.classList.remove("open");
        navLinks.classList.remove("open");
      });
    });
  }
}

// ----------------------------------------------------------------------------
// 13. BACK TO TOP BUTTON
// ----------------------------------------------------------------------------
function initBackToTop() {
  const backBtn = document.getElementById("back-to-top-btn");
  if (!backBtn) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      backBtn.classList.add("visible");
    } else {
      backBtn.classList.remove("visible");
    }
  });

  backBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// ----------------------------------------------------------------------------
// 14. ADVANCED 3D TILT EFFECT ON HERO PORTRAIT
// ----------------------------------------------------------------------------
function initHero3DTilt() {
  const wrapper = document.getElementById("hero-portrait-wrapper");
  const frame = document.getElementById("hero-portrait-frame");
  if (!wrapper || !frame) return;

  function handleMove(e) {
    const rect = wrapper.getBoundingClientRect();
    const clientX = e.clientX !== undefined ? e.clientX : (e.touches && e.touches[0] ? e.touches[0].clientX : null);
    const clientY = e.clientY !== undefined ? e.clientY : (e.touches && e.touches[0] ? e.touches[0].clientY : null);
    if (clientX === null || clientY === null) return;

    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -9;
    const rotateY = ((x - centerX) / centerX) * 11;

    frame.style.transform = `rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.025, 1.025, 1.025)`;
  }

  function handleLeave() {
    frame.style.transform = "rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
  }

  wrapper.addEventListener("mousemove", handleMove);
  wrapper.addEventListener("mouseleave", handleLeave);
  wrapper.addEventListener("touchmove", handleMove, { passive: true });
  wrapper.addEventListener("touchend", handleLeave, { passive: true });
}

// ----------------------------------------------------------------------------
// 15. INTERACTIVE HERO SHAPE SWITCHER
// ----------------------------------------------------------------------------
function initHeroShapeSwitcher() {
  const frame = document.getElementById("hero-portrait-frame");
  const pills = document.querySelectorAll(".hero-shape-pill");
  if (!frame || !pills.length) return;

  pills.forEach((pill) => {
    pill.addEventListener("click", () => {
      const shape = pill.getAttribute("data-hero-shape");
      pills.forEach((p) => {
        p.classList.remove("active");
        p.setAttribute("aria-selected", "false");
      });
      pill.classList.add("active");
      pill.setAttribute("aria-selected", "true");

      frame.classList.remove("shape-arch", "shape-oval", "shape-jharokha");
      if (shape === "oval") {
        frame.classList.add("shape-oval");
      } else if (shape === "jharokha") {
        frame.classList.add("shape-jharokha");
      }
    });
  });
}

// ----------------------------------------------------------------------------
// 16. INTERACTIVE GALLERY SHAPE SWITCHER
// ----------------------------------------------------------------------------
function initGalleryShapeSwitcher() {
  const grid = document.getElementById("gallery-grid");
  const shapeBtns = document.querySelectorAll(".gallery-shape-btn");
  if (!grid || !shapeBtns.length) return;

  shapeBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const shape = btn.getAttribute("data-shape");
      shapeBtns.forEach((b) => {
        b.classList.remove("active");
        b.setAttribute("aria-selected", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-selected", "true");

      grid.classList.remove("shape-arch", "shape-cameo", "shape-scallop", "shape-luxe");
      grid.classList.add(`shape-${shape}`);
    });
  });
}

// ----------------------------------------------------------------------------
// INITIALIZE EVERYTHING ON DOM READY
// ----------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  initCountdown();
  initPetalsCanvas();
  initScrollReveal();
  initGalleryFilters();
  initGalleryShapeSwitcher();
  initLightbox();
  initWishesWall();
  initMusicPlayer();
  initVenueDirections();
  initCalendarButtons();
  initWhatsAppSharing();
  initNavbar();
  initBackToTop();
  initHero3DTilt();
  initHeroShapeSwitcher();
});
