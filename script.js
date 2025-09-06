// --- Globals ---
const intro = document.getElementById("intro");
const bioCard = document.getElementById("bioCard");
const audioPlayer = document.getElementById("audioPlayer");
const audio = document.getElementById("bg-music");
const volume = document.getElementById("volume-control");
const enterBtn = document.getElementById("enterBtn");

// --- Snowflake ---
function createSnowflake(){
  const snowflake=document.createElement("div");
  snowflake.classList.add("snowflake");
  snowflake.textContent="❄";
  snowflake.style.left=Math.random()*window.innerWidth+"px";
  snowflake.style.fontSize=Math.random()*20+10+"px";
  snowflake.style.animationDuration=Math.random()*5+5+"s";
  document.body.appendChild(snowflake);
  setTimeout(()=>{snowflake.remove();},10000);
}
setInterval(createSnowflake,100);

// --- Particles ---
const particleContainer=document.querySelector('.bg-particles');
for(let i=0;i<150;i++){
  const particle=document.createElement('div');
  particle.classList.add('particle');
  const size=Math.random()*8+2;
  particle.style.width=size+'px';
  particle.style.height=size+'px';
  particle.style.left=Math.random()*window.innerWidth+'px';
  particle.style.top=Math.random()*window.innerHeight+'px';
  particle.style.animationDuration=Math.random()*20+10+'s';
  particleContainer.appendChild(particle);
}

// --- Volume control ---
volume.addEventListener("input",()=>{audio.volume=volume.value;});

// --- Rate-limit ---
let requestCount = 0;
let isBlocked = localStorage.getItem("isBlocked") === "true";

setInterval(() => { requestCount = 0; }, 1000);

// --- Check block on load ---
if(isBlocked){
  document.body.innerHTML = `<div style="display:flex;align-items:center;justify-content:center;height:100vh;font-size:3rem;color:red;font-family:sans-serif">🚫 ERROR 429: Too Many Requests</div>`;
}

// --- Send request ---
function sendRequest() {
  if(isBlocked){
    document.body.innerHTML = `<div style="display:flex;align-items:center;justify-content:center;height:100vh;font-size:3rem;color:red;font-family:sans-serif">🚫 ERROR 429: Too Many Requests</div>`;
    return;
  }
  requestCount++;
  if(requestCount > 10){
    isBlocked = true;
    localStorage.setItem("isBlocked","true");
    document.body.innerHTML = `<div style="display:flex;align-items:center;justify-content:center;height:100vh;font-size:3rem;color:red;font-family:sans-serif">🚫 ERROR 429: Too Many Requests</div>`;
  }
}

// --- Intro -> Bio ---
enterBtn.addEventListener("click", ()=>{
  sendRequest();
  intro.style.display="none";
  bioCard.style.display="block";
  audioPlayer.style.display="block";
  audio.play();
});
