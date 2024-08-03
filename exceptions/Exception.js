import { print, OutputType } from '../helpers/print.js'

export default class Exception extends Error {
    static CANNOT_CONNECT_DB = 'Cannot connect DB'
    static WRONG_CONNECTION_STRING = "Wrong server name/connection string"
    static WRONG_DB_USERNAME_PASSWORD = "Wrong db's username and password"
    static USER_EXIST = "User existed"
    static USER_NOT_EXIST = "User not exist in database"
    static TODO_NOT_EXIST = "Todo not exist in database"
    static CANNOT_REGISTER_USER = "Cannot register user"
    static WRONG_EMAIL_OR_PASSWORD = "Wrong email or password"
    static TOKEN_INVALID_OR_EXPIRED = 'Token is invalid or expired'
    static USER_HAS_NO_TODO = "The user doesn't have any todos yet"
    static SYSTEM_HAS_NO_TODO = "System doesn't have any todos yet"
    static SYSTEM_HAS_NO_USER = "System doesn't have any users yet"

    constructor(message, validationErrors={}) {
        super(message)
        print(message, OutputType.ERROR)
        this.validationErrors = validationErrors
    }
}