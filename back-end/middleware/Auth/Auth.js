import jwt from "jsonwebtoken";

const isAdmin = (req, res, next) => {
    const { role } = req.user; 
    
    if (role !== "admin") {
      return res.status(403).json({ success: false, message: "Access denied. Admins only." });
    }
    
    next();
  };
  
  const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
  
    if (!token) {
      return res.status(401).json({ success: false, message: "Authentication required" });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(403).json({ success: false, message: "Invalid token" });
    }
  };
  export {isAdmin,authMiddleware}