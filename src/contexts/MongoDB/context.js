import mongoose from "mongoose";
import productModel from "../../models/productsModel.js";

//String de conexion
const connection = mongoose.connect(
  "mongodb+srv://enzo:coder123@clustercoderback.a4dyco9.mongodb.net/?retryWrites=true&w=majority",
  (error) => {
    if (error) console.log(error);
    else console.log("base conectada");
  }
);

class contenedor {
  //Traer todos los productos
  getAll = async () => {
    try {
      let info = await productModel.find().lean();
      return info;
    } catch (error) {
      console.log({ status: 500, error: error });
    }
  };

  //Agregar productos
  save = async ({ title, price, thumbnail, stock }) => {
    try {
      console.log({ title, price, thumbnail, stock });
      try {
        let newInsert = new productModel({ title, price, thumbnail, stock });
        await productModel.insertMany(newInsert);
        return newInsert;
      } catch (error) {
        console.log(error);
      }
      return `producto agregado con exito. ${{
        title,
        price,
        thumbnail,
        stock,
      }} `;
    } catch (error) {
      console.log(error);
    }
  };

  //Traer por id
  getById = async (id) => {
    try {
      const product = await productModel.find({ _id: id.toString() });
      return product;
    } catch (error) {
      console.log(error);
    }
  };

  //Borrar por id
  deleteById = async (id) => {
    try {
      await productModel.deleteOne({ _id: id.toString() });
    } catch (error) {
      console.log(error);
    }
  };

  //Actualizar por id
  update = async ({ id, updateProd }) => {
    try {
      let actualizedProduct = await productModel.findByIdAndUpdate({ _id: id }, { $set: updateProd });
      return actualizedProduct;
    } catch (error) {
      console.log(`error al actualizar el producto ${id}`);
    }
  };
}

export default contenedor;