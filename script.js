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
// COUNTDOWN (SATU KALI SAJA)
// =============================
document.addEventListener("DOMContentLoaded", ()=>{

  const targetDate = new Date("2026-02-15T00:00:00").getTime();

  const dayEl  = document.getElementById("cd-day");
  const hourEl = document.getElementById("cd-hour");
  const minEl  = document.getElementById("cd-min");
  const secEl  = document.getElementById("cd-sec");

  if(!dayEl) return;

  setInterval(()=>{
    const now = Date.now();
    const diff = targetDate - now;

    if(diff <= 0) return;

    dayEl.innerText  = Math.floor(diff / (1000*60*60*24));
    hourEl.innerText = Math.floor((diff / (1000*60*60)) % 24);
    minEl.innerText  = Math.floor((diff / (1000*60)) % 60);
    secEl.innerText  = Math.floor((diff / 1000) % 60);
  },1000);

});
