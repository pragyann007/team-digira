import jwt from "jsonwebtoken";

export const isAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    

    if (!token) {
      return res.status(403).json({ message: "Forbidden: Unauthorized" });
    }

 
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    console.log(decodedToken)

    
    req.user = decodedToken;

    next(); 
    
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
