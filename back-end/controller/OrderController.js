import orderModel from "../models/OrderModel.js";
import userModel from "../models/UserModel.js";
import { Stripe } from "stripe";

const stripe = new Stripe("sk_test_51PuWOiABBWQuZhagLIxYbhHu1sWebSl4SlINGPZeRvZAWpFRrpML7qwXyyY7tt9DiLhAznU37pYWYOUS7CXgn26D00zK06b2Vj"
);
// const key = process.env.SRIPE_SECRET_KEY;
// const stripe = new Stripe(key);
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
//verify order
const verifyOrder = async(req,res)=>{
    const {orderId,success} = req.body;
    try {
        if(success === "true"){
            await orderModel.findByIdAndUpdate(orderId,{payment:true});
            res.json({success:true,message:"Paid"})
        }else{
            await orderModel.findByIdAndDelete(orderId);
            res.json({success:false,message:"Not paid"})
        }
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
        
    }
}
//user order front end

const userOrders = async(req,res) =>{
    try {
        const orders = await orderModel.find({userId:req.body.userId});
        res.json({success:true,data:orders});
    } catch (error) {
        res.json({success:false,message:"Error"});
        console.log(error);
        
    }
}
// all orders
const listOrders = async(req,res) =>{
    try {
        const orders = await orderModel.find({});
        res.json({success:true, data:orders})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"})
    }
}
// change status orders
const updateStatus = async (req, res) => {
    try {
        // Fetch the order by ID
        const order = await orderModel.findById(req.body.orderId);

        // Check if the order exists
        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found',
            });
        }

        if (order.status === 'Delivered') {
            return res.status(400).json({
                success: false,
                message: 'Order status cannot be changed once it is Delivering or Delivered',
            });
        }

        // Update the status if the above conditions are not met
        order.status = req.body.status;
        await order.save();

        res.json({
            success: true,
            message: 'Status updated successfully',
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error updating order status',
        });
    }
};

export { placeOrder, userOrders, verifyOrder,listOrders, updateStatus };
