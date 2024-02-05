
const mongoose = require('mongoose');
require('dotenv').config();

const dbConfig={
    host:process.env.MONGO_CONN,
}
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
