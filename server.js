const express = require('express');

const userRoutes = require("./routes/user");
const productRoutes = require("./routes/product");
require('./config/connect');


const app=express();
app.use(express.json());


app.use("/product", productRoutes);
app.use("/user", userRoutes);
app.listen(3000,()=>{
    console.log('server work');
})