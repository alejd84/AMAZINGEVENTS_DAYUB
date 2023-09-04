/* BACK-TO-TOP */
var target = document.getElementById("target");

var scrollToTopBtn = document.querySelector(".scrollToTopBtn")
var rootElement = document.documentElement

function callback(entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      // Show button
      scrollToTopBtn.classList.add("showBtn")
    } else {
      // Hide button
      scrollToTopBtn.classList.remove("showBtn")
    }
  });
}

function scrollToTop() {
  rootElement.scrollTo({
    top: 0,
    behavior: "smooth"
  })
}
scrollToTopBtn.addEventListener("click", scrollToTop);

let observer = new IntersectionObserver(callback);
observer.observe(target);
/* ---------- */


/* CALENDAR */
const dayNumber = new Date().getDate();
const year = new Date().getFullYear();
const dayName = new Date().toLocaleString("default", { weekday: "long" });
const monthName = new Date().toLocaleString("default", { month: "long" });

document.querySelector(".month-name").innerHTML = monthName;
document.querySelector(".day-name").innerHTML = dayName;
document.querySelector(".date-number").innerHTML = dayNumber;
document.querySelector(".year").innerHTML = year;
/* ---------- */