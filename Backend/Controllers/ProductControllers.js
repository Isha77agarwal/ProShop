import Products from '../models/productModel.js'
import asyncHandler from "express-async-handler";

//@desc Fetch all products
//@route GET /api/products
//@access PUBLIC
const getProducts = asyncHandler(async(req, res) => {
    const products = await Products.find({})
    res.json(products)
})


//@desc Fetch single product
//@route GET /api/products/:id
//@access PUBLIC
const getProductsById = asyncHandler(async(req, res) => {
    const product = await Products.findById(req.params.id)
    if(product)
        res.json(product)
    else {
        res.status(404)
        throw new Error("Product Not Found")
    }
})

export {getProducts, getProductsById}