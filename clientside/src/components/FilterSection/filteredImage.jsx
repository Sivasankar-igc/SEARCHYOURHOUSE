import axios from "axios";

const FilteredImage = (image) => {

    //===============================================ADD ITEMS TO WISHLIST==========================================

    const addToWishList = (imageId) => {
        let userEmail = image.email;
        axios.post("/addToWishList", {userEmail, imageId})
        .then((res=>{
            if (res.data === "itemadded"){
                window.alert("Item added to your wishlist")
            }else if( res.data === "itemalreadyadded"){
                window.alert("You have already added this item")
            }else if(res.data === "itemnotadded"){
                window.alert("Item couldn't be added")
            }else if(res.data === "loginRequired"){
                window.alert("Please Login to Access The Wishlist")
            }
        } ))
        .catch((err)=>console.error(err))
    }

    //***********************************************END OF CODE***********************************************

    if (image.image.length !== 0) {
        return (
            image.image.map((i, index) => {
                return (
                    <>
                        <section className="img-sec" key={index}>
                            <div className="is-cont">
                                <div className="images">
                                    {
                                        i.images.map((ig) =>
                                        (
                                            <img src={ig} alt="" />
                                        )
                                        )
                                    }
                                </div>
                                {/* <div className="img-slider-btn">
                                    <div className="left-img-btn" >
                                        <span></span>
                                    </div>
                                    <div className="right-img-btn" >
                                        <span></span>
                                    </div>
                                </div>
                                <div className="img-slider-nav">
                                    {
                                        i.images.map(() => (
                                            <a></a>
                                        ))
                                    }
                                </div> */}
                            </div>

                            <div id="desc">
                                <h5>{i.imageDesc}</h5>
                                <h5>{i.Address}</h5>
                                <h4>₹9,500</h4>
                                <h4>25%off {i.price}</h4>
                            </div>
                            <div id="btn-wrap">
                                <button>BOOK NOW</button>
                                <button>BOOK IN ADVANCE</button>
                                <button onClick={()=>addToWishList(i.imageId)}>ADD TO WISHLSIT</button>
                            </div>
                        </section>
                    </>
                )
            })
        )
    }
}

export default FilteredImage;