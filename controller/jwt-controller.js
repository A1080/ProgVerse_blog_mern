import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();
// commonly we have two arguments request and response but if we have middleware then we have also next
export const authenicateToken=(request,response,next)=>{
    const authHeader=request.headers['authorization'];
    // our token is concatenated with bearer, so we have to extract only token 
    const token=authHeader && authHeader.split(' ')[1];

    if(token==null){
        return response.status(401).json({msg:'Token is missing!'});
    }

    jwt.verify(token,process.env.ACCESS_SECRET_KEY,(error,user)=>{
        if(error){
            return response.status(403).json({msg:'Invalid token'});
        }
        // if successful then give the information of the user
        request.user=user;

        next();
    })
}