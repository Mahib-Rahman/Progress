import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import Product from "./models/product.js";

dotenv.config();

const app = express();

// app.get("/", (req, res) => {
//     res.send("server is ready now");
// });

app.use(express.json()); // allow us to accept json data in req.body

app.post("/api/products", async (req, res) => {
    const { name, price, image } = req.body; // user will send data in body

    if (!name || !price || !image) {
        return res
            .status(400)
            .json({ success: false, message: "All fields are required" });
    }

    const newProduct = new Product({ name, price, image });

    try {
        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
        console.error("server error: ", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
});

app.listen(5000, () => {
    connectDB();
    console.log("Server started at 5000");
});
