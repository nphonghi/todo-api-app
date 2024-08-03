import Todo from "./Todo.js"
import User from './User.js'

User.hasMany(Todo, { foreignKey: 'userID' });
Todo.belongsTo(User, { foreignKey: 'userID' });

export {
    User,
    Todo
}