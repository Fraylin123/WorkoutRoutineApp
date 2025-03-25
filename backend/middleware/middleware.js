const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({error: "Unauthorized"})
    
    jwt.verify(token, process.env.JWT_SECRET_KEY, (error, decoded) => {
        if (error) return res.status(403).json({error: "Invalid Token"});
        req.user = decoded;
        next();
    })
}