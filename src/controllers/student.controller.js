import * as services from '../services/student.services.js'
import { generateToken } from '../util/jwt.util.js';

export const registerStudent = async (req, res, next) => {
try {
const student = await services.createStudent(req.body)
res.status(201).json({ message : "Registration Successfull", success : true, data: student})
} catch (error) {
    next(error)
}
}

export const loginStudent = async (req, res, next) => {
    try {
      const { _id } = await services.Login(req.body);
  
      const token = generateToken({ _id, role: 'student' }, { expiresIn: '5d' });
  
      res.json({ success: true, message: 'Login Successful', Token: token, role: 'student' });
    } catch (error) {
      next(error);
    }
  };

//Get a Single by Name or ID
export const findStudent = async (req, res, next) => {
    try {
    user = await services.getStudent({_id: req.params.id})
  if(!user){ return res.status(404).json({success: false, message: 'User not found'})}
  return res.status(200).json({success: true,message: user})    
    } catch (error) {
      next(error)
    }
  }
  
  //Get All Users
  export const findAllStudent = async (req, res, next) => {
    try {
    const users = await services.getAllStudent()
  return res.status(200).json({
  success: true, message: 'Users Fetched Successfully',data: users })
    } catch(error) {
      next(error)
    }
  }
  
  //Update User
  export const updateStudent = async (req, res, next) => {
    const updateData = req.body;
    try { 
  const user = await services.getStudent({_id: req.params.id});
  //check user
  if(!user) {
  res.status(404).json({success: false, message: 'User to update not found' })
} 
  //update user
  const updatedData = await services.updateStudent(req.params.id, updateData)
  res.status(201).json({success: true,message: 'User updated successfully',data: updatedData})
  } 
    catch (error) {next(error);}
  }
  
  export const deleteStudent = async (req, res, next) =>{
  try {
  //check if user exits before updating
  const checkUser = await services.getStudent({ _id: req.params.id })
  if(!checkUser) return res.status(404).json({success: false,message: 'User not found'})
  //delete user 
  await services.deleteStudent(req.params.id)
  return res.status(200).json({success: true,message: 'User Deleted Successfully', data: checkUser})}
  catch (error) {next(error);}
  }