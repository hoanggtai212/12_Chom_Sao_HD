const starsCanvas = document.getElementById("stars");
const starsCtx = starsCanvas.getContext("2d");

let w, h;

function resize() {
  w = starsCanvas.width = window.innerWidth;
  h = starsCanvas.height = window.innerHeight;
}

window.addEventListener("resize", resize);
resize();

const stars = [];
const STAR_COUNT = 500;

for (let i = 0; i < STAR_COUNT; i++) {
  stars.push({
    x: Math.random() * w,
    y: Math.random() * h,
    radius: Math.random() * 3 + 0.5,
    alpha: Math.random(),
    delta: Math.random() * 0.02 + 0.005
  });
}

function drawStars() {
  starsCtx.clearRect(0, 0, w, h);
  starsCtx.fillStyle = "white";

  stars.forEach(star => {
    star.alpha += star.delta;

    if (star.alpha <= 0 || star.alpha >= 1) {
      star.delta = -star.delta;
    }

    starsCtx.globalAlpha = star.alpha;

    starsCtx.beginPath();
    starsCtx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    starsCtx.fill();
  });

  starsCtx.globalAlpha = 1;

  requestAnimationFrame(drawStars);
}

drawStars();

const constellations = [
  {
    name: "Capricorn",
    image: "style/Capricorn.png",
    description:
      "Ma Kết là người sống có trách nhiệm, kiên trì và đầy tham vọng..."
  },

  {
    name: "Aquarius",
    image: "style/Aquarius.png",
    description:
      "Bảo Bình là biểu tượng của sự sáng tạo, độc lập và tư duy tiên phong..."
  },

  {
    name: "Pisces",
    image: "style/Pisces.png",
    description:
      "Song Ngư là người giàu cảm xúc, mơ mộng và đầy lòng trắc ẩn..."
  },

  {
    name: "Aries",
    image: "style/Aries.png",
    description:
      "Bạch Dương là người năng động, nhiệt huyết và đầy quyết đoán..."
  }
];

let currentIndex = 0;

const constellationImg = document.getElementById("constellationImage");
const constellationName = document.getElementById("constellationName");
const constellationDescription = document.getElementById("constellationDescription");

let typingTimeout;

function typeWriter(text, element, callback) {
  element.textContent = "";
  element.style.opacity = 1;

  let i = 0;
  const speed = 40;

  if (typingTimeout) {
    clearTimeout(typingTimeout);
  }

  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;

      typingTimeout = setTimeout(type, speed);
    } else {
      typingTimeout = null;

      if (callback) callback();
    }
  }

  type();
}

function updateConstellationImage() {
  constellationImg.style.opacity = 0;
  constellationName.style.opacity = 0;
  constellationDescription.style.opacity = 0;

  if (typingTimeout) {
    clearTimeout(typingTimeout);
    typingTimeout = null;
  }

  constellationDescription.textContent = "";

  setTimeout(() => {
    const data = constellations[currentIndex];

    constellationImg.src = data.image;
    constellationName.textContent = data.name;

    constellationImg.onload = () => {
      constellationImg.style.opacity = 1;
      constellationName.style.opacity = 1;
    };
  }, 500);
}

function showDescription() {
  const data = constellations[currentIndex];

  if (typingTimeout) {
    clearTimeout(typingTimeout);
    typingTimeout = null;
  }

  constellationDescription.textContent = "";
  constellationDescription.style.opacity = 1;

  typeWriter(data.description, constellationDescription);
}

function goToNextConstellation() {
  currentIndex = (currentIndex + 1) % constellations.length;
  updateConstellationImage();
}

function goToPrevConstellation() {
  currentIndex =
    (currentIndex - 1 + constellations.length) % constellations.length;

  updateConstellationImage();
}

document.getElementById("prevBtn").onclick = goToPrevConstellation;
document.getElementById("nextBtn").onclick = goToNextConstellation;

// CLICK BẤT KỲ ĐÂU ĐỀU HIỆN CHỮ
window.addEventListener("click", (e) => {

  // tránh bị click nút next/prev cũng chạy chữ liên tục
  if (
    e.target.id !== "nextBtn" &&
    e.target.id !== "prevBtn"
  ) {
    showDescription();
  }

  // hiệu ứng nổ sao
  createBurstStars(e.clientX, e.clientY);
});

let scrollCooldown = false;

window.addEventListener("wheel", (e) => {
  if (scrollCooldown) return;

  if (e.deltaY > 0) {
    goToNextConstellation();
  } else {
    goToPrevConstellation();
  }

  scrollCooldown = true;

  setTimeout(() => {
    scrollCooldown = false;
  }, 1000);
});

function createMeteor() {
  const meteor = document.createElement("div");

  meteor.className = "meteor";

  meteor.style.top =
    Math.random() * window.innerHeight + "px";

  meteor.style.left =
    Math.random() * window.innerWidth + "px";

  document.body.appendChild(meteor);

  setTimeout(() => {
    meteor.remove();
  }, 1000);
}

function launchMeteorLoop() {
  createMeteor();

  const nextMeteorDelay =
    Math.random() * 2000 + 500;

  setTimeout(launchMeteorLoop, nextMeteorDelay);
}

launchMeteorLoop();

function createBurstStars(x, y) {
  const burstCount = 20;

  for (let i = 0; i < burstCount; i++) {
    const star = document.createElement("div");

    star.className = "burst-star";

    star.style.left = `${x}px`;
    star.style.top = `${y}px`;

    const angle = Math.random() * 2 * Math.PI;
    const distance = Math.random() * 100 + 50;

    const dx = Math.cos(angle) * distance;
    const dy = Math.sin(angle) * distance;

    star.animate(
      [
        {
          transform: `translate(0, 0)`,
          opacity: 1
        },
        {
          transform: `translate(${dx}px, ${dy}px)`,
          opacity: 0
        }
      ],
      {
        duration: 800,
        easing: "ease-out",
        fill: "forwards"
      }
    );

    document.body.appendChild(star);

    setTimeout(() => {
      star.remove();
    }, 800);
  }
}

updateConstellationImage();
