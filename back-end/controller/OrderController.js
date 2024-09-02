import orderModel from "../models/OrderModel.js";
import userModel from "../models/UserModel.js";
import { Stripe } from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const placeOrder = async (req, res) => {
    const url = "http://localhost:5173";
    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
        });
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "vnd",
                product_data: {
                    name: item.name,
                },
                unit_amount: item.price * 25000,
            },
            quantity: item.quantity,
        }));

        // Adding delivery charges
        line_items.push({
            price_data: {
                currency: "vnd",
                product_data: {
                    name: "Delivery Charges",
                },
                unit_amount: 2 * 25000,
            },
            quantity: 1,
        });

        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: 'payment',
            success_url: `${url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${url}/verify?success=false&orderId=${newOrder._id}`,
        });

        res.json({ success: true, session_url: session.url });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Error processing order" });
    }
};

export { placeOrder };
