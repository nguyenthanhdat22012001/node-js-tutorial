const jwt = require('jsonwebtoken');

const verifyToken = (req,res,next) => {
    const authHeader = req.header('Authorization');
    const token = authHeader ?  authHeader.split(" ")[1] : "";

    if(!token)
        return res
            .status(401)
            .json({message: 'Access token not found'});

    try {
        const decode = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);

        req.body.user = decode.user;
        next();

    } catch (error) {
        console.log(error);
        console.log(token);
        return res
            .status(403)
            .json({success:false, message: "Invalid token"});
    }
}

const verifyRefeshToken = (req,res,next) => {
    const { refreshToken } = req.body;

    if(!refreshToken)
        return res
            .status(401)
            .json({message: 'refresh token not found'});

    try {
         jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET,(err,data)=>{
            console.log(err,data);

            if(err) return res.status(403).json({message: 'refresh token Invalid'});
            
            req.body.user = data.user;
            next();
        });

    } catch (error) {
        console.log(error);
        console.log(token);
        return res
            .status(403)
            .json({success:false, message: "Invalid token"});
    }
}

module.exports = {verifyToken,verifyRefeshToken};