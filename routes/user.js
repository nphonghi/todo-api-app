import express from 'express'
import { body } from 'express-validator'
import { userController } from '../controllers/index.js'

const router = express.Router()

router.post(
    '/register',
    body('email').isEmail(),
    body('password').isLength({ min: 4 }),
    body('name').isLength({ min: 2 }),
    userController.register
)

router.post(
    '/login',
    body('email').isEmail(),
    body('password').isLength({ min: 4 }),
    userController.login
)

router.post(
    '/forgot-password',
    body('email').isEmail(),
    userController.forgotPassword
)

router.post(
    '/reset-password',
    body('password').isLength({ min: 4 }),
    userController.resetPassword
)

router.get('/all', userController.getUsers)
router.get('/id/:id', userController.getUserByID)
router.get('/email', userController.getUserByEmail)
router.get('/name', userController.getUserByName)
router.put('/update/:id', userController.updateUserByID)
router.delete('/id/:id', userController.deleteUserByID)

export default router