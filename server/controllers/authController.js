const jwt = require("jsonwebtoken");

exports.protect = async (req, res, next) => {
    let token;
    
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(" ")[1];
    }

    console.log(token); 
    
    if (!token) {
        return res.status(401).json({ error: "Not authorized to access this route" });
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // if decoded is good then we can respond with a positive status

        if(decoded) {
            res.status(200).json("User is authorized");
        }

        next();

    } catch (error) {
        return res.status(401).json({ error: "Not authorized to access this route" });
    }
}