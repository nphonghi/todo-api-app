import Exception from '../exceptions/Exception.js'
import { User } from '../models/index.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { Op } from 'sequelize';
import crypto from 'crypto'

const register = async ({ email, password, name }) => {
    const existingUser = await User.findOne({ 
        where: { email } 
    });
    if (existingUser) {
        throw new Exception(Exception.USER_EXIST);
    }

    const hashPassword = await bcrypt.hash(password, parseInt(process.env.SALT));

    const newUser = await User.create({
        email, 
        password: hashPassword,
        name
    });
    return {
        email: newUser.email,
        name: newUser.name
    };
};

const login = async ({ email, password }) => {
    const existingUser = await User.findOne({ 
        where: { email }
    })
    if (!existingUser) {
        throw new Exception(Exception.WRONG_EMAIL_OR_PASSWORD)
    }

    const isMatched = await bcrypt.compare(password, existingUser.password)
    if (isMatched) {
        let token = jwt.sign({
            data: existingUser
        }, 
        process.env.JWT_SECRET_KEY,
        {
            expiresIn: '60m'
        })
        return {
            email: existingUser.email,
            name: existingUser.name,
            token: token
        }
    } else {
        throw new Exception(Exception.WRONG_EMAIL_OR_PASSWORD)
    }
}

const forgotPassword = async (email) => {
    const existingUser = await User.findOne({ 
        where: { email } 
    });
    if (!existingUser) {
        throw new Exception(Exception.WRONG_EMAIL_OR_PASSWORD);
    }

    const token = crypto.randomBytes(20).toString('hex');
    const expires = new Date(Date.now() + 180000);
    
    await User.update({
        resetPasswordToken: token,
        resetPasswordExpires: expires,
    }, {
        where: { email }
    });

    return {
        resetPasswordToken: token
    };
};


const resetPassword = async ({ token, password }) => {
    try {
        const user = await User.findOne({
            where: {
                resetPasswordToken: token,
                resetPasswordExpires: { [Op.gt]: new Date() },
            },
        });
      
        if (!user) {
            throw new Exception(Exception.TOKEN_INVALID_OR_EXPIRED);
        }

        const hashNewPassword = await bcrypt.hash(password, parseInt(process.env.SALT));
      
        await User.update({
            password: hashNewPassword,
            resetPasswordToken: null,
            resetPasswordExpires: null,
        }, {
            where: { id: user.id }
        });
    } catch (exception) {
        throw new Exception(exception.message);
    }
};

const getUsers = async () => {
    try {
        const users = await User.findAll();
        if (!users) {
            throw new Exception(Exception.SYSTEM_HAS_NO_USER)
        }
        return users;
    } catch (exception) {
        throw new Exception('Error getting the user list')
    }
}

const getUserByID = async (id) => {
    try {
        const user = await User.findByPk(id);
        if (!user) {
            throw new Exception(Exception.USER_NOT_EXIST)
        }
        return user
    } catch(exception) {
        throw new Exception(`Error getting the user with id: ${id}`)
    }
}

const getUserByName = async (name) => {
    try {
        const users = await User.findAll({
            where: { name: name }
        });
        if (!users) {
            throw new Exception(Exception.USER_NOT_EXIST)
        }
        return users
    } catch(exception) {
        throw new Exception(`Error getting the user with name: ${name}`)
    }
}

const getUserByEmail = async (email) => {
    try {
        const user = await User.findOne({
            where: { email: email }
        });
        if (!user) {
            throw new Exception(Exception.USER_NOT_EXIST)
        }
        return user
    } catch(exception) {
        throw new Exception(`Error getting the user with email: ${email}, ${exception.message}, ${exception.errors}}`)
    }
}

const updateUserByID = async ({ id }, { name }) => {
    try {
        let user = await User.findByPk(id)
        if (!user) {
            throw new Exception(Exception.USER_NOT_EXIST)
        }
        await User.update({
            name: name
        }, {
            where: { id: id }
        });
        user = await User.findByPk(id)
        return user
    } catch(exception) {
        throw new Exception(`Error update user with id: ${id}, ${exception.message}, ${exception.errors}}`)
    }
}

const deleteUserByID = async (id) => {
    try {
        const user1 = await User.findByPk(id);
        console.log(user1)
        if (!user1) {
            throw new Exception(Exception.USER_NOT_EXIST);
        }
        // const token = crypto.randomBytes(20).toString('hex');
        // const expires = new Date(Date.now() + 60000);
        // await User.update({
        //     resetPasswordToken: token,
        //     resetPasswordExpires: expires,
        // }, {
        //     where: { id }
        // });
        // const user2 = await User.findByPk(id);
        // console.log(user2)
        await User.destroy({
            where: { id }
        });
        return user1
    } catch(exception) {
        throw new Exception(`Error delete user with id: ${id}, ${exception.message}, ${exception.errors}}`)
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
};