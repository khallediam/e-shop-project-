
const express = require("express");
const router = express.Router();
const Product = require("../models/product"); 
const multer=require('multer')
filename=''

const mstorage=multer.diskStorage({
  destination: './assets',
  filename:(req,file,redirect)=>  {
    let date=Date.now()
    let fl=date +'.'+ file.mimetype.split('/')[1]
    redirect(null,fl)
    filename=fl;
  } 
})
const asset=multer({storage:mstorage})


router.post("/add",asset.any('image'), async (req, res) => {
  try {
    const product = new Product(req.body);
    product.image=filename;
    const save = await product.save();
    res.status(201).json(save);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/get", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.get("/getbyid/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } 
    );
    if (!updatedProduct) return res.status(404).json({ message: "Product not found" });
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


router.delete("/delete/:id", async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
