import mongoose from "mongoose"
import dotenv from "dotenv";
dotenv.config();
export const authDB = mongoose.createConnection(process.env.MONGO_URI_AUTH, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

authDB.on('error', console.error.bind(console, 'connection error:'));
authDB.once('open', () => {
    console.log('Connected to the auth database');
});
