import Product from "../models/product_model.js";

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({}); // passing empty object to get all products
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        console.error("server error: ", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};

export const createProduct = async (req, res) => {
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
};

export const changeProduct = async (req, res) => {
    const { name, price, image } = req.body;
    const { id } = req.params;

    if (!name || !price || !image) {
        return res
            .status(400)
            .json({ success: false, message: "All fields are required" });
    }

    try {
        const product = await Product.findById(id);
        //const updated_product = await Product.findByIdAndUpdate(id, { name, price, image }, { new: true });

        if (!product) {
            return res
                .status(404)
                .json({ success: false, message: "Product not found" });
        }

        product.name = name;
        product.price = price;
        product.image = image;

        await product.save();
        res.status(200).json({ success: true, data: product });
    } catch (error) {
        console.error("server error: ", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};

export const updateProduct = async (req, res) => {
    const product = req.body;
    const { id } = req.params;

    const findProduct = await Product.findById(id);
    if (!findProduct) {
        return res
            .status(404)
            .json({ success: false, message: "Product not found" });
    }

    try {
        const updated_product = await Product.findByIdAndUpdate(id, product, {
            new: true,
        });
        res.status(200).json({ success: true, data: updated_product });
    } catch (error) {
        console.error("server error: ", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};

export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    const findProduct = await Product.findById(id);
    if (!findProduct) {
        return res
            .status(404)
            .json({ success: false, message: "Product not found" });
    }
    //console.log("id : ", id);
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: "Product deleted successfully",
        });
    } catch (error) {
        console.error("server error: ", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};
