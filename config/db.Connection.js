import mongoose from "mongoose";

const connectDb = async () =>{
  try {
    const conn = await mongoose.connect(`${process.env.MONGO_URL}/portfolio_1`)    
    conn.connection.host;
    console.log(`connection successfully`)
  } catch (error) {
    console.log(`mongoose connection err: ${error}`)
  }
}

export default connectDb;
