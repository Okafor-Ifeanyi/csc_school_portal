import { Schema, model } from 'mongoose';

const studentSchema = new Schema ({
fullname: { type : String },
email: { type : String },
password: { type : String },
phone: { type : String },
regNo: { type : String },
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