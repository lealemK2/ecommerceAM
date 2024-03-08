import express from "express";
import expressAsyncErrors from "express-async-errors"; 
import { mysqlPool as db } from "./db.mjs";
import { router as productRoutes } from "./controllers/product.controller.mjs";
import bodyParser from "body-parser";
import cors from "cors";

const app=express();

app.use(bodyParser.json());
app.use(cors());
app.use('/api/products',productRoutes);
app.use((err,req,res,next)=>{
    console.log(err);
    res.status(err.status || 500).send("something went wrong!");
})

db.query("select 1") 
.then(() => {
    console.log("db connection succeeded.")
    app.listen(8800,()=>{
        console.log("connected");
    })
} )
.catch(err=> console.log("db connection failed.\n" + err));
