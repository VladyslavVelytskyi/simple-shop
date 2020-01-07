/*----- slideshow events ---------------------------------------------------------------------------------------------*/
let dots = document.getElementsByClassName("s-main-promo-slideshow-nav-container__dot");
let slides = document.getElementsByClassName("s-main-promo-slideshow__slide");
let sc = document.getElementsByClassName("s-main-promo__slideshow")[0];

let dotsContainer = document.getElementsByClassName("s-main-promo-slideshow-nav__container")[0];
for( let i = 0; i < sc.children.length; i++) {
    let dot = document.createElement("div");
    dot.setAttribute("class", "s-main-promo-slideshow-nav-container__dot");
    dot.setAttribute("data-number", i);
    dotsContainer.appendChild(dot);

}
dotsContainer.style.width = 23 * (dotsContainer.children.length-1) + 5 * dotsContainer.children.length + "px";

let startSlide = 0;
slides[startSlide].style.display = "-ms-grid";
slides[startSlide].style.display = "grid";
dots[startSlide++].style.backgroundColor = "rgb(241, 74, 88)";

function changeSlider() {
    for(let i = 0; i < dots.length; i++) {
        dots[i].style.backgroundColor = "rgb(210, 210, 210)";
        slides[i].style.display = "none";
    }
    if(startSlide >= dots.length)
        startSlide = 0;
    else if(startSlide < 0)
        startSlide = dots.length -1;

    slides[startSlide].style.display = "-ms-grid";
    slides[startSlide].style.display = "grid";
    dots[startSlide].style.backgroundColor = (startSlide === 2) ? "rgb(80, 193, 233)" : "rgb(241, 74, 88)";
    startSlide++;
}
let slideTimerId = setInterval(changeSlider, 10000);

let slideButton = document.getElementsByClassName("s-main-promo-slideshow-buttons__elem");
for(let i = 0; i < slideButton.length; i++)
    slideButton[i].addEventListener("click", changeSlideByButton);

function changeSlideByButton() {
    clearInterval(slideTimerId);
    let flag = +this.getAttribute("data-step");
    if (flag !== 1)
        startSlide -= 2;
    changeSlider();
    slideTimerId = setInterval(changeSlider, 10000);
}

dots[0].parentElement.addEventListener("click", func, false);
function func(event) {
    clearInterval(slideTimerId);
    let target = event.target;
    if(target.getAttribute("class") === "s-main-promo-slideshow-nav-container__dot") {
        event.stopImmediatePropagation();
        startSlide = +target.getAttribute("data-number");
        changeSlider();
        slideTimerId = setInterval(changeSlider, 10000);
    }
}

document.getElementsByClassName("s-main__promo")[0].addEventListener('touchstart', getTouchStart, false);
document.getElementsByClassName("s-main__promo")[0].addEventListener('touchmove', moveSlides, false);

let xStart = null;
function getTouchStart(event) { xStart = event.touches[0].clientX; }

function moveSlides(event) {
    if (!xStart) return;
    let xEnd = event.touches[0].clientX;

    clearInterval(slideTimerId);

    if (xEnd - xStart < 0) {}
    else if( xEnd - xStart > 0)
        startSlide -= 2;
    changeSlider();
    slideTimerId = setInterval(changeSlider, 10000);

    xStart = null;
}



let confirm = document.getElementById("confirm");
confirm.addEventListener("change", hideBanner);

function hideBanner() {
    document.getElementsByClassName("g-main__banner")[0].style.display = confirm.checked ? "none" : "block";
}
