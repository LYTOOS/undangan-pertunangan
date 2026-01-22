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
// REVEAL OBSERVER
// =============================
const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add("show");
    }
  });
},{ threshold:0.15 });

reveals.forEach(el=>observer.observe(el));

// =============================
// RSVP MODAL LOGIC
// =============================
const rsvpModal   = document.getElementById("rsvpModal");
const rsvpBtn     = document.getElementById("rsvpBtn");
const rsvpNameEl  = document.getElementById("rsvpName");
const rsvpMessage = document.getElementById("rsvpMessage");
const sendRSVP    = document.getElementById("sendRSVP");

let rsvpStatus = "Hadir";

// OPEN MODAL
if(rsvpBtn){
  rsvpBtn.onclick = ()=>{
    rsvpModal.classList.add("show");
    rsvpNameEl.innerHTML = `Kepada Yth.<br><b>${guestName}</b>`;
  };
}

// CLOSE
function closeRSVP(){
  rsvpModal.classList.remove("show");
}

// SELECT STATUS
document.querySelectorAll(".rsvp-choice button").forEach(btn=>{
  btn.onclick = ()=>{
    document.querySelectorAll(".rsvp-choice button")
      .forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");
    rsvpStatus = btn.dataset.status;
  };
});

// SEND TO WHATSAPP
sendRSVP.onclick = ()=>{
  const phone = "6282261467360";
  const msg = rsvpMessage.value.trim();

  const text = `
Assalamu’alaikum Warahmatullahi Wabarakatuh

Saya *${guestName}*
menyatakan *${rsvpStatus}* menghadiri
acara tunangan:

Fitriani & Charly Handani
🗓 Minggu, 15 Februari 2026

${msg ? "Pesan:\n"+msg : ""}

Terima kasih 🙏
`.trim();

  window.open(
    `https://wa.me/${phone}?text=${encodeURIComponent(text)}`,
    "_blank"
  );
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
