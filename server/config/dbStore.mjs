import mongoose from "mongoose"
import dotenv from "dotenv";
dotenv.config();

export const storeDB = mongoose.createConnection(process.env.MONGO_URI_STORE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

storeDB.on('error', console.error.bind(console, 'connection error:'));
storeDB.once('open', () => {
    console.log('Connected to the content database');
});
