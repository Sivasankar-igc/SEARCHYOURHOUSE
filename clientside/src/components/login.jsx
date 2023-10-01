import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../CSS/login.css"
import axios from "axios"
import logo from "../IMAGES/newlogo.png"

const Login = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState();
    const [pass, setPass] = useState();

    const login = () => {
            axios.post("/login", { email, pass })
                .then((res) => {
                    if (res.data === "success") {
                        navigate("/", {state:{userEmail:email}});
                    } else if (res.data === "wrongPass") {
                        window.alert("Please Enter Your Password Correctly")
                    } else if (res.data === "usernotexist") {
                        window.alert("User not found .. please signin to continue");
                    }
                })
                .catch(err => console.error(err))
    }

    return (
        <>
            <div className="login-box">
                <div id="lb-compname">
                    <h1>GHARABHADA.COM</h1>
                    <h3>Lorem ipsum dolor sit amet consectetur adipisicing elit. </h3>
                    <p>Lorem ipsum dolor sit amet consectetur</p>
                </div>
                <div id="middle-line"></div>
                <img src={logo} alt="" />
                <div id="lb-inputField">
                    <input type="email" placeholder="Enter Your Email Id" onChange={e=>setEmail(e.target.value)}/>
                    <input type="password" placeholder="Enter a password" onChange={e=>setPass(e.target.value)}/>

                    <button onClick={()=> login()}>LOG IN</button>
                    <p><a onClick={()=>navigate("/signin")}>Don't Have An Account?</a></p>
                </div>
            </div>
        </>
    )
}

export default Login;