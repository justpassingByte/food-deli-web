import userModel from '../models/UserModel.js'

const addToCart = async (req, res) => {
    try {
        const { itemId } = req.body;
        const userId = req.body.userId;

        if (!itemId) {
            return res.status(400).json({ success: false, message: "itemId is required" });
        }

        console.log("Request itemId:", itemId);
        console.log("Request userId:", userId);

        // Find the user by ID
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        console.log("User before update:", user);

        // Initialize cartData if not present
        let cartData = await user.cartData || {};
        console.log("CartData before update:", cartData);

        cartData[itemId] = (cartData[itemId] || 0) + 1;
        
        // Update the user's cartData
        await userModel.findByIdAndUpdate(userId,{cartData});
        // Fetch updated user data and log
        const updatedUser = await userModel.findById(userId);
        console.log("Updated user:", updatedUser);

        res.json({ success: true, message: "Added to Cart" });
    } catch (error) {
        console.error("Error adding to cart:", error);
        res.status(500).json({ success: false, message: "Error adding to cart" });
    }
};


const removeFromCart = async(req,res) =>{
    try {
        const { itemId } = req.body;
        const userId = req.body.userId;

        if (!itemId) {
            return res.status(400).json({ success: false, message: "itemId is required" });
        }

        console.log("Request itemId:", itemId);
        console.log("Request userId:", userId);

        // Find the user by ID
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        console.log("User before update:", user);

        // Initialize cartData if not present
        let cartData = await user.cartData || {};
        console.log("CartData before update:", cartData);

        cartData[itemId] = cartData[itemId] - 1;
        
        // Update the user's cartData
        await userModel.findByIdAndUpdate(userId,{cartData});
        // Fetch updated user data and log
        const updatedUser = await userModel.findById(userId);
        console.log("Updated user:", updatedUser);

        res.json({ success: true, message: "Removed from Cart" });
    } catch (error) {
        console.error("Error adding to cart:", error);
        res.status(500).json({ success: false, message: "Error adding to cart" });
    }
}
const getCart = async(req,res) =>{
    try {
    
        const userId = req.body.userId;
        console.log("Request userId:", userId);

        // Find the user by ID
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        console.log("User before update:", user);

        // Initialize cartData if not present
        let cartData = await user.cartData || {};
        console.log("CartData :", cartData);

        res.json({ success: true, data:cartData, message: "Get Cart" });
    } catch (error) {
        console.error("Error adding to cart:", error);
        res.status(500).json({ success: false, message: "Error adding to cart" });
    }
    
}
export {addToCart, removeFromCart, getCart}