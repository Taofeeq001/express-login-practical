const mongoose = require('mongoose')

MongoURI = 'mongodb+srv://kolapo:lesson2023@lesson.jrzb2z2.mongodb.net/?retryWrites=true&w=majority'

const connectDB = async()=>{
    return await mongoose.connect(MongoURI)
}

module.exports = connectDB