import { validationResult } from 'express-validator'
import { todoRepository, userRepository } from '../repositories/index.js'
import HTTPStatusCode from '../exceptions/HTTPStatusCode.js'

const register = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(HTTPStatusCode.BAD_REQUEST).json({ error: errors.array() })
    }

    const { email, password, name } = req.body
    try { 
        const user = await userRepository.register({ email, password, name })
        res.status(HTTPStatusCode.INSERT_OK).json({ 
            msg: 'Register user successfully',
            data: user
        })
    } catch (exception) {
        res.status(HTTPStatusCode.INTERNAL_SERVER_ERROR).json({
            message: exception.toString()
        })
    }
}

const login = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(HTTPStatusCode.BAD_REQUEST).json({ error: errors.array() })
    }
    
    const { email, password } = req.body
    try {
        let existingUser = await userRepository.login({ email, password })
        res.status(HTTPStatusCode.OK).json({
            msg: 'Login user success',
            data: existingUser
        })
    } catch(exception) {
        res.status(HTTPStatusCode.INTERNAL_SERVER_ERROR).json({
            message: exception.toString()
        })
    }
}

const forgotPassword = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(HTTPStatusCode.BAD_REQUEST).json({ error: errors.array() })
    }
    const { email } = req.body
    try {
        const result = await userRepository.forgotPassword(email)
        res.status(HTTPStatusCode.OK).json({
            msg: 'Send token to email forgot password successfully',
            token: result.resetPasswordToken
        })
    } catch(exception) {
        res.status(HTTPStatusCode.INTERNAL_SERVER_ERROR).json({
            message: exception.toString()
        })
    }
}

const resetPassword = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(HTTPStatusCode.BAD_REQUEST).json({ error: errors.array() })
    }

    const { token, password } = req.body
    try {
        await userRepository.resetPassword({ token, password })
        res.status(HTTPStatusCode.INSERT_OK).json({
            msg: 'Reset password successfully'
        })
    } catch(exception) {
        res.status(HTTPStatusCode.INTERNAL_SERVER_ERROR).json({
            message: exception.toString()
        })
    }
}

const getUsers = async (req, res) => {
    try {
        const users = await userRepository.getUsers()
        res.status(HTTPStatusCode.OK).json({
            message: 'Get all user list successfully',
            data: users
        })
    } catch(exception) {
        res.status(HTTPStatusCode.INTERNAL_SERVER_ERROR).json({
            message: 'Cannot get all user list' + exception,
            validationErrors: exception.validationErrors
        })
    }
}

const getUserByID = async (req, res) => {
    const id = req.params.id
    try {
        let user = await userRepository.getUserByID(id)
        res.status(HTTPStatusCode.OK).json({
            msg: `Get user with id: ${id} successfully`,
            data: user
        })
    } catch(exception) {
        res.status(HTTPStatusCode.INTERNAL_SERVER_ERROR).json({
            message: exception.toString()
        })
    }
}

const getUserByName = async (req, res) => {
    const name = req.query.name;
    try {
        let users = await userRepository.getUserByName(name)
        res.status(HTTPStatusCode.OK).json({
            msg: `Get all user named: ${name} successfully`,
            data: users
        })
    } catch(exception) {
        res.status(HTTPStatusCode.INTERNAL_SERVER_ERROR).json({
            message: exception.toString()
        })
    }
}

const getUserByEmail = async (req, res) => {
    const { email } = req.query;
    try {
        let user = await userRepository.getUserByEmail(email)
        res.status(HTTPStatusCode.OK).json({
            msg: `Get user with email: ${email} successfully`,
            data: user
        })
    } catch(exception) {
        res.status(HTTPStatusCode.INTERNAL_SERVER_ERROR).json({
            message: exception.toString()
        })
    }
}

const updateUserByID = async (req, res) => {
    const id = req.params
    const name = req.body
    try {
        let user = await userRepository.updateUserByID(id, name)
        res.status(HTTPStatusCode.INSERT_OK).json({
            msg: `Update user with id: ${id} successfully`,
            data: user
        })
    } catch(exception) {
        res.status(HTTPStatusCode.INTERNAL_SERVER_ERROR).json({
            message: exception.toString()
        })
    }
}

const deleteUserByID = async (req, res) => {
    const id = req.params.id
    try {
        await todoRepository.deleteTodosOfUser(id)
        let user = await userRepository.deleteUserByID(id)
        res.status(HTTPStatusCode.OK).json({
            msg: `Delete user with id: ${id} successfully`,
            data: user
        })
    } catch(exception) {
        res.status(HTTPStatusCode.INTERNAL_SERVER_ERROR).json({
            message: exception.toString()
        })
    }
}

export default {
    register,
    login,
    forgotPassword,
    resetPassword,
    getUsers,
    getUserByID,
    getUserByName,
    getUserByEmail,
    updateUserByID,
    deleteUserByID
}