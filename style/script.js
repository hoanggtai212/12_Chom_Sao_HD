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
    if (star.alpha <= 0 || star.alpha >= 1) star.delta = -star.delta;
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
    description: "Ma Kết là người sống có trách nhiệm, kiên trì và đầy tham vọng. Họ nghiêm túc trong công việc, không dễ dàng bỏ cuộc dù gặp khó khăn. Tính cách trầm ổn và thực tế giúp họ xây dựng kế hoạch dài hạn và bền vững. Ma Kết không thích khoe khoang mà luôn lặng lẽ tiến về phía trước. Tuy nhiên, đôi khi họ quá nghiêm khắc với bản thân và thiếu linh hoạt trong các mối quan hệ." 
  },
  { 
    name: "Aquarius", 
    image: "style/Aquarius.png", 
    description: "Bảo Bình là biểu tượng của sự sáng tạo, độc lập và tư duy tiên phong. Họ thích khám phá những ý tưởng mới lạ, không đi theo khuôn mẫu. Tính cách cởi mở nhưng có phần “khác người”, Bảo Bình luôn muốn tạo sự khác biệt trong cuộc sống. Họ có trái tim nhân ái, thường hướng đến lợi ích cộng đồng. Tuy nhiên, vì sống quá lý trí và độc lập nên đôi khi Bảo Bình khó thấu hiểu cảm xúc của người khác." 
  },
  { 
    name: "Pisces", 
    image: "style/Pisces.png", 
    description: "Song Tử là biểu tượng của sự thông minh, nhanh nhẹn và linh hoạt. Họ hoạt bát, dễ thích nghi và luôn tò mò với mọi điều xung quanh. Song Tử giỏi giao tiếp, có khiếu hài hước và dễ thu hút người khác bằng sự lanh lợi của mình. Tuy nhiên, họ dễ thay đổi, khó đoán và đôi khi thiếu sự ổn định trong cảm xúc lẫn quyết định. Song Tử thường mâu thuẫn giữa lý trí và cảm xúc." 
  },
  { 
    name: "Aries", 
    image: "style/Aries.png", 
    description: "Bạch Dương là người năng động, nhiệt huyết và đầy quyết đoán. Họ thích sự thử thách, luôn sẵn sàng bắt đầu những điều mới mẻ. Tính cách thẳng thắn, đôi khi hơi bốc đồng, nhưng luôn sống chân thành. Bạch Dương có tố chất lãnh đạo, không ngại đứng ra bảo vệ điều mình tin tưởng. Tuy nhiên, sự nóng vội và thiếu kiên nhẫn đôi lúc khiến họ dễ mắc sai lầm hoặc làm tổn thương người khác." 
  },
  { 
    name: "Taurus", 
    image: "style/Taurus.png", 
    description: "Kim Ngưu là người ổn định, trung thành và sống thực tế. Họ yêu thích sự an toàn, kiên nhẫn và luôn biết cách tận hưởng cuộc sống một cách chậm rãi nhưng sâu sắc. Kim Ngưu rất đáng tin cậy, luôn là chỗ dựa vững chắc cho người thân. Họ cũng có gu thẩm mỹ cao và thường bị cuốn hút bởi cái đẹp. Tuy nhiên, tính bảo thủ và ngại thay đổi có thể khiến Kim Ngưu bỏ lỡ nhiều cơ hội trong cuộc sống." 
  },
  { 
    name: "Gemini", 
    image: "style/Gemini.png", 
    description: "Song Tử là biểu tượng của sự thông minh, nhanh nhẹn và linh hoạt. Họ hoạt bát, dễ thích nghi và luôn tò mò với mọi điều xung quanh. Song Tử giỏi giao tiếp, có khiếu hài hước và dễ thu hút người khác bằng sự lanh lợi của mình. Tuy nhiên, họ dễ thay đổi, khó đoán và đôi khi thiếu sự ổn định trong cảm xúc lẫn quyết định. Song Tử thường mâu thuẫn giữa lý trí và cảm xúc." 
  },
  { 
    name: "Cancer", 
    image: "style/Cancer.png", 
    description: "Cự Giải sống tình cảm, nhạy cảm và luôn đặt gia đình lên hàng đầu. Họ có xu hướng bảo vệ người thân, sống nội tâm và đôi khi hơi khép kín. Dưới lớp vỏ cứng rắn là một trái tim mềm yếu, dễ tổn thương. Cự Giải rất trung thành trong tình cảm và thường là người lắng nghe tuyệt vời. Tuy nhiên, họ dễ bị chi phối bởi cảm xúc, hay lo lắng và có xu hướng sống với quá khứ." 
  },
  { 
    name: "Leo", 
    image: "style/Leo.png", 
    description: "Sư Tử mang trong mình sự tự tin, hào sảng và bản lĩnh của một người lãnh đạo. Họ thích được chú ý, thích tỏa sáng và luôn tràn đầy năng lượng tích cực. Sư Tử không ngần ngại đứng ra bảo vệ người yếu thế và truyền cảm hứng cho người khác. Họ rất trung thành, đặc biệt trong tình yêu. Tuy nhiên, cái tôi lớn và sự kiêu hãnh có thể khiến Sư Tử dễ bị tổn thương nếu không được công nhận." 
  },
  { 
    name: "Virgo", 
    image: "style/Virgo.png", 
    description: "Xử Nữ là người tỉ mỉ, chu đáo và cực kỳ cẩn trọng trong mọi việc. Họ yêu thích sự hoàn hảo, có khả năng phân tích tốt và luôn mong muốn mọi thứ diễn ra theo kế hoạch. Với Xử Nữ, chi tiết là điều quan trọng nhất. Họ sống trách nhiệm và thường là người âm thầm hỗ trợ phía sau. Tuy nhiên, đôi khi quá cầu toàn khiến họ trở nên khó tính, hay lo âu và khó chấp nhận sự khác biệt." 
  },
  { 
    name: "Libra", 
    image: "style/Libra.png", 
    description: "Thiên Bình yêu sự hài hòa, công bằng và cái đẹp. Họ giỏi giao tiếp, có gu thẩm mỹ tốt và luôn tìm kiếm sự cân bằng trong cuộc sống. Thiên Bình là người khéo léo, biết cách làm dịu mâu thuẫn và xây dựng mối quan hệ. Tuy nhiên, họ dễ rơi vào trạng thái do dự, thiếu quyết đoán vì luôn muốn làm hài lòng mọi người. Thiên Bình yêu hòa bình nhưng sợ đối đầu." 
  },
  { 
    name: "Scorpio", 
    image: "style/Scorpio.png", 
    description: "Bọ Cạp là cung hoàng đạo sâu sắc, bí ẩn và có trực giác mạnh mẽ. Họ rất trung thành, đam mê và sống hết mình cho những gì họ tin tưởng. Bọ Cạp không dễ dàng tin ai, nhưng một khi đã tin thì sẽ bảo vệ đến cùng. Họ là người giàu nội lực, không sợ khó khăn. Tuy nhiên, tính cách có phần chiếm hữu và bí ẩn khiến họ khó mở lòng, đôi khi bị hiểu lầm là lạnh lùng." 
  },
  { 
    name: "Sagittarius", 
    image: "style/Sagittarius.png", 
    description: "Nhân Mã là biểu tượng của sự lạc quan, yêu tự do và khát khao khám phá. Họ yêu thích trải nghiệm mới, thích đi đây đó và luôn tìm kiếm chân lý cuộc sống. Tính cách thẳng thắn, đôi khi bộc trực, nhưng Nhân Mã sống rất thật lòng. Họ không thích sự ràng buộc, luôn muốn cuộc sống linh hoạt và đầy màu sắc. Tuy nhiên, sự bốc đồng và thiếu kiên định có thể khiến họ bỏ lỡ những điều quan trọng." 
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
  const speed = 50; 

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
      constellationDescription.style.opacity = 0; // vẫn ẩn

      // Gỡ mọi sự kiện click cũ để tránh lặp
      constellationImg.onclick = null;

      // Gán lại sự kiện click để hiển thị mô tả
      constellationImg.onclick = () => {
        if (typingTimeout) {
          clearTimeout(typingTimeout);
          typingTimeout = null;
        }
        constellationDescription.textContent = "";
        constellationDescription.style.opacity = 1;
        typeWriter(data.description, constellationDescription);
      };
    };
  }, 500);
}


