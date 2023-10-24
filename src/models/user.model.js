import mongoose from "mongoose";
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    email: {
      type: String,
      unique: true
    },
    password: {
      type: String
    },
    phoneNumber: {
      type: String
    },
    image: {
      type: String
   },
   role: {
    type: Enum,

   }
  },
    { timestamps: {
      createdAt: true,
      updatedAt: false
    }}
  );
  
  const adminModel = mongoose.model("Upload", adminSchema);
  
export default adminModel