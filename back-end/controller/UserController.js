import userModel from "../models/UserModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"

//login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User doesn't exist" });
    }

    // Check if password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    // Create a JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    // Send success response with the token
    return res.json({ success: true, token, message: "Login successful!" });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ success: false, message: "Server error", error: error.message || error });
  }
};


//register user
const registerUser = async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
      const exists = await userModel.findOne({ email });
      if (exists) {
        return res.json({ success: false, message: "User already exists!" });
      }
  
      // Validate email
      if (!validator.isEmail(email)) {
        return res.json({ success: false, message: "Email not valid!" });
      }
  
      // Validate password using regex
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordRegex.test(password)) {
        return res.json({
          success: false,
          message: "Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character.",
        });
      }
  
      // Hash the password and save the user with the role
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new userModel({ name, email, password: hashedPassword, role: role || "user" });
      await newUser.save();
  
      // Create a JWT token
      const token = jwt.sign({ userId: newUser._id, role: newUser.role }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
  
      return res.json({ success: true, token, message: "User registered successfully!" });
    } catch (error) {
      console.error("Error during registration:", error); 
      return res.status(500).json({ success: false, message: "Server error", error: error.message || error });
    }
  };
  

export {loginUser,registerUser}