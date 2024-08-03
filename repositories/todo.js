import { Todo } from "../models/index.js"
import Exception from "../exceptions/Exception.js"

const getTodos = async () => {
    try {
        const todos = await Todo.findAll();
        if (!todos) {
            throw new Exception(Exception.SYSTEM_HAS_NO_TODO)
        }
        return todos;
    } catch (exception) {
        throw new Exception('Error getting the todo list')
    }
}

const getTodosOfUser = async (userID) => {
    try {
        const todos = await Todo.findAll({
            where: {userID}
        });
        if (!todos) {
            throw new Exception(Exception.USER_HAS_NO_TODO)
        }
        return todos
    } catch(exception) {
        throw new Exception(`Error getting the todo list: ${exception.errors}`)
    }
}

const getTodoByID = async ({ id }) => {
    try {
        const todo = await Todo.findByPk(id);
        if (!todo) {
            throw new Exception(Exception.TODO_NOT_EXIST)
        }
        return todo
    } catch(exception) {
        throw new Exception(`Error getting the todo with id: ${id}`)
    }
}

const getTodoByTitle = async ({ title }) => {
    try {
        const todos = await Todo.findAll({
            where: { title }
        });
        if (!todos) {
            throw new Exception(Exception.TODO_NOT_EXIST)
        }
        return todos
    } catch(exception) {
        throw new Exception(`Error getting the todo with title: ${title}`)
    }
}

const getTodoByDes = async ({ Des }) => {
    try {
        const todos = await Todo.findAll({
            where: { description: Des }
        });
        if (!todos) {
            throw new Exception(Exception.TODO_NOT_EXIST)
        }
        return todos
    } catch(exception) {
        throw new Exception(`Error getting the todo with Des: ${Des}`)
    }
}

const getTodoByStatus = async ({ status }) => {
    try {
        const todos = await Todo.findAll({
            where: { status: status }
        });
        if (!todos) {
            throw new Exception(Exception.TODO_NOT_EXIST)
        }
        return todos
    } catch(exception) {
        throw new Exception(`Error getting the todo with status: ${status}`)
    }
}

const insertTodo = async ({ title, description, deadline, status, userID }) => {
    try {
        const todo = await Todo.create({
            title, 
            description, 
            deadline, 
            status,
            userID: userID
        })
        return todo
    } catch(exception) {
        if (!!exception.errors) {
            throw new Exception('Input error', exception.errors)
        }
    }
}

const updateTodoByID = async ({ title, description, deadline, status, id }) => {
    try {
        let todo = await Todo.findOne({
            where: { id }
        })
        if (!todo) {
            throw new Exception(Exception.TODO_NOT_EXIST)
        }
        await Todo.update({
            title, 
            description, 
            deadline, 
            status
        }, {
            where: { id }
        })
        todo = await Todo.findOne({
            where: { id }
        })
        return todo
    } catch(exception) {
        if (!!exception.errors) {
            throw new Exception('Input error', exception.errors)
        }
    }
}

const deleteTodoByID = async (id) => {
    try {
        const todo = await Todo.findOne({
            where: { id }
        });
        if (!todo) {
            throw new Exception(Exception.TODO_NOT_EXIST)
        }
        await Todo.destroy({
            where: { id }
        })
        return todo
    } catch(exception) {
        throw new Exception(`Error delete todo with id: ${id}`)
    }
}

const deleteTodosOfUser = async (id) => {
    try {
        const result = await Todo.destroy({
            where: { userID: id }
        });
        if (result === 0) {
            throw new Exception(Exception.USER_HAS_NO_TODO)
        }
    } catch(exception) {
        throw new Exception(`Error delete todos of user: ${id}`)
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
    deleteTodoByID,
    deleteTodosOfUser
}