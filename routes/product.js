const express = require("express");
const productRoute = express.Router();
const auth_middleware = require("../middleware/auth_middleware");
const  { Product }  = require("../models/product");

// GETTING PRODUCT BY CATEGORY

productRoute.get("/api/products/", auth_middleware, async (req, res) => {
try{
    const products = await Product.find({ category: req.query.category});
    res.json(products);

}catch(e){
    res.status(500).json({ error: e.message });
}

});


// GETTING PRODUCT THROUGHT SEARCH BAR

productRoute.get("/api/products/search/:name", auth_middleware ,async(req, res) =>{
try{
    const products = await Product.find({
        name: {$regex: req.params.name, $options: "i"},
    });
    res.json(products);

}catch(e){
    res.status(500).json({error: e.message});
}
});

// POST REQUEST FOR RATINGS SELECTION

productRoute.post("/api/rate-product", auth_middleware, async(req, res) =>{
    try{
        const { id, rating } =req.body;
        let product = await Product.findById(id);

        for(let i = 0; i < product.ratings.length; i++){
            if (product.ratings[i].userId == req.user){
                product.ratings.splice(i, 1);
                break;
            }
        }

        const ratingSchema ={
            userId: req.user,
            rating,
        };

        product.ratings.push(ratingSchema);
        product = await product.save();
        res.json(product);

    }catch(e){
        res.status(500).json({error: e.message});
    }
});

// GET REQUEST FOR DEAL OF THE DAY

productRoute.get("/api/deal-of-the-day", auth_middleware, async(req, res) => {
    try{
        let products = await Product.find({});
        products = products.sort((a,b) => {
            let aSum = 0;
            let bSum = 0;

            for (let i = 0; i <a.ratings.length; i++){
                aSum += a.ratings[i].rating;
            }

            for (let i = 0; i < b.ratings.length; i++){
                bSum += b.ratings[i].rating;
            }
            return aSum < bSum ? 1 : -1;
        });
        res.json(products[0]);

    }catch(e){
        res.status(500).json({error: e.message});
    }

});



module.exports = productRoute;