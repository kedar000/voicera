const mongoose = require('mongoose');

 async function connectDB(){
    try {
        const connection = await mongoose.connect('mongodb://localhost:27017/restaurantdb');
        console.log("connected to DB ...")
    } catch (error) {
        console.log("error in connnecting to database " , error)
    }
}

module.exports={
    connectDB
}