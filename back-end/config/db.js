import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://nhockuteg2003:0398028203Aa@cluster0.6xkry.mongodb.net/food-del', {
        });
        console.log("DB connected");
    } catch (error) {
        console.error("DB connection error:", error);
    }
};
