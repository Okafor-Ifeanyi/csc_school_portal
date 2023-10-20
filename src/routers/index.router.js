import express from 'express'
const router = express.Router()

            
router.get("/docs", (req, res) => 
  res.redirect("") );

console.log("Hello World : 1")

export default router