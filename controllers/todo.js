import HTTPStatusCode from "../exceptions/HTTPStatusCode.js"
import { todoRepository } from "../repositories/index.js"

const getTodos = async (req, res) => {
    try {
        const todos = await todoRepository.getTodos()
        res.status(HTTPStatusCode.OK).json({
            message: 'Get all todo list successfully',
            data: todos
        })
    } catch(exception) {
        res.status(HTTPStatusCode.INTERNAL_SERVER_ERROR).json({
            message: 'Cannot get all todo list' + exception
        })
    }
}

const getTodosOfUser = async (req, res) => {
    const userID = req.user.id
    try {
        const todos = await todoRepository.getTodosOfUser(userID)
        res.status(HTTPStatusCode.OK).json({
            message: `Get all todo list of user ${userID}} successfully`,
            data: todos
        })
    } catch(exception) {
        res.status(HTTPStatusCode.INTERNAL_SERVER_ERROR).json({
            message: 'Cannot get all todo list of user: ' + userID + " " + exception
        })
    }
}

const getTodoByID = async (req, res) => {
    const id = req.params.id
    try {
        const todo = await todoRepository.getTodoByID({ id })
        res.status(HTTPStatusCode.OK).json({
            message: `Get todo: ${id}} successfully`,
            data: todo
        })
    } catch(exception) {
        res.status(HTTPStatusCode.INTERNAL_SERVER_ERROR).json({
            message: `Cannot get todo ${id}` + exception
        })
    }
}

const getTodoByTitle = async (req, res) => {
    const { title } = req.query
    try {
        const todo = await todoRepository.getTodoByTitle({ title })
        res.status(HTTPStatusCode.OK).json({
            message: `Get todo with title: ${title} successfully`,
            data: todo
        })
    } catch(exception) {
        res.status(HTTPStatusCode.INTERNAL_SERVER_ERROR).json({
            message: `Cannot get todo title: ${title}` + exception
        })
    }
}

const getTodoByDes = async (req, res) => {
    const { Des } = req.query
    try {
        const todo = await todoRepository.getTodoByDes({ Des })
        res.status(HTTPStatusCode.OK).json({
            message: `Get todo with Des: ${Des} successfully`,
            data: todo
        })
    } catch(exception) {
        res.status(HTTPStatusCode.INTERNAL_SERVER_ERROR).json({
            message: `Cannot get todo Des: ${Des}` + exception
        })
    }
}

const getTodoByStatus = async (req, res) => {
    const { status } = req.query
    try {
        const todo = await todoRepository.getTodoByStatus({ status })
        res.status(HTTPStatusCode.OK).json({
            message: `Get todo with Status: ${status} successfully`,
            data: todo
        })
    } catch(exception) {
        res.status(HTTPStatusCode.INTERNAL_SERVER_ERROR).json({
            message: `Cannot get todo Status: ${status}` + exception
        })
    }
}

const insertTodo = async (req, res) => {
    const { title, description, deadline, status } = req.body
    const userID = req.user.id
    try {
        const todo = await todoRepository.insertTodo({ title, description, deadline, status, userID })
        res.status(HTTPStatusCode.INSERT_OK).json({
            message: 'Insert todo successfully',
            data: todo
        })
    } catch(exception) {
        res.status(HTTPStatusCode.INTERNAL_SERVER_ERROR).json({
            message: 'Cannot insert todo' + exception,
            validationErrors: exception.validationErrors
        })
    }
}

const updateTodoByID = async (req, res) => {
    const { title, description, deadline, status } = req.body
    const id = req.params.id
    try {
        const todo = await todoRepository.updateTodoByID({ title, description, deadline, status, id })
        res.status(HTTPStatusCode.OK).json({
            message: `Update todo with id: ${req.params.id} successfully`,
            data: todo
        })
    } catch(exception) {
        res.status(HTTPStatusCode.INTERNAL_SERVER_ERROR).json({
            message: `Cannot update todo id: ${req.params.id}` + exception,
            validationErrors: exception.validationErrors
        })
    }
}

const deleteTodoByID = async (req, res) => {
    const id = req.params.id
    try {
        const todo = await todoRepository.deleteTodoByID(id)
        res.status(HTTPStatusCode.OK).json({
            message: `Delete todo with id: ${id} successfully`,
            data: todo
        })
    } catch(exception) {
        res.status(HTTPStatusCode.INTERNAL_SERVER_ERROR).json({
            message: `Cannot delete todo id: ${id}` + exception
        })
    }
}

export default {
    getTodos,
    getTodosOfUser,
    getTodoByID,
    getTodoByTitle,
    getTodoByDes,
    getTodoByStatus,
    insertTodo,
    updateTodoByID,
    deleteTodoByID
}