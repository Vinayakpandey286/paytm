const User = require("../models/userModel")
const { generateToken } = require("../utils/generateToken")
const { createUser } = require("../zodValidation/userSchema")

const resgisterUser = async (req, res) => {
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
        res.status(400).send({ message: 'User already exist' })
        return
    }

    const user = await User.create({
        userName, firstName, lastName, password
    })

    if (user) {
        res.status(201).json({
            _id: user._id,
            userName: user.userName,
            firstName: user.firstName,
            lastName: user.lastName,
            token: generateToken(user._id)
        })
    }
}


module.exports = { resgisterUser }