import express from "express"
import cors from"cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./models/FoodRouter.js"

//app config
const app = express()
const port = 4000

//middleware
app.use(express.json())
app.use(cors())
//db connect
connectDB();

// api end points

app.use("/api/food",foodRouter)
app.use("/images",express.static('uploads'))


app.get("/", (req,res) =>{
    res.send("API working")
}) 
app.listen(port, ()=>{
    console.log(`Server started on htpp://localhost:${port}`)
})

//mongodb+srv://nhockuteg2003:0398028203Aa@cluster0.6xkry.mongodb.net/?