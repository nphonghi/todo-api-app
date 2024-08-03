import jwt from 'jsonwebtoken'
import HTTPStatusCode from '../exceptions/HTTPStatusCode.js'

export default function checkToken(req, res, next) {
    if (
        req.url == '/todo-api-app/user/login' || 
        req.url == '/todo-api-app/user/register' ||
        req.url == '/todo-api-app/user/forgot-password' ||
        req.url == '/todo-api-app/user/reset-password'
    ) {
        next()
        return
    }

    const token = req.headers?.authorization?.split(" ")[1]
    try {
        const jwtObject = jwt.verify(token, process.env.JWT_SECRET_KEY)
        const isExpired = Date.now() >= jwtObject.exp * 1000
        if (isExpired) {
            res.status(HTTPStatusCode.BAD_REQUEST).json({
                message: 'Token is expired'
            })
            res.end()
        } else {
            req.user = {
                id: jwtObject.data.id,
                email: jwtObject.data.email,
                name: jwtObject.data.name
            };
            next()
            return
        }
    } catch(exception) {
        res.status(HTTPStatusCode.BAD_REQUEST).json({
            message: exception.message
        })
    }
}