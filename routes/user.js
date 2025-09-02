
const express = require("express");
const router = express.Router();
const User = require("../models/user"); 

const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

router.post('/register',async(req,res)=>{
  data=req.body
  usr=new User(data)
  salt=bcrypt.genSaltSync(10);
  cryptedPass= await bcrypt.hashSync(data.password,salt)
  usr.password=cryptedPass
  usr.save()
    .then(
      (saved)=>{
        res.status(200).send(saved) 
      }
    )
    .catch(
      (error)=>{
        res.status(400).send(error)
      }
    )
})
router.post('/login',async(req,res)=>{
  data=req.body
  usr=await User.findOne({email: data.email})

  if(!usr){
    res.status(404).send('email or pass not valid');
  }else{
    validPass=bcrypt.compareSync(data.password,usr.password);
    if(!validPass){
      res.status(401).send('email or password invalid');
    }
    else{
      payload={
        _id:usr._id,
        mail:usr.email,
        name:usr.name

      }
      token=jwt.sign(payload,'123456')

      res.status(200).send({mytoken:token})
    }
  }
}

)
router.post("/add", async (req, res) => {
  try {
    const product = new User(req.body);
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
