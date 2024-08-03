import express from 'express'
import {
    todoController
} from '../controllers/index.js'

const router = express.Router()

router.get('/all', todoController.getTodos)
router.get('/allTodoOfUser', todoController.getTodosOfUser)
router.get('/id/:id', todoController.getTodoByID)
router.get('/title', todoController.getTodoByTitle)
router.get('/des', todoController.getTodoByDes)
router.get('/status', todoController.getTodoByStatus)
router.post('/insert', todoController.insertTodo)
router.put('/update/:id', todoController.updateTodoByID)
router.delete('/:id', todoController.deleteTodoByID)

export default router