const mongoose = require('mongoose')
const { findOne } = require('../Model/User');
const userModel = require('../Model/User');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const signUp = async (req, res) => {
    const { fullName, email, password } = req.body;
    try {
        if (!fullName) {
            throw new Error('Full Name is required');
        }
        if (!email) {
            throw new Error('Email is required');
        }
        if (!password) {
            throw new Error('Password is required');
        }


        const existingUser = await userModel.findOne({email});

        if (existingUser) {
            throw new Error('User with Email already exists');
        }
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password,salt)
        
        const newUser = await userModel.create({
            fullName,
            email,
            password:hashedPassword
        });
        return res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        return res.status(500).json({
            error: error.message || 'Server error occurred'
        });
    }
};

// Login

const login = async(req, res)=>{
    const {email, password} = req.body
     
    try {
        const user = await userModel.findOne({email})
        if(!user){
            throw new Error ('User Not Found')
        }
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if(!isPasswordValid){
            return res.status(401).json({
                error: "password does not match"
            })
        }
        // id: user id from signup and the next is the secret key. it is advisable you have it in your env file
        const token = jwt.sign({id:user._id}, 'asdfghthewdsa', {
            expiresIn:'1h'
        })
        res.json({message:"Login Successfull", token})
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error:'server error'
        })
    }
}

// Log Out

const logout = async(req, res)=>{
    res.cookie('token', '').json('log out succesful')
}


module.exports = {
    signUp,
    login,
    logout
}