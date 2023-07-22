import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from "../model/user.js";
import dotenv from 'dotenv';
import token from '../model/token.js';

dotenv.config();
// request are the object which contain info from the frontend
// response ->backend to frontend
// export const signupUser= (request,response)=>{
export const signupUser= async (request,response)=>{
    try{
        // generating salt for password
        // is using the async put await 
        const salt=await bcrypt.genSalt();
        const hashedPassword=await bcrypt.hash(request.body.password,salt);
        // const salt=bcrypt.genSalt();
        // const hashedPassword=bcrypt.hash(request.body.password,salt);


        // const user=request.body;
        // after hashing value of user parameters changes
        const user={username:request.body.username,name:request.body.name,password:hashedPassword}
        // validation of the user
        const newUser=new User(user);
        await newUser.save(); // it is an async request so we have to add await
        //  newUser.save(); // it is an async request so we have to add await
        return response.status(200).json({msg:'SignUp Successful!'})
    }
    catch(error){
        return response.status(500).json({msg:'Error while signup the user'})

    }
}

// ----
export const loginUser=async (request,response)=>{
    // in user object comes bcoz findOne returns the object
    let user=await User.findOne({username:request.body.username});
    if(!user){
        return response.status(400).json({msg:'Username not exist!'})
    }

    // if userr present ,check for the password
    try {
        let match=await bcrypt.compare(request.body.password,user.password);
        if(match){
            const accessToken=jwt.sign(user.toJSON(),process.env.ACCESS_SECRET_KEY,{expiresIn:'15m'});
            const refreshToken=jwt.sign(user.toJSON(),process.env.REFRESH_SECRET_KEY);

            const newToken=new token({token:refreshToken})
            await newToken.save();

            return response.status(200).json({accessToken:accessToken,refreshToken:refreshToken,name:user.name,username:user.username})
        }
        else{
            return response.status(400).json({msg:'Password does not match'});
        }
    } catch (error) {
        return response.status(500).json({msg:'Error while login!'})
    }
}