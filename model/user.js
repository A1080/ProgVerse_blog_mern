import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    username:{
    // Username:{
        // type:String,
        // required:true,
        // unique:true
        type: String,
        unique: true,
        validate: {
          validator: function (value) {
            return value !== undefined;  // Add custom validation logic here
          },
          message: 'Username is required.',
        },
    },
    password:{
        type:String,
        required:true
    }
})

// in which collection/database we want to apply this schema
const user=mongoose.model('user',userSchema);

export default user; 