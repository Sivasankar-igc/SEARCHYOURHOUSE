import axios from "axios"
import "../CSS/navigation.css"
import "../CSS/filterButton.css"
import "../CSS/heroSection.css"
import "../CSS/feature.css"
import "../CSS/recom_house.css"
import "../CSS/footer.css"
import "../CSS/contact.css"
import img1 from "../IMAGES/house8.jpg";
import img2 from "../IMAGES/house9.jpg";
import img3 from "../IMAGES/house10.jpg";
import logo from "../IMAGES/newlogo.png";
import { useLocation, useNavigate } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import RecommendedHouse from "./recommendedHouse"

const HomePage = () => {

    const loc = useLocation();

    let hamburger_btn = useRef();
    let nav_items = useRef();

    let user_email=""


    if(hamburger_btn.current !== undefined){
        
        hamburger_btn.current.addEventListener("click", () => {
            nav_items.current !== undefined ? nav_items.current.classList.toggle("slideInNavItems") : ""
        })

    }

    if(loc.state !== null){
        user_email = loc.state.userEmail;
    }

    const navigate = useNavigate();
    const [recomHouses, setRecomHouse] = useState([]);

    useEffect(() => {
        axios.get("/downloadRecommended")
            .then((res) => res.data.length !== 0 ? setRecomHouse(res.data) : "")
            .catch((err) => console.error(`There is an error while downloading the recommended images : ${err}`))
    }, [])

    const logout=()=>{
        axios.get("/logout")
            .then((res)=>res.data ? navigate("/") : "")
            .catch((err)=>console.error(err))
    }

    return (
        <>
            <section id="header">
                <a href="#"><img src={logo} alt="" /></a>
                <div>
                    <ul id="hamburger-menu" ref={hamburger_btn}>
                        <li>
                            <div></div>
                        </li>
                        <li>
                            <div></div>
                        </li>
                        <li>
                            <div></div>
                        </li>
                    </ul>
                    <ul id="navbar" ref={nav_items}>
                        <li><a className="active" href="">Home</a></li>
                        <li><a href="/signin">Sign In</a></li>
                        <li><a href="/login">Login</a></li>
                        <li><a href="#contactus">Contact Us</a></li>
                        <li><a onClick={()=>navigate("/wishlist", {state:{email : user_email}})}>WishList</a></li>
                    </ul>
                </div>
            </section>

            <section id="searchHome">
                <button onClick={() => navigate("/filter")}>SEARCH YOUR DREAM HOUSE HERE</button>
            </section>

            <section id="hero">
                <h1>GHARABHADA.COM</h1>
                <h3>Lorem ipsum dolor sit amet consectetur adipisicing elit. </h3>
                <p>Lorem ipsum dolor sit amet consectetur</p>
            </section>

            <section id="feature">
                <div className="fea-container">
                    <img src={img1} alt="" />
                    <h6>ADVANCE BOOKING</h6>
                </div>
                <div className="fea-container">
                    <img src={img1} alt="" />
                    <h6>FREE ROOM TOUR</h6>
                </div>
                <div className="fea-container">
                    <img src={img1} alt="" />
                    <h6>NO HIDDEN CHARGES</h6>
                </div>
            </section>

            <section id="recom-house">
                <h1>Recommended Homes</h1>
                <div className="rh-container">
                    {
                        loc.state !== null  
                        ? <RecommendedHouse house_info={recomHouses} email={user_email}/>
                        : <RecommendedHouse house_info={recomHouses} email={user_email}/>
                    }
                </div>
            </section>

            <section id="contactus">
                <h1>Contact Us</h1>
                <div>
                    <input type="email" placeholder="Enter your email id" />
                    <p>To : sahoosivasankar33@gmail.com</p>
                    <textarea cols="100" rows="10" placeholder="Enter Your Query Here"></textarea>
                    <button>SEND</button>
                </div>
            </section>

            <footer>
                <div className="first-col">
                    <img src={logo} alt="" />
                    <p><strong>Address : </strong>Housing Board, Chandrasekhar Pur, Bhubaneswar</p>
                    <p><strong>Email-Id : </strong>sahoosivasankar33@gmail.com</p>
                    <p><strong>Phone : </strong>+91 1234567890</p>
                    <p><strong>24/7 customer service available</strong></p>
                </div>
                <div className="second-col">
                    <a href="#">About Us</a>
                    <a href="#">Terms & Conditions</a>
                    <a href="#">Privacy Policy</a>
                </div>
                <div id="copyright">
                    <strong>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error, possimus?</strong>
                </div>
            </footer>
        </>
    )
}

export default HomePage;