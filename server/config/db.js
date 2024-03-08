import mongoose from "mongoose";
import color from "colors";

const dbConnect = async () => {
    try {
        mongoose.connect(process.env.MONGO_URL);
        console.log(`Database is connected`.bgMagenta.white);
    }
    catch (err) {
        console.log(`Database connection error: ${err.message}`.bgRed.white);
    }
}

export default dbConnect