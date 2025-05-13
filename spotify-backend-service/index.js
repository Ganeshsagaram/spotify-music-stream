import express from "express";
import bodyParser from "body-parser";
import dotenv from 'dotenv';
import cors from "cors";
dotenv.config();
import { Usersapi } from "./users.js";
import {authorizeApi} from "./login.js"


const app=express();
app.use(bodyParser.json());
app.use(cors()) ;
app.use(bodyParser.urlencoded({ extended: true }))
const PORT=process.env.PORT||9669;
app.use("/",Usersapi);
app.use("/",authorizeApi);
app.get("/hi",(req,res)=>{
  res.send("Hi");
})



app.listen(PORT, () => {
    console.log(`app started at ${PORT}`)
});