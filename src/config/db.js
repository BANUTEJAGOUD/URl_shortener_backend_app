
const mongoose = require('mongoose');
require('dotenv').config();

const dbConfig={
    host:process.env.MONGO_CONN,
}
<<<<<<< HEAD
const connectToDatabase = async () => {
    try {
        const connection = await mongoose.connect(dbConfig.host)
        console.log('Connected to MongoDB');
        return connection;
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};

module.exports = connectToDatabase;
=======

let conn=async()=>{
   try{
    await mongoose.connect(dbConfig.host);
   }catch(error){
    console.log(error);
    process.exit(1);
   }
}


module.exports=conn;
>>>>>>> a9b00b63fc056d1b0ae649ad3ffd3f72b9987b4f
