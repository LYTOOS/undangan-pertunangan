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

  if(typeof AOS !== "undefined"){
    AOS.refresh();
  }
}

// =============================
// RSVP ADVANCE SYSTEM
// =============================
const modal = document.getElementById("rsvpModal");
const rsvpGuest = document.getElementById("rsvpGuest");

if(rsvpBtn){
  rsvpBtn.onclick = ()=>{
    rsvpGuest.innerText = guestName;
    modal.classList.add("show");
  };
}

function closeRSVP(){
  modal.classList.remove("show");
}

document.getElementById("sendRSVP").onclick = ()=>{

  const status = document.querySelector('input[name="status"]:checked').value;
  const count  = document.getElementById("guestCount").value;
  const wish   = document.getElementById("wish").value || "-";

  const phone = "6282261467360";

  const text = `
Assalamu’alaikum Warahmatullahi Wabarakatuh

Saya *${guestName}*
Status Kehadiran: *${status}*
Jumlah Tamu: *${count} orang*

Ucapan:
"${wish}"

Tunangan:
Fitriani & Charly Handani
Minggu, 15 Februari 2026

Terima kasih 🙏
`.trim();

  window.open(
    `https://wa.me/${phone}?text=${encodeURIComponent(text)}`,
    "_blank"
  );

  closeRSVP();
};

// =============================
// COUNTDOWN 15 FEBRUARI 2026
// =============================
document.addEventListener("DOMContentLoaded",()=>{

  const target = new Date("2026-02-15T00:00:00").getTime();

setInterval(()=>{
  const now = new Date().getTime();
  const gap = target - now;

  if(gap < 0) return;

  document.getElementById("d").innerText =
    Math.floor(gap / (1000*60*60*24));
  document.getElementById("h").innerText =
    Math.floor((gap / (1000*60*60)) % 24);
  document.getElementById("m").innerText =
    Math.floor((gap / (1000*60)) % 60);
  document.getElementById("s").innerText =
    Math.floor((gap / 1000) % 60);
},1000);
});

function openInvite(){

  document.body.classList.remove("locked");

  document.getElementById("cover").style.display = "none";
  document.querySelector(".invite").classList.add("show");

  const music = document.getElementById("music");
  const musicBtn = document.getElementById("music-btn");

  if(music){
    music.volume = 0.7;
    music.play().catch(()=>{});
  }

  if(musicBtn){
    musicBtn.classList.add("show","active");
  }
}
