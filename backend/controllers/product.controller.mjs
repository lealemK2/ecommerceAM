import express, { json } from "express";
import { getAllProducts, getProductById, deleteProduct, addOrUpdate} from "../services/product.service.mjs";

const router=express.Router();

router.get('/',async (req,res)=>{
    const products= await getAllProducts()
    res.send(products)
})

router.get('/:id',async (req,res)=>{
    const product= await getProductById(req.params.id);
    if(product==undefined)
        res.status(404).json('no record with given id: ' + req.params.id);
    res.send(product);
})

router.delete('/:id',async (req,res)=>{
    const affectedRows= await deleteProduct(req.params.id);
    if(affectedRows==0)
        res.status(404).json("no record with the given id: "+req.params.id)
    else
        res.send("deleted succefully");
})

router.post('/',async (req,res)=>{
    await addOrUpdate(req.body);
    res.status(201).json("created successfully")
})

router.put('/:id',async (req,res)=>{
    const affectedRows= await addOrUpdate(req.body,req.params.id);
    if(affectedRows==0)
        res.status(404).json("no record with the given id: "+req.params.id)
    else
        res.send("updated succefully");
})

export { router };