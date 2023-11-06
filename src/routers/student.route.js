import { Router } from 'express'
import validate from '../middlewares/validate.middleware.js';
import { registerStudent, loginStudent, findStudent, findAllStudent, updateStudent, deleteStudent} from '../controllers/student.controller.js'
import { registerUser, loginUser, updateUser} from '../schemas/index.schema.js'
const router = Router()

router.post('/register', validate(registerUser), registerStudent)
router.post('/login', validate(loginUser), loginStudent)
router.get('/:id', findStudent)
router.patch('/:id', validate(updateUser), updateStudent)
router.get('/', findAllStudent)
router.delete('/:id', deleteStudent)

export default router;

