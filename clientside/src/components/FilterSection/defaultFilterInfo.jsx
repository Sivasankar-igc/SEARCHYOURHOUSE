const DefaultFilterInfo = (defaultInfo) => {

    //===============================================ADD ITEMS TO WISHLIST==========================================

    const addToWishList = (e) => {
        console.log(e.target);console.log("done")
    }

    //***********************************************END OF CODE***********************************************

    if (defaultInfo.defaultInfo.length !== 0) {
        return (
            defaultInfo.defaultInfo.map((i, index) => {
                return (
                    <>
                        <section className="img-sec" key={index}>
                            <div className="is-cont">
                                <div className="images">
                                    {
                                        i.images.map((image) =>
                                        (
                                            <img src={image} alt="" />
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
                                <button onClick={addToWishList}>ADD TO WISHLSIT</button>
                            </div>
                        </section>
                    </>
                )
            })
        )
    }
}

export default DefaultFilterInfo;