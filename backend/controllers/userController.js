const User = require("../models/userModel")
const { generateToken } = require("../utils/generateToken")
const { createUser, signInBody } = require("../zodValidation/userSchema")

const resgisterUser = async (req, res) => {
    // need to use bcrypt js to hash the password
    const createUserPayload = req.body
    const parsedPayload = createUser.safeParse(createUserPayload)

    if (!parsedPayload.success) {
        res.status(411).json({
            message: 'Wrong Inputs'
        })
        return
    }
    const { userName, firstName, lastName, password } = req.body

    const userExists = await User.find({ userName })
    if (userExists) {
        res.status(400).send({ message: 'Email already taken' })
        return
    }

    const user = await User.create({
        userName, firstName, lastName, password
    })

    if (user) {
        res.status(201).json({
            _id: user._id,
            message: 'User Created Successfully',
            userName: user.userName,
            firstName: user.firstName,
            lastName: user.lastName,
            token: generateToken(user._id)
        })
    }
}

const authUser = async (req, res) => {
    const { userName, password } = req.body
    const payload = req.body

    const parsedPayload = signInBody.safeParse(payload)

    if (!parsedPayload.success) {
        return res.status(411).json({
            message: 'Incorrect Inputs'
        })
    }

    const user = await User.find({ userName })

    if (user) {
        if (password === user.password) {
            return res.status(200).json({
                message: 'User Successfully logged',
                token: generateToken(user._id)
            })
        } else {
            return res.status(400).json({
                message: 'Wrong Password'
            })
        }
    }

    return res.status(400).json({
        message: 'Error while loggin in'
    })
}


module.exports = { resgisterUser, authUser }