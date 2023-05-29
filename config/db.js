const mongoose = require('mongoose')

module.exports = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/myiptp9',{
            autoIndex: true,
            serverSelectionTimeoutMS: 30000
        })
        console.log("MongoDB connected successfully");
    } catch (err) {
        console.log("Mongoose: ",err);
    }
} 