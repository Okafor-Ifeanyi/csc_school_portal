import mongoose from 'mongoose'
import {} from 'dotenv/config'
import { MESSAGES, DATABASE_URI } from './constants.config.js'

// export async function connect (DATABASE_URI) {
//     // Database Connection 
//     await mongoose.connect(DATABASE_URI, {
//         useNewUrlParser: true, 
//         useUnifiedTopology: true,
//         family: 4
//     })
//     .then(() => {
//         console.log(MESSAGES.DATABASE.CONNECTED)
//     })
//     .catch((err) => {
//         console.log(MESSAGES.DATABASE.ERROR)
//     })
// }

const connect = async () => {
    const MONGO_URI = DATABASE_URI;
    try {
      mongoose.set('strictQuery', false);
      mongoose.connect(MONGO_URI);
      console.log(MESSAGES.DATABASE.CONNECTED)
    } catch (error) {
    console.log(MESSAGES.DATABASE.ERROR)
    }
  };
  
  export default connect;