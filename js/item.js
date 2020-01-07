/*----- product parameters -------------------------------------------------------------------------------------------*/
let parameter = document.getElementsByClassName("it-main-item-info-parameter__list");

for(let i = 0; i < parameter.length; i++) {
    parameter[i].addEventListener("click", changeParameter, false);
    parameter[i].firstElementChild.setAttribute("class", "info-list__parameter_border");
}

function changeParameter(event) {
    let target = event.target.closest("LI");
    event.stopImmediatePropagation();
    for(let i = 0; i < target.parentElement.children.length; i++)
        target.parentElement.children[i].removeAttribute("class");

    target.setAttribute("class", "info-list__parameter_border");
}



/*----- buy product --------------------------------------------------------------------------------------------------*/
let purchase = document.getElementById("purchase");
purchase.addEventListener("click", addToBag);
function addToBag() {
    bag = JSON.parse(localStorage.getItem("bag"));
    let item = {};
    item.price = 0;
    while (item.price === 0)
        item = product[Math.floor(Math.random() * product.length)];

    for (let i = 0; i < document.getElementById("size").children.length; i++) {
        if (document.getElementById("size").children[i].classList.contains("info-list__parameter_border")) {
            item.size = document.getElementById("size").children[i].innerHTML;
            break;
        }
    }
    for (let i = 0; i < document.getElementById("color").children.length; i++) {
        if (document.getElementById("color").children[i].classList.contains("info-list__parameter_border")) {
            item.color = document.getElementById("color").children[i].innerHTML;
            break;
        }
    }

    let flag = false;
    for(let i = 0; i < bag.length; i++) {
        if ((item.name === bag[i].name) && (item.color === bag[i].color) && (item.size === bag[i].size)) {
            bag[i].quantity++;
            flag = true;
            break;
        }
    }

    let price = Math.floor(Math.random() * (401 - 250) * 100) / 100 + 250;
    if(!flag) {
        item.quantity = 1;
        item.price = price;
        bag.push(item);
    }

    getBagContent();

    localStorage.setItem("bag", JSON.stringify(bag));
}


/*----- photo collection events --------------------------------------------------------------------------------------*/
let photoCollection = document.getElementsByClassName("it-main-item-photo__collection")[0];
let mainPhoto = document.getElementById("main-image");

photoCollection.addEventListener("click", changeImage, false);
function changeImage(event) {
    let target = event.target.closest("IMG");
    let num = 0;
    mainPhoto.src = target.src;
    for(let i = 0; i < target.parentElement.children.length; i++) {
        target.parentElement.classList.remove("it-main-item-photo__collection_" + (i + 1));
        if(target === target.parentElement.children[i])
            num = i + 1;
    }
    target.parentElement.classList.add("it-main-item-photo__collection_" + num);
}