const mongoose = require('mongoose');

const connectDb = async () => {
    try{
        const connect = await mongoose.connect(process.env.CONNECTION_STRING);
        console.log(`Successfully connected with ${connect.connection.name} 🔥`);
    }catch(err){
        console.log(`Error: ${err.message}`);
        process.exit(1);
    }
}

module.exports = connectDb;