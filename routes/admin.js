const express = require("express");
const adminRouter = express.Router();
const admin_middleware = require("../middleware/admin_middleware.");
const {Product} = require("../models/product");

// ADDING PRODUCT
adminRouter.post("/admin/add-product", admin_middleware, async (req, res) =>{
try{
    const { name, description, images, quantity, price, category } = req.body;
    let product = new Product({
        name,
        description,
        images,
        quantity,
        price,
        category,
    });
    product = await product.save();
    res.json(product);
}catch(e){
    res.status(500).json({error: e.message});
}
});

// GET ALL PRODUCTS
adminRouter.get("/admin/get-products", admin_middleware, async (req, res) => {
try{
    const products = await Product.find({});
    res.json(products);

}catch(e){
    res.status(500).json({error: e.message});
}
});

// DELETE PRODUCT 

adminRouter.post("/admin/delete-product", admin_middleware, async (req,res) =>{
try{
    const {id} = req.body;
    let product = await Product.findByIdAndDelete(id);
    res.json(product);
}catch(e){
res.status(500).json({error: e.message});
}
});

module.exports = adminRouter;