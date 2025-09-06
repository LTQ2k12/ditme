// --- Rate-limit ---
let requestCount = 0;
let isBlocked = localStorage.getItem("isBlocked") === "true";

setInterval(() => { requestCount = 0; }, 1000);

function blockUser() {
  isBlocked = true;
  localStorage.setItem("isBlocked","true");
  // tạo overlay đẹp hơn
  const overlay = document.createElement("div");
  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.background = "rgba(0,0,0,0.9)";
  overlay.style.display = "flex";
  overlay.style.justifyContent = "center";
  overlay.style.alignItems = "center";
  overlay.style.zIndex = "99999";
  overlay.style.color = "red";
  overlay.style.fontSize = "3rem";
  overlay.style.fontFamily = "sans-serif";
  overlay.innerHTML = "🚫 ERROR 429: Too Many Requests";
  document.body.appendChild(overlay);
}

// --- Check block on load ---
if(isBlocked){
  blockUser();
}

// --- Send request ---
function sendRequest() {
  if(isBlocked){
    return;
  }
  requestCount++;
  if(requestCount > 10){
    blockUser();
  }
}
