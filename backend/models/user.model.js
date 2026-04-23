import mongoose from "mongoose";

const userschema= new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique:true,
    },
    email:{
        type: String,
        required: true,
        unique:true,
    },
    password:{
        type: String,
        required: true,
        minlength: 6,
    },
    ConfirmPassword:{
        type: String,
    },
    gender:{
        type: String,
        required: true,
        enum:["Male","Female"],
    },
},{timestamps:true});

const User= mongoose.model("User",userschema);

export default User;