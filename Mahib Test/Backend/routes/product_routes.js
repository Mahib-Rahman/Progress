import express from "express";

import {
    getProducts,
    createProduct,
    changeProduct,
    updateProduct,
    deleteProduct,
} from "../controllers/product_controllers.js";

const router = express.Router();

router.get("/", getProducts);
router.post("/", createProduct);
// use put to update all fields of a product
// use patch to update some fields of a product
router.put("/:id", changeProduct);
router.patch("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
