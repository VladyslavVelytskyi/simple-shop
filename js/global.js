/*----- for IE -------------------------------------------------------------------------------------------------------*/
if (!Element.prototype.closest) {
    Element.prototype.closest = function(tag) {
        let node = this;
        while (node) {
            if (node.tagName === tag) return node;
            else node = node.parentElement;
        }
        return null;
    };
}
if (!Element.prototype.remove) {
    Element.prototype.remove = function() {
        if (this.parentNode) this.parentNode.removeChild(this);
    };
}



/*----- bag contains -------------------------------------------------------------------------------------------------*/
if(localStorage.getItem("bag") === null) {
    localStorage.setItem("bag", JSON.stringify([]));
}

let bag = JSON.parse(localStorage.getItem("bag"));
let bagSize = document.getElementById("bag-size");
let bagPrice = document.getElementById("bag-price");
let fullSize = 0;
let fullPrice = 0;
function getBagContent() {
    fullSize = 0;
    fullPrice = 0;
    if(bag.length > 0) {
        bag.forEach( function(x) {
            fullSize += x.quantity;
            fullPrice += x.price * x.quantity;
        });
    }
    bagSize.innerHTML = fullSize;
    bagPrice.innerHTML = (fullPrice <= 0) ? "" : "&#163;" + fullPrice.toFixed(2);
}
getBagContent();



/*----- menu events --------------------------------------------------------------------------------------------------*/
let iconMenu = document.getElementById("icon-menu");
let header = document.getElementsByClassName("g-header")[0];

iconMenu.addEventListener("click", showMenu);
function showMenu() {
    header.classList.add("g-header_open-menu");
    this.removeEventListener("click", showMenu);
    this.addEventListener("click", hideMenu);
}

function hideMenu() {
    header.classList.remove("g-header_open-menu");
    this.removeEventListener("click", hideMenu);
    this.addEventListener("click", showMenu);
}

let buttonSearch = document.getElementById("button-search");
let menu = document.getElementsByClassName("g-header-menu__nav")[0];

buttonSearch.addEventListener("click", showSearchField);
function showSearchField() {
    menu.classList.add("g-header-menu__nav_show-search");
    this.removeEventListener("click", showSearchField);
    this.addEventListener("click", hideSearchField);
}

function hideSearchField() {
    menu.classList.remove("g-header-menu__nav_show-search");
    this.removeEventListener("click", hideSearchField);
    this.addEventListener("click", showSearchField);
}