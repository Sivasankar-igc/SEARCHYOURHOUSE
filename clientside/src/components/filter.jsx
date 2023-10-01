import "../CSS/filter.css"
import { useLocation, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import FilteredImage from "./FilterSection/filteredImage"
import DefaultFilterInfo from "./FilterSection/defaultFilterInfo"

const Filter = () => {

    let bhk = "3BHK", price = "₹22,000-₹28,000", address = "Niladri Vihar";
    const navigate = useNavigate();

    //=================================DROPDOWN MENU================================

    useEffect(() => {
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
    })

    //*********************************************DROPDOWN-LIST END******************************************

    //=============================================GETTING THE FILTERED DATA=============================================
    const getTheFilteredData = () => {

        const selected_opt = document.querySelectorAll(".select-opt .selected-opt");
        for (let i = 0; i < selected_opt.length; i++) {
            i === 0 ? bhk = selected_opt[i].innerText : i === 1 ? price = selected_opt[i].innerText : address = selected_opt[i].innerText
        }

        axios.post("/getFilteredData", { bhk, price, address })
            .then((res) => {
                if (res.data !== null) {
                    if (res.data.length !== 0) {
                        setSelctedImage(res.data);
                        <DefaultFilterInfo defaultInfo={selectedImage} />
                    }
                }
            })
            .catch((err) => window.alert("There is an error while uploading the filtered informations...."))
    }
    //**********************************************END OF CODE***********************************************************

    //==============================================CODE IF AN IMAGE IS SELECTED==========================================================

    const loc = useLocation();
    const [selectedImage, setSelctedImage] = useState([]);

    if (loc.state !== null) {

        let imageId = loc.state.id;
        let email = loc.state.email;

        useEffect(() => {
            axios.post("/downloadImage", { imageId })
                .then((res) => res.data.length !== 0 ? setSelctedImage(res.data) : "")
                .catch((err) => console.error(err))
        }, [])

        if (selectedImage.length !== 0) {

            return (
                <>
                    <section className="filter-sec">
                        <div className="se-opt-box" >
                            <div className="select-opt">
                                <div className="selected-opt">3BHK</div>
                                <div className="arrow-mark"></div>
                            </div>
                            <ul className="opt-list">
                                <li onClick={() => getTheFilteredData()}>1BHK</li>
                                <li onClick={() => getTheFilteredData()}>2BHK</li>
                                <li onClick={() => getTheFilteredData()}>3BHK</li>
                                <li onClick={() => getTheFilteredData()}>3.5BHK</li>
                            </ul>
                        </div>
                        <div className="se-opt-box" >
                            <div className="select-opt">
                                <div className="selected-opt">₹12,000-₹18,000</div>
                                <div className="arrow-mark"></div>
                            </div>
                            <ul className="opt-list">
                                <li onClick={() => getTheFilteredData()}>₹22,000-₹28,000</li>
                                <li onClick={() => getTheFilteredData()}>₹6,000-₹9,000</li>
                                <li onClick={() => getTheFilteredData()}>₹9,000-₹12,000</li>
                                <li onClick={() => getTheFilteredData()}>₹20,000-₹25,000</li>
                                <li onClick={() => getTheFilteredData()}>₹29,000-₹33,000</li>
                                <li onClick={() => getTheFilteredData()}>₹7,000-₹15,000</li>
                            </ul>
                        </div>
                        <div className="se-opt-box" >
                            <div className="select-opt">
                                <div className="selected-opt">Sailashree Vihar</div>
                                <div className="arrow-mark"></div>
                            </div>
                            <ul className="opt-list">
                                <li onClick={() => getTheFilteredData()}>Niladri Vihar</li>
                                <li onClick={() => getTheFilteredData()}>LIC</li>
                                <li onClick={() => getTheFilteredData()}>VIM</li>
                                <li onClick={() => getTheFilteredData()}>GA Plot</li>
                                <li onClick={() => getTheFilteredData()}>Army Colony</li>
                            </ul>
                        </div>
                    </section>
                    <FilteredImage image={selectedImage} email={email} />
                </>
            )
        }
    }
    //*********************************************END OF CODE*********************************************************************


    //==========================================================IF THE USER CLICKED ON THE SEARCH BUTTON==========================================
    else {

        useEffect(() => {
            axios.post("/downloadDefaultImages", { bhk, price, address })
                .then((res) => res.data.length !== 0 ? setSelctedImage(res.data) : "")
                .catch((err) => console.error(err))
        }, [])

        if (selectedImage.length !== 0) {
            return (
                <>
                    <section className="filter-sec">
                        <div className="se-opt-box" >
                            <div className="select-opt">
                                <div className="selected-opt">3BHK</div>
                                <div className="arrow-mark"></div>
                            </div>
                            <ul className="opt-list">
                                <li onClick={() => getTheFilteredData()}>1BHK</li>
                                <li onClick={() => getTheFilteredData()}>2BHK</li>
                                <li onClick={() => getTheFilteredData()}>3BHK</li>
                                <li onClick={() => getTheFilteredData()}>3.5BHK</li>
                            </ul>
                        </div>
                        <div className="se-opt-box" >
                            <div className="select-opt">
                                <div className="selected-opt">₹12,000-₹18,000</div>
                                <div className="arrow-mark"></div>
                            </div>
                            <ul className="opt-list">
                                <li onClick={() => getTheFilteredData()}>₹22,000-₹28,000</li>
                                <li onClick={() => getTheFilteredData()}>₹6,000-₹9,000</li>
                                <li onClick={() => getTheFilteredData()}>₹9,000-₹12,000</li>
                                <li onClick={() => getTheFilteredData()}>₹20,000-₹25,000</li>
                                <li onClick={() => getTheFilteredData()}>₹29,000-₹33,000</li>
                                <li onClick={() => getTheFilteredData()}>₹7,000-₹15,000</li>
                            </ul>
                        </div>
                        <div className="se-opt-box" >
                            <div className="select-opt">
                                <div className="selected-opt">Sailashree Vihar</div>
                                <div className="arrow-mark"></div>
                            </div>
                            <ul className="opt-list">
                                <li onClick={() => getTheFilteredData()}>Niladri Vihar</li>
                                <li onClick={() => getTheFilteredData()}>LIC</li>
                                <li onClick={() => getTheFilteredData()}>VIM</li>
                                <li onClick={() => getTheFilteredData()}>GA Plot</li>
                                <li onClick={() => getTheFilteredData()}>Army Colony</li>
                            </ul>
                        </div>
                    </section>
                    <DefaultFilterInfo defaultInfo={selectedImage} />
                </>
            )
        }
    }
    //*****************************************************END OF CODE******************************************************

}

export default Filter;