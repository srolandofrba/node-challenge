import express from 'express'
import dotenv from 'dotenv'
import { connectDb } from './utils/connect.js'
import app from './app.js'


const PORT = process.env.PORT



async function main() {
    await connectDb()
    app.listen(PORT, () => {
        console.log(`Servidor funcionando en puerto ${PORT}`)
    })    
}

main()
