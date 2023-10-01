import { useNavigate } from "react-router-dom";
import "../CSS/signIn.css";
import { useState } from "react";
import axios from "axios";
import logo from "../IMAGES/newlogo.png";

const SignIn = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState();
    const [pass, setPass] = useState();
    const [confirmPass, setConfirmPass] = useState();

    const addUser = () => {
        if (pass === confirmPass) {
            axios.post("/signin", { email, pass })
                .then((res) => {
                    if (res.data === "exist") {
                        window.alert("This Email Id has already been taken");
                    } else if (res.data === "saved") {
                        navigate("/", {state:{userEmail:email}})
                    } else if (res.data === "not saved") {
                        window.alert("Something went wrong");
                    }
                })
                .catch(err => console.error(err))
        } else {
            window.alert("Re-enter your password correctly...");
        }
    }

    return (
        <>
            <div className="signin-box">
                <div id="sb-compname">
                    <h1>GHARABHADA.COM</h1>
                    <h3>Lorem ipsum dolor sit amet consectetur adipisicing elit. </h3>
                    <p>Lorem ipsum dolor sit amet consectetur</p>
                </div>
                <div id="middle-line"></div>
                <img src={logo}alt="" />
                <div id="sb-inputField">
                    <input type="email" placeholder="Enter Your Email Id" onChange={e => setEmail(e.target.value)} />
                    <input type="password" placeholder="Enter a password" onChange={e => setPass(e.target.value)} />
                    <input type="password" placeholder="Re-Enter your password" onChange={e => setConfirmPass(e.target.value)} />

                    <button onClick={() => addUser()}>SIGN IN</button>
                    <p><a onClick={() => navigate("/login")}>Have An Account?</a></p>
                </div>
            </div>
        </>
    )
}

export default SignIn