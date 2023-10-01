import { useNavigate } from "react-router-dom"

const RecommendedHouse = (house_info, email) => {

    const navigate = useNavigate();
    
    const handleRecommendedHouseClick=(e, id)=>{
        e.preventDefault();

        let temp = house_info.email;
        
        navigate("/filter",{state:{id:id, email:temp}})
    }

    if (house_info.house_info.length !== 0) {

        return (
            house_info.house_info.map((info, index) => {
                return (
                    <>
                        <div onClick={(event)=>handleRecommendedHouseClick(event, info.imageId)} className="house" key={index}>
                            <img src={info.images} alt="" />
                            <div className="desc">
                                <h5>{info.imageDesc}</h5>
                                <h5>{info.Address}</h5>
                                <h4>₹35,000</h4>
                                <h4>25%off {info.price}</h4>
                            </div>
                        </div>
                    </>
                )
            })

        )

    }
}

export default RecommendedHouse;