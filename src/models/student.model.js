import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt'

const studentSchema = new Schema ({
fullname: { type : String, required: true, },
email: { type : String, required: true, },
password: { type : String, required: true, },
phone: { type : String, required: true, },
regNo: { type : String, required: true, },
studentclassID : { type : String },
}, 
{
timestamps: true
})

studentSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
      next();
    }
  
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  });
  
  studentSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };
const student = model('Student', studentSchema)

export default student