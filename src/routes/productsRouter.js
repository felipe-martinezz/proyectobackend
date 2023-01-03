import { Router } from "express";
import context from "../contexts/context.js"
import __dirname from "../utils.js"

let router = new Router();
let contenedor = new context(__dirname + "/files/productos.json")

//Traer todos los productos
router.get("/",async(req,res,next)=>{
    try {
        let productos = await contenedor.getAll();
        res.send(productos);
    } catch (error) {
        console.log(error);
    }
});

//Traer un producto por su id
router.get("/:id", async(req,res,next)=>{
    try {
        let idFilter = req.params.id
        let productoFilter = await contenedor.getById(idFilter);
        res.send(productoFilter);
    } catch (error) {
        console.log(error);
    }
});

//Agregar un producto
router.post("/", async(req,res,next)=>{
    try {
        let {title,price,thumbnail,stock} = req.body
        if(!title||!price||!thumbnail||!stock){
            console.log("Faltan valores");
        }else{
            let newProduct = {
                title,
                price,
                thumbnail,
                stock
            };
            await contenedor.save(newProduct);
            console.log(`${newProduct.id}`);
            res.redirect('/products')
        }
    } catch (error) {
        console.log(error);
    }
});

//Actualizar un producto
router.put("/:id", async(req,res,next)=>{
    try {
        let id = req.params.id;
        let {title,price,thumbnail} = req.body
        if(!title || !price || !thumbnail){
            res.send("Faltan datos")
        }else{
            let updateProduct ={
                id,
                title,
                price,
                thumbnail
            };
            await contenedor.update(updateProduct)
            res.send(`Se actualizo el producto ${updateProduct.title}`)
        }
    } catch (error) {
        console.log(error)
    }
});

//Borrar un producto
router.delete("/:id", async(req,res,next)=>{
    try {
        let id = req.params.id;
        await contenedor.deleteById(id);
        console.log("Producto borrado con exito")
        res.send(`Producto con el Id ${id} fue borrado con exito`)
    } catch (error) {
        console.log(error)
    }
})

export default router