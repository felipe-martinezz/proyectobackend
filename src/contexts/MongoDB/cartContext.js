import mongoose from "mongoose";
import cartModel from "../../models/cartModel.js";

//String de conexion
const connection = mongoose.connect(
    "mongodb+srv://enzo:coder123@clustercoderback.a4dyco9.mongodb.net/?retryWrites=true&w=majority",
    (error) => {
      if (error) console.log(error);
      else console.log("base conectada");
    }
);

class contenedor{

    //Traer los carritos
    getCarts = async() =>{

    }
}