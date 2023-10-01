import "../CSS/wishlist.css"
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const WishList = () => {

    const loc = useLocation();

    const [wishlist, setWishList] = useState([]);

    if (loc.state.email !== "") {

        useEffect(() => {
            const email = loc.state.email;
            axios.post("/getWishLists", { email })
                .then((res) => res.data !== null ? setWishList(res.data) : "")
                .catch((err) => console.error(err))
        }, [])

        if (wishlist.length !== 0) {
            return (
                <div className="wishlist-wrapper">
                    {
                        wishlist.map((image) => (
                            <section id="house-sec">
                                {
                                    <img src={image.images[0]} alt="" />
                                }
                                <div id="desc">
                                    <h5>{image.imageDesc}</h5>
                                    <h5>{image.Address}</h5>
                                    <h4>₹9,500</h4>
                                    <h4>25%off {image.price}</h4>
                                </div>
                                <div id="btn-wrap">
                                    <button>BOOK NOW</button>
                                    <button>BOOK IN ADVANCE</button>
                                </div>
                            </section>
                        ))
                    }
                </div>
            )
        } else {
            return (
                <>
                    <h1>There is nothing to show here</h1>
                    <h1>Please Add Your Dream Home</h1>
                    <h1>Or Reload The Page</h1>
                </>
            )
        }

    } else {
        return (
            <>
                <h1>Please Login To Access Your Wishlist...</h1>
            </>
        )
    }
}

export default WishList;