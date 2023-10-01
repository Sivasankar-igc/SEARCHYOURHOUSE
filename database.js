const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/ImageContainer")
.then(()=> console.log("Database is connected"))
.catch((err)=>console.error(`An error occured at database : ${err}`))


const imageSchema = mongoose.Schema({
    
    imageId:{
        type:String,
        unique:true,
        required:true
    },
    images:{
        type:Array
    },
    imageKeys:{
        type:Array
    },
    imageDesc:{
        type:String
    },
    price:{
        type:String
    },
    priceInDigits:{
        type:Number
    },
    Address:{
        type:String
    }

})
const recommImageSchema = mongoose.Schema({
    imageId:{
        type:String
    },
    images:{
        type:String
    },
    imageDesc:{
        type:String
    },
    price:{
        type:String
    },
    Address:{
        type:String
    }
})
const userInfoSchema = mongoose.Schema({
    userEmail:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        unique:false,
        required:true
    },
    wishlists:{
        type:Array
    }
})

const imageColl = new mongoose.model("imageCollection", imageSchema);
const recommImageColl = new mongoose.model("recommImageCollection", recommImageSchema);
const userInfo = new mongoose.model("userInfo", userInfoSchema);



module.exports = {imageColl, recommImageColl, userInfo};