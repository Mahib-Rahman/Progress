import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

import product_routes from "./routes/product_routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // allow us to accept json data in req.body

app.use("/api/products", product_routes);
// all of our requests will go to /api/products (that will be the prefix)
// and then it will go to product_routes so we don't have to write /api/products in product_routes
// we can just write / and it will work

app.listen(PORT, () => {
    connectDB();
    console.log("Server started at http://localhost:", PORT);
});
//Try from idx
