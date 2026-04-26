import bcrypt from 'bcryptjs'
import User from "../models/user.model.js";
import generatewebtoken from "../Utils/generatewebtoken.js";


export const signup = async (req, res) => {
    try {
        const { name, email, password} = req.body;

        const user = await User.findOne({ email });
        console.log(user);
        if (user) {
            return res.status(400).json({ error: "User already exists" });
        }

       
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        
        const newUser = new User({
            name,
            email,
            password: hashPassword,
        });

        console.log(newUser);
        await newUser.save();
        const token = generatewebtoken(newUser._id, res);
        
        
        return res.status(201).json({
            name: newUser.name,
            email: newUser.email,
            token,
        });
    } catch (error) {
        console.error("Signup error:", error);
        return res.status(500).json({ error: "Server error during signup" });
    }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

const isMatch = await bcrypt.compare(password, user.password);

if (!isMatch) {
  return res.status(401).json({ message: "Invalid credentials" });
}

    return res.status(200).json({
      message: "Login successful",
    });

  } catch (error) {
    return res.status(500).json({
      message: "Server error",
    });
  }
};
export const logout = (req, res) => {
    try {
        res.clearCookie("jwt", {
            httpOnly: true,
            sameSite: "strict",
        });
        return res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        console.error("Logout Error:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