function goToNextConstellation() {
  currentIndex = (currentIndex + 1) % constellations.length;
  updateConstellationImage();
}

function goToPrevConstellation() {
  currentIndex = (currentIndex - 1 + constellations.length) % constellations.length;
  updateConstellationImage();
}

document.getElementById("prevBtn").onclick = goToPrevConstellation;
document.getElementById("nextBtn").onclick = goToNextConstellation;

let scrollCooldown = false;
window.addEventListener("wheel", (e) => {
  if (scrollCooldown) return;
  if (e.deltaY > 0) goToNextConstellation();
  else goToPrevConstellation();
  scrollCooldown = true;
  setTimeout(() => scrollCooldown = false, 1000);
});

function createMeteor() {
  const meteor = document.createElement("div");
  meteor.className = "meteor";
  meteor.style.top = Math.random() * window.innerHeight * 1 + "px";
  meteor.style.left = Math.random() * window.innerWidth + "px";
  document.body.appendChild(meteor);
  setTimeout(() => meteor.remove(), 1000);
}

function launchMeteorLoop() {
  createMeteor();
  const nextMeteorDelay = Math.random() * 2000 + 500; 
  setTimeout(launchMeteorLoop, nextMeteorDelay);
}

launchMeteorLoop();

updateConstellationImage();
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

  star.animate([
    { transform: `translate(0, 0)`, opacity: 1 },
    { transform: `translate(${dx}px, ${dy}px)`, opacity: 0 }
  ], {
    duration: 800,
    easing: "ease-out",
    fill: "forwards"
  });

  document.body.appendChild(star);
  setTimeout(() => star.remove(), 800);
}
}

// Gọi hàm khi chạm hoặc click
window.addEventListener("click", (e) => {
createBurstStars(e.clientX, e.clientY);
});
