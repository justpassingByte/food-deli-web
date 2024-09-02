import express from "express"
import { addToCart, getCart, removeFromCart } from "../controller/CartController.js";

const cartRouter = express.Router();
cartRouter.post("/add", addToCart)
cartRouter.post("/remove",removeFromCart)
cartRouter.post("/get",getCart)

export default cartRouter