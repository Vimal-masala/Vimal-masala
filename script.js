/* =====================================================
   VIMAL SPICY FOOD MASALA – EDITABLE SETTINGS
   ===================================================== */

/* ---- 1. SHOP COORDINATES (lines 9 and 10) ----
   Type your own shop latitude and longitude between the quotes.
   Leave both empty until you have the correct values.
   Tip: in Google Maps, long-press (or right-click) the shop and copy the two numbers. */
const latitude = "26.8855820";
const longitude = "84.5745910";

/* ---- 2. SHOP TIMINGS – 24-hour format "HH:MM" (lines 14 and 15) ----
   Please confirm and update whenever timings change. */
const openingTime = "06:00"; // 6:00 AM
const closingTime = "21:00"; // 9:00 PM

/* =====================================================
   CODE BELOW – no need to edit
   ===================================================== */
const $ = (id) => document.getElementById(id);

/* Three-dot menu */
const menuBtn = $("menuBtn"), menuList = $("menuList");
function setMenu(open) { menuList.hidden = !open; menuBtn.setAttribute("aria-expanded", String(open)); }
menuBtn.addEventListener("click", (e) => { e.stopPropagation(); setMenu(menuList.hidden); });
menuList.addEventListener("click", (e) => { if (e.target.closest("a")) setMenu(false); });
document.addEventListener("click", (e) => { if (!menuList.contains(e.target)) setMenu(false); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") { setMenu(false); menuBtn.focus(); } });

/* Header turns solid after the hero */
const header = $("header");
function onScroll() { header.classList.toggle("scrolled", window.scrollY > 40); }
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

/* Google Maps link */
function buildMapsUrl() {
  const lat = latitude.trim(), lng = longitude.trim();
  if (!lat || !lng || isNaN(Number(lat)) || isNaN(Number(lng))) return null;
  return "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(lat) + "," + encodeURIComponent(lng);
}
$("mapBtn").addEventListener("click", () => {
  const url = buildMapsUrl(), msg = $("mapMsg");
  if (url) { msg.hidden = true; window.open(url, "_blank", "noopener"); }
  else {
    msg.textContent = "Map location will be available soon. Please call or WhatsApp us for directions.";
    msg.hidden = false;
  }
});

/* Live shop status (visitor's local time) */
function toMin(t) { const [h, m] = t.split(":").map(Number); return h * 60 + m; }
function fmt(t) { const [h, m] = t.split(":").map(Number); return ((h % 12) || 12) + ":" + String(m).padStart(2, "0") + " " + (h < 12 ? "AM" : "PM"); }
const hoursLabel = fmt(openingTime) + " – " + fmt(closingTime);
$("hoursText").textContent = hoursLabel;
$("timingsText").textContent = hoursLabel;
function updateStatus() {
  const now = new Date(), cur = now.getHours() * 60 + now.getMinutes();
  const o = toMin(openingTime), c = toMin(closingTime);
  const open = o <= c ? (cur >= o && cur < c) : (cur >= o || cur < c);
  const pill = $("statusPill");
  pill.classList.toggle("open", open);
  pill.classList.toggle("closed", !open);
  $("statusText").textContent = open ? "OPEN NOW" : "CLOSED NOW";
}
updateStatus();
setInterval(updateStatus, 60000);

$("year").textContent = new Date().getFullYear();
