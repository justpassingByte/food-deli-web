import jwt from "jsonwebtoken";

const isAdmin = (req, res, next) => {
    const { role } = req.user; 
    
    if (role !== "admin") {
      return res.status(403).json({ success: false, message: "Access denied. Admins only." });
    }
    
    next();
  };
  
  const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
  
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: "Authentication required" });
    }
  
    const token = authHeader.split(' ')[1]; // Lấy token từ chuỗi 'Bearer <token>'
  
    if (!token) {
      return res.status(401).json({ success: false, message: "Authentication required" });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.body.userId = decoded.userId;
  
      next();
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return res.status(403).json({ success: false, message: "Token expired, please refresh your token" });
      }
      console.log(error); // Log lỗi để debug
      return res.status(403).json({ success: false, message: "Invalid token" });
     
    }
  };
  
  export {isAdmin,authMiddleware}