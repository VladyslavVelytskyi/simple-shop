/*----- filters events -----------------------------------------------------------------------------------------------*/
let filterShort = [];
let f = document.getElementsByClassName("c-main-filter-list-item__header");

for(let i = 0; i < f.length; i++)
    filterShort.push(f[i].innerHTML);
document.getElementById("filter-checked").innerHTML = filterShort.join(", ");

let filterButton = document.getElementsByClassName("c-main-filter__short")[0];

filterButton.addEventListener("click", showFilterBlock);
function showFilterBlock() {
    document.getElementsByClassName("c-main-filter")[0].classList.add("c-main-filter_button_on");
    document.getElementsByTagName("body")[0].classList.add("c-filter_list_open");
    filterButton.removeEventListener("click", showFilterBlock);
    filterButton.addEventListener("click", hideFilterBlock);
}

function hideFilterBlock() {
    document.getElementsByClassName("c-main-filter")[0].classList.remove("c-main-filter_button_on");
    document.getElementsByTagName("body")[0].classList.remove("c-filter_list_open");
    filterButton.addEventListener("click", showFilterBlock);
    filterButton.removeEventListener("click", hideFilterBlock);
}

let filters = document.getElementsByClassName("c-main-filter__list")[0];
filters.addEventListener("click", getFilter, false);
function getFilter(event) {
    let target = event.target.closest("LI");
    let header = target.parentElement.parentElement.children[0];
    let parent = document.getElementsByClassName("c-main-filter__list")[0];
    if (header.tagName === "H3") {
        event.stopImmediatePropagation();
        for (let i = 0; i < target.parentElement.children.length; i++)
            if(target.parentElement.children[i].getAttribute("class") === "c-main-filter-list-item-list__li_checked")
                target.parentElement.children[i].removeAttribute("class");

        if (target.innerHTML !== "Not selected") {
            target.setAttribute("class", "c-main-filter-list-item-list__li_checked");
            if (header.nextElementSibling.tagName !== "UL")
                header.parentElement.removeChild(header.nextElementSibling);

            let checkedFilter = document.createElement("p");
            checkedFilter.innerHTML = target.innerHTML;
            header.insertAdjacentElement("afterend", checkedFilter);
            header.parentElement.classList.add("c-main-filter-list__item_checked");

            for(let i = 0; i < parent.children.length; i++)
                if(parent.children[i].firstElementChild === header)
                    filterShort[i] = "<span class='c-main-filter-short-checked__checked'>" + target.innerHTML + "</span>";

        } else if (target.innerHTML === "Not selected") {
            header.parentElement.classList.remove("c-main-filter-list__item_checked");
            if (header.nextElementSibling.tagName === "P")
                header.parentElement.removeChild(header.nextElementSibling);

            for(let i = 0; i < parent.children.length; i++)
                if(parent.children[i].firstElementChild === header)
                    filterShort[i] =  target.parentElement.previousElementSibling.innerHTML;
        }
        document.getElementById("filter-checked").innerHTML = filterShort.join(", ");
    }
}



/*----- create products list -----------------------------------------------------------------------------------------*/
let catalogFirst = document.getElementById("c-main-catalog-block__list_1");
let catalogSecond = document.getElementById("c-main-catalog-block__list_2");

function createItemBlock(product) {
    let block = document.createElement("a");
    block.setAttribute("class", "c-main-catalog-block-list__item");
    block.href = "item.html";

    let img = document.createElement("div");
    img.style.backgroundImage = "url(img/"+ product.img+")";
    img.setAttribute("class", "c-main-catalog-block-list-item__img");

    if(product.banner) {
        let bannerHeader = document.createElement("h4");
        bannerHeader.innerHTML = product.banner;
        bannerHeader.setAttribute("class", "c-main-catalog-block-list-item-img__header");
        img.appendChild(bannerHeader);

        let bannerText = document.createElement("p");
        bannerText.innerHTML = product.bannerText;
        bannerText.setAttribute("class", "c-main-catalog-block-list-item-img__text");
        img.appendChild(bannerText);
    }
    block.appendChild(img);

    let name = document.createElement("h3");
    name.innerHTML = product.name;
    name.setAttribute("class", "c-main-catalog-block-list-item__name");
    block.appendChild(name);

    let price = document.createElement("p");

    if (product.sale !== 0)
        price.innerHTML = "<span class='c-main-catalog-block-list-item-price__sale'>&#163;" + product.price.toFixed(2) +
                          " <span class='c-main-catalog-block-list-item-price__new'>-" + ((1 - product.sale / product.price) * 100).toFixed(0) +
                         "%</span></span> &#163;" + product.sale.toFixed(2);
    else if (product.price === 0)
        price.innerHTML = "<span class='c-main-catalog-block-list-item-price__new'>" + product.description + "</span>";
    else
        price.innerHTML = "&#163;" + product.price.toFixed(2);
    price.setAttribute("class", "c-main-catalog-block-list-item__price");

    if (product.new)
        price.innerHTML += " <span class='c-main-catalog-block-list-item-price__new'>New</span>";

    block.appendChild(price);
    return block;
}

function buildBlock() {
    catalogFirst.innerHTML = "";
    catalogSecond.innerHTML = "";

    /*let l = (document.body.clientWidth < 768) ? 8 : 12;*/
    let l = 8;

    for (let i = 0; i < l; i++) {
        let block = createItemBlock(product[i]);
        if (document.body.clientWidth < 768)
            (i < 2) ? catalogFirst.appendChild(block) : catalogSecond.appendChild(block);
        else if (document.body.clientWidth < 1024)
            (i < 3) ? catalogFirst.appendChild(block) : catalogSecond.appendChild(block);
        else
            (i < 4) ? catalogFirst.appendChild(block) : catalogSecond.appendChild(block);
    }
}

window.onload = buildBlock;
window.onresize = buildBlock;

let more = document.getElementById("show-more");
more.addEventListener("click", showMoreItems);
function showMoreItems() {
    let cs1 = getComputedStyle(catalogFirst);
    let cs2 = getComputedStyle(catalogSecond);
    let size = catalogFirst.children.length + catalogSecond.children.length;
    if(size < product.length) {
        for(let i = size; i < size + 4; i++) {
            if(product[i]) {
                let block = createItemBlock(product[i]);
                catalogSecond.appendChild(block);
            }
        }
        catalogSecond.style.height = parseInt(cs1.height) + parseInt(cs2.height) + "px";
        size = size + 4;
        if(size >= product.length)
            this.style.display = "none";
    }

}