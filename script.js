// =============================
// GUEST NAME FROM URL
// =============================
const params = new URLSearchParams(window.location.search);
const guestName = params.get("to")
  ? decodeURIComponent(params.get("to").replace(/\+/g," "))
  : "Tamu Undangan";

const guestEl = document.getElementById("guestName");
if (guestEl) guestEl.innerText = guestName;

// =============================
// MUSIC CONTROL
// =============================
const music = document.getElementById("music");
const musicBtn = document.getElementById("music-btn");

function toggleMusic(){
  const icon = document.getElementById("music-icon");

  if(music.paused){
    music.play();
    icon.innerHTML="❚❚";
    musicBtn.classList.remove("paused");
  }else{
    music.pause();
    icon.innerHTML="▶";
    musicBtn.classList.add("paused");
  }
}

// =============================
// OPEN INVITE
// =============================
function openInvite(){
  const cover = document.getElementById("cover");
  const invite = document.querySelector(".invite");

  cover.classList.add("hide");

  setTimeout(()=>{
    cover.style.display="none";
    invite.classList.add("show");

    AOS.refresh();
  },1200);

  document.body.classList.remove("locked");

  if(music){
    music.volume=0.7;
    music.play().catch(()=>{});
  }

  if(musicBtn){
    musicBtn.classList.add("active");
  }
}

// =============================
// RSVP WHATSAPP
// =============================
const rsvpBtn = document.getElementById("rsvpBtn");
if(rsvpBtn){
  rsvpBtn.onclick = ()=>{
    const phone = "6282261467360"; // GANTI NOMOR
    const text = `
Assalamu’alaikum Warahmatullahi Wabarakatuh

Saya *${guestName}* menyatakan
bersedia menghadiri acara tunangan:

Fitriani & Charly Handani
🗓 Minggu, 15 Februari 2026

Terima kasih 🙏
`.trim();

    window.open(
      `https://wa.me/${phone}?text=${encodeURIComponent(text)}`,
      "_blank"
    );
  };
}

// =============================
// COUNTDOWN 15 FEBRUARI 2026
// =============================
const targetDate = new Date("2026-02-15T00:00:00").getTime();

setInterval(()=>{
  const now = new Date().getTime();
  const diff = targetDate - now;

  if(diff <= 0) return;

  const d = Math.floor(diff / (1000*60*60*24));
  const h = Math.floor((diff % (1000*60*60*24)) / (1000*60*60));
  const m = Math.floor((diff % (1000*60*60)) / (1000*60));
  const s = Math.floor((diff % (1000*60)) / 1000);

  document.getElementById("cd-day").innerText = d;
  document.getElementById("cd-hour").innerText = h;
  document.getElementById("cd-min").innerText = m;
  document.getElementById("cd-sec").innerText = s;
},1000);
