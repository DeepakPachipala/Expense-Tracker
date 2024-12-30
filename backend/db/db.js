const mongoose = require('mongoose');

const db = async () => {
    try {
        mongoose.set('strictQuery', false); // Optional, but you can leave it for compatibility
        // Ensure MONGO_URL is properly defined in environment variables
        if (!process.env.MONGO_URL) {
            throw new Error('MONGO_URL environment variable is not defined');
        }

        // Establish MongoDB connection
        await mongoose.connect(process.env.MONGO_URL, { 
            useNewUrlParser: true, 
            useUnifiedTopology: true,
        });

        console.log('DB Connected');
    } catch (error) {
        console.error('DB Connection Error:', error.message);
        // Optional: You can log more details or exit the process if needed
        process.exit(1);
    }
}

module.exports = { db };
