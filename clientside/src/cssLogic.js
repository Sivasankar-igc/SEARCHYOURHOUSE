//===============================HAMBURGER MENU BAR============================

const hamburger = document.querySelector("#hamburger-menu");console.log(document.querySelector("#hamburger-menu"));
let canSlide = true;
if (hamburger !== null) {
    hamburger.addEventListener("click", () => {
        const nav_items = document.querySelector("#navbar");

        nav_items.classList.toggle("slideInNavItems");
        console.log(nav_items);console.log("clicked")
    })
}


//=================================DROPDOWN MENU================================
//TO GET ALL DROPDOWN DIV BOXES
const dropDownLists = document.querySelectorAll(".se-opt-box");

if (dropDownLists.length !== 0) {

    dropDownLists.forEach(dropdown => {
        //to get the arrow button of the currently invoking dropdown box
        const dropdown_arrow = dropdown.querySelector(".select-opt .arrow-mark");

        //to get the selected option value of the currently invoking dropdown box
        const selected_opt = dropdown.querySelector(".select-opt .selected-opt");

        //to get the list contaniner of the currently invoking dropdown box
        const opt_list = dropdown.querySelector(".opt-list");

        //to get all list items of the currently invoking dropdown box
        const list_items = dropdown.querySelectorAll(".opt-list li");

        //---------TO OPEN OR CLOSE THE OPTIONS----------------

        dropdown_arrow.addEventListener("click", () => {
            dropdown_arrow.classList.toggle("rotate-arrow");
            opt_list.classList.toggle("opt-list-open");
        })

        selected_opt.addEventListener("click", () => {
            dropdown_arrow.classList.toggle("rotate-arrow");
            opt_list.classList.toggle("opt-list-open");
        })
        //-------------TO GET THE SELECTED VALUE---------------

        list_items.forEach(item => {
            item.addEventListener("click", () => {
                selected_opt.innerText = item.innerText;
                dropdown_arrow.classList.toggle("rotate-arrow");
                opt_list.classList.toggle("opt-list-open");
            })
        })
    })
}

//=============================================IMAGE-SLIDING========================================================
const image_nav = document.querySelectorAll(".img-sec .is-cont .img-slider-nav a");


// -----------Sliding Dots--------------------
if (image_nav.length !== 0) {
    image_nav.forEach(nav => {

        nav.addEventListener("click", () => {
            image_nav.forEach(imn => {
                if (imn.classList.value === "active-img-nav") {
                    imn.classList.remove("active-img-nav")
                }
            })

            nav.classList.add("active-img-nav")
        })
    })
}

// ---------Slide The Image By The Buttons--------------
const slideImage = (startingIndex, EndingIndex, direct) => {
    document.getElementById("img"+startingIndex).classList.add("current-img")

    if(direct === 1){
        document.getElementById("img"+startingIndex).classList.add("current-img")
    }
}