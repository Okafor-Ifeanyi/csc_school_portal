import express from 'express'
import studentRoute from './student.route.js'
const router = express.Router()
router.get("/docs", (req, res) => res.redirect("") );
router.get('/healthcheck', (req, res) => {
  res.status(200).json({ message: 'Server ok' });
});
router.use('/student', studentRoute)
export default router 