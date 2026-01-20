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
const musicIcon = document.getElementById("music-icon");

function toggleMusic(){
  if(!music) return;

  if(music.paused){
    music.play();
    if(musicIcon) musicIcon.innerHTML="❚❚";
  }else{
    music.pause();
    if(musicIcon) musicIcon.innerHTML="▶";
  }
}


// =============================
// OPEN INVITE (FIXED)
// =============================
function openInvite(){

  document.body.classList.remove("locked");

  const cover  = document.getElementById("cover");
  const invite = document.querySelector(".invite");

  if(cover){
    cover.style.display="none";
  }

  if(invite){
    invite.classList.add("show");
  }

  if(music){
    music.volume = 0.7;
    music.play().catch(()=>{});
  }

  if(musicBtn){
    musicBtn.style.opacity = "1";
    musicBtn.style.pointerEvents = "auto";
  }

  if(typeof AOS !== "undefined"){
    AOS.refresh();
  }
}

// =============================
// RSVP WHATSAPP
// =============================
const rsvpBtn = document.getElementById("rsvpBtn");
if(rsvpBtn){
  rsvpBtn.onclick = ()=>{
    const phone = "6282261467360";
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
document.addEventListener("DOMContentLoaded",()=>{

  const target = new Date("2026-02-15T08:00:00").getTime();

  const d = document.getElementById("cd-day");
  const h = document.getElementById("cd-hour");
  const m = document.getElementById("cd-min");
  const s = document.getElementById("cd-sec");

  if(!d) return;

  setInterval(()=>{
    const now = new Date().getTime();
    const diff = target - now;
    tickSound.currentTime = 0;
    tickSound.play().catch(()=>{});


    if(diff <= 0){
      document.querySelector(".countdown-wrap").style.display="none";
      document.getElementById("eventStarted").style.display="block";
      return;
    }

    d.innerText = Math.floor(diff / (1000*60*60*24));
    h.innerText = Math.floor((diff % (1000*60*60*24)) / (1000*60*60));
    m.innerText = Math.floor((diff % (1000*60*60)) / (1000*60));
    s.innerText = Math.floor((diff % (1000*60)) / 1000);
  },1000);
});

// TICK SOUND
const tickSound = new Audio("audio/tick.mp3");
tickSound.volume = 0.25;
