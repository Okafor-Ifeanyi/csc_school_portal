import mongoose from 'mongoose'
import {} from 'dotenv/config'
import { MESSAGES } from './constants.config.js'


export async function connect (db) {
    // Database Connection 
    await mongoose.connect(db, {
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        family: 4
    })
    .then(() => {
        console.log(MESSAGES.DATABASE.CONNECTED)
    })
    .catch((err) => {
        console.log(MESSAGES.DATABASE.ERROR)
    })
}