const express=require('express');
const mongoose=require('mongoose');
const cookieparser=require("cookie-parser")
const cors = require("cors");
require("dotenv").config();
const router=require('./routes/user-routes.js')
const app=express();
app.use(cors({credentials: true, origin: process.env.PORT ||"http://localhost:3000"}));
app.use(express.json())
app.use(cookieparser())
app.use('/api',router)
mongoose.connect(`mongodb+srv://user:${process.env.PASSWORD}@cluster0.bswglw8.mongodb.net/mern-auth?retryWrites=true&w=majority`).then(()=>{
    app.listen(process.env.PORT || 5000);
    console.log("database is connected")
})
.catch((err)=>{
    console.log(err)
})
app.get("/",(req,res)=>{
    res.json("server started")
})
