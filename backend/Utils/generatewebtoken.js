import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config({ path: '../.env'});


const generatewebtoken = (userid, res) => {
    const secretKey = process.env.JWT_SECRET_KEY;  

    if (!secretKey) {
        throw new Error("JWT_SECRET_KEY is not defined in .env");
    }
    const token = jwt.sign(
        {userid},     
        secretKey,            
        { expiresIn: '15d' }   
      );
        
      res.cookie("jwt",token,{
        maxAge: 15 *24 *60 *60 *1000,
        httpOnly:true,
        sameSite:"strict",
      });

      return token;
};

export default generatewebtoken

