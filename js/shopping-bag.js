let totalPrice = document.getElementById("total-price");
totalPrice.innerHTML = "&#163;" + fullPrice.toFixed(2);

/*----- create bag catalog -------------------------------------------------------------------------------------------*/
window.onload = createBagCatalog;

function createBagCatalog() {
    if(bag.length !== 0) {
        document.getElementsByClassName("sb-main__catalog")[0].innerHTML = "";
        for(let i = 0; i < bag.length; i++) {
            let block = document.createElement("a");
            block.setAttribute("class", "sb-main-catalog__item");
            block.href = "item.html";

            let bag = JSON.parse(localStorage.getItem("bag"));

            let img = document.createElement("div");
            img.style.backgroundImage = "url(img/"+ bag[i].img+")";
            img.setAttribute("class", "sb-main-catalog-item__img");
            block.appendChild(img);

            let description = getBlockDescription(bag[i]);

            block.appendChild(description);
            document.getElementsByClassName("sb-main__catalog")[0].appendChild(block);
        }
    }
}

function getBlockDescription(item) {
    let block = document.createElement("div");
    block.setAttribute("class", "sb-main-catalog-item__description");

    let name = document.createElement("h3");
    name.innerHTML = item.name;
    name.setAttribute("class", "sb-main-catalog-item-description__name");
    block.appendChild(name);

    let price = document.createElement("p");
    price.innerHTML = "&#163;" + item.price.toFixed(2);
    price.setAttribute("class", "sb-main-catalog-item-description__price");
    block.appendChild(price);

    let parameters = document.createElement("ul");

    let color = document.createElement("li");
    color.innerHTML = "<span>Color: </span>" + item.color;
    parameters.appendChild(color);

    let size = document.createElement("li");
    size.innerHTML = "<span>Size: </span>" + item.size;
    parameters.appendChild(size);

    let quantity = document.createElement("li");
    quantity.innerHTML = "Quantity: " + item.quantity;
    parameters.appendChild(quantity);

    parameters.setAttribute("class", "sb-main-catalog-item-description__parameters");
    block.appendChild(parameters);

    let button = document.createElement("button");
    button.innerHTML = "Remove item";
    button.setAttribute("class", "sb-main-catalog-item-description__button-remove");
    block.appendChild(button);

    return block;
}



/*----- get clear bag catalog ----------------------------------------------------------------------------------------*/
let emptyBag = document.getElementById("empty-bag");
emptyBag.addEventListener("click", getEmptyBag);

function clearBag () {
    localStorage.setItem("bag", JSON.stringify([]));
    bag = [];
    bagPrice.innerHTML = "";
    bagSize.innerHTML = 0;
    totalPrice.innerHTML = "&#163;0.00";
    document.getElementsByClassName("sb-main__catalog")[0].innerHTML = "";
}

function getEmptyBag() {
    clearBag();
    let block = document.createElement("p");
    block.innerHTML = "Your shopping bag is empty. Use Catalog to add new items";
    document.getElementsByClassName("sb-main__catalog")[0].appendChild(block);
}

let purchase = document.getElementById("buy-now");
purchase.addEventListener("click", buyProducts);
function buyProducts() {
    if(bag.length === 0) return;
    clearBag();
    let block = document.createElement("p");
    block.innerHTML = "Thank you for your purchase";
    document.getElementsByClassName("sb-main__catalog")[0].appendChild(block);
}


/*----- remove item --------------------------------------------------------------------------------------------------*/
document.getElementsByClassName("sb-main__catalog")[0].addEventListener("click", removeItem, false);
function removeItem(event) {
    let target = event.target.closest("BUTTON");

    if(target.classList.contains("sb-main-catalog-item-description__button-remove")) {
        event.preventDefault();
        event.stopImmediatePropagation();
        let q = target.previousElementSibling.lastElementChild.innerHTML.split(" ");
        q[q.length-1]--;
        target.previousElementSibling.lastElementChild.innerHTML = q.join(" ");
        if(q[q.length-1] <= 0) target.parentElement.parentElement.remove();

        let name = target.parentElement.firstElementChild.innerHTML;
        let color = target.previousElementSibling.firstElementChild.lastChild.nodeValue;
        let size =  target.previousElementSibling.children[1].lastChild.nodeValue;
        for(let i = 0; i < bag.length; i++) {
            if((bag[i].name === name) && (bag[i].size === size) && (bag[i].color === color)) {
                bag[i].quantity--;
                if(bag[i].quantity <= 0) bag.splice(i, 1);
                break;
            }
        }

        if(bag.length === 0) getEmptyBag();

        getBagContent();
        totalPrice.innerHTML = "&#163;" + fullPrice.toFixed(2);
        localStorage.setItem("bag", JSON.stringify(bag));
    }
}

