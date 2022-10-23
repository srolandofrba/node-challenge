import mongoose from 'mongoose'
import dotenv from 'dotenv';

dotenv.config();

const MONGOBD_URI = process.env.MONGODB_URI


export async function connectDb () {
  try {
    await mongoose.connect(MONGOBD_URI)
    console.log("Conexión con base de datos realizada")
  } catch (error) {
    console.log(error)
  }
}

