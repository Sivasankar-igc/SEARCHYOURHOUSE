import express from "express"
import { imageColl, recommImageColl, userInfo } from "./database.js";
import cors from "cors";
import bodyParser from "body-parser";
import bcryptjs from "bcryptjs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import path from "path";

const web = express();
web.use(cors());
web.use(express.json());
web.use(express.urlencoded({ extended: false }));
// web.use(bodyParser.urlencoded({extended:true, parameterLimit:100000000, limit:"15mb"}))
const PORT = process.env.PORT || 8000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename)

let wishlists = []
let image_id = [];

web.post("/downloadImage", async (req, res) => {
    try {
        const { imageId } = req.body;
        const images = await imageColl.findOne({ imageId: imageId });

        const bhk = images.imageKeys[0];
        const price = images.imageKeys[1];
        const address = images.imageKeys[2];

        const relatedImages = await imageColl.find({ $or: [{ imageKeys: { $all: [bhk] } }, { imageKeys: { $all: [price] } }, { imageKeys: { $all: [address] } }] })

        relatedImages !== null ? res.status(201).send(relatedImages) : res.status(201).send(null)

    } catch (error) {
        console.error(error)
    }
})
web.get("/downloadRecommended", async (req, res) => {
    try {
        const images = await recommImageColl.find({});

        images !== null ? res.status(201).send(images) : res.status(201).send(null)
    } catch (error) {
        console.log(error);
    }
})

web.post("/downloadDefaultImages", async (req, res) => {
    try {
        const { bhk, price, address } = req.body;

        const filteredInfo = await imageColl.find({ $or: [{ imageKeys: { $all: [bhk] } }, { imageKeys: { $all: [price] } }, { imageKeys: { $all: [address] } }] });

        filteredInfo !== null ? res.status(201).send(filteredInfo) : res.status(201).send(null);
    } catch (error) {
        console.error(error)
    }
})

web.post("/getFilteredData", async (req, res) => {
    try {
        const { bhk, price, address } = req.body;

        const filteredInfo = await imageColl.find({ imageKeys: [bhk, price, address] });

        res !== null ? res.status(201).send(filteredInfo) : res.status(201).send(null)
    } catch (error) {
        console.log(error)
    }
})

web.post("/signin", async (req, res) => {
    try {
        const { email, pass } = req.body;

        while (wishlists.length) {
            wishlists.pop();
            image_id.pop();
        }



        if (await userInfo.findOne({ userEmail: email }) === null) {

            const salt = await bcryptjs.genSalt(12);
            const hashPassword = await bcryptjs.hash(pass, salt);

            const userinfo = new userInfo({
                userEmail: email,
                password: hashPassword,
            })

            const userConfirm = await userinfo.save();
            userConfirm !== null ? res.status(201).send("saved") : res.status(201).send("not saved");

        } else {
            res.status(201).send("exist");
        }

    } catch (error) {
        console.log(error)
    }
})

web.post("/login", async (req, res) => {
    try {
        const { email, pass } = req.body;

        const user = await userInfo.findOne({ userEmail: email })

        while (wishlists.length) {
            wishlists.pop();
            image_id.pop();
        }
        if (user !== null) {

            const isPassCorrect = bcryptjs.compareSync(pass, user.password);
            
            if (isPassCorrect) {
                res.status(201).send("success")
            }else {
                res.status(201).send("wrongPass");
            }
            
        } else {
            res.status(201).send("usernotexist")
        }
    } catch (error) {
        console.error(error)
    }
})

web.get("/logout", async (req, res) => {
    res.clearCookie();
})

web.post("/addToWishList", async (req, res) => {
    try {
        const { userEmail, imageId } = req.body;

        const isUserLoggedIn = await userInfo.findOne({ userEmail: userEmail });

        const wishlist = await userInfo.findOne({ userEmail: userEmail, wishlists: { $all: [imageId] } });

        if (isUserLoggedIn !== null) {
            if (wishlist === null) {
                const wishlistupdated = await userInfo.updateOne({ userEmail: userEmail }, { $push: { wishlists: imageId } })
                wishlistupdated !== null ? res.status(201).send("itemadded") : res.status(201).send("itemnotadded");
            } else {
                res.status(201).send("itemalreadyadded")
            }
        } else {
            res.status(201).send("loginRequired");
        }

    } catch (error) {
        console.error(error)
    }
})

web.post("/getWishLists", async (req, res) => {
    try {
        const { email } = req.body;
        const showWishList = await userInfo.findOne({ userEmail: email });

        showWishList.wishlists.map(async (imageid) => {

            let temp = await imageColl.findOne({ imageId: imageid });

            if (!image_id.includes(imageid)) {
                wishlists.push(temp);
                image_id.push(imageid);
            }
        })

        showWishList !== null ? res.status(201).send(wishlists) : res.status(201).send(null)
    } catch (error) {
        console.error(error);
    }
})


async function uploadImage() {
    try {
        const img1 = new recommImageColl({
            imageId: 1,
            images: "",
            imageDesc: "This is a house and this is al...",
            price: "₹27,500",
            Address: "GA Plot - 12"
        })
        const img2 = new recommImageColl({
            imageId: 2,
            images: "",
            imageDesc: "This is a house and this is al...",
            price: "₹28,000",
            Address: "GA Plot-23"
        })
        const img3 = new recommImageColl({
            imageId: 3,
            images: "",
            imageDesc: "This is a house and this is al...",
            price: "₹21,500",
            Address: "LIC-98"
        })
        const img4 = new recommImageColl({
            imageId: 4,
            images: "",
            imageDesc: "This is a house and this is al...",
            price: "₹10,500",
            Address: "VIM-64"
        })
        const img5 = new recommImageColl({
            imageId: 5,
            images: "",
            imageDesc: "This is a house and this is al...",
            price: "₹27,500",
            Address: "Lane-2, Army C.."
        })
        const img6 = new recommImageColl({
            imageId: 6,
            images: "",
            imageDesc: "This is a house and this is al...",
            price: "₹7,500",
            Address: "S-2/23, Ni.."
        })

        recommImageColl.insertMany([img1, img2, img3, img4, img5, img6])
    } catch (err) {
        console.log(err)
    }
}

// uploadImage();
web.use(express.static(path.join(__dirname, "./clientside/dist")))
web.get("*", (req, res)=>{
    try {
        res.sendFile(path.join(__dirname, "./clientside/dist/index.html"))
    } catch (error) {
        console.error(`Clientside Source Couldn't be recovered ===>>> ${error}`)
    }
})

web.listen(PORT, () => console.log(`Server listening at port number ${PORT}`))