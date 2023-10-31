import student from "../models/student.model.js";
import { MESSAGES } from '../configs/constants.config.js'

//login Student
export const Login = async (input) => {
    const { email, password } = input;
  
    const user = await student.findOne({ email });
    if (!user) throw new MESSAGES.USER.DUPLICATE_EMAIL;
  
    const isMatch = await student.matchPassword(password)
    
    if (!isMatch) {
        throw new MESSAGES.USER.INVALID_PASSWORD_ERROR
    }
    return user;
  };

export const createStudent = async (input) => { 
    const { email } = input;
    const user = await student.findOne({ email });
    if(user) { throw new MESSAGES.USER.DUPLICATE_EMAIL }
    return await student.create(input) 
}
export const getAllStudent = async (input) => { return await student.find(input) }
export const getStudent = async (input) => { return await student.findById(input) }
export const updateStudent = async (id,input) => { return await student.findByIdAndUpdate(id, input, {new : true}) }
export const deleteStudent = async (input) => { return await student.findByIdAndDelete(input) }