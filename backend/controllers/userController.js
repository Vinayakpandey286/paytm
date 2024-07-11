const Account = require("../models/accountModel")
const User = require("../models/userModel")
const { generateToken } = require("../utils/generateToken")
const { createUser, signInBody, updateBody } = require("../zodValidation/userSchema")

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

    const userExists = await User.findOne({ userName })
    if (userExists) {
        res.status(400).send({ message: 'Email already taken' })
        return
    }

    const user = await User.create({
        userName, firstName, lastName, password
    })

    await Account.create({
        userId,
        balance: Math.floor(Math.random() * 10001)
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

    const user = await User.findOne({ userName })
    if (user && (await user.matchPassword(password))) {
        res.json({
            message: 'User Successfully logged',
            token: generateToken(user._id)
        });
    } else {
        return res.status(400).json({
            message: 'Wrong Password'
        })
    }

    return res.status(400).json({
        message: 'Error while loggin in'
    })
}


const updateUser = async (req, res) => {
    const body = req.body
    const { success } = updateBody.safeParse(body)
    if (!success) {
        return res.status(411).json({
            message: 'Error while Updating'
        })
    }

    try {
        await User.updateOne({ _id: req.user._id }, body);
        res.json({
            message: "Updated successfully"
        })
    } catch (error) {
        res.status(400).send({ message: 'Bad Request' })
    }
}

const findUser = async (req, res) => {
    const filter = req.query.filter || ""
    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })
    if (users) {
        res.json({
            user: users.map(user => ({
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                _id: user._id
            }))
        })
    }
}

const getBalance = async (req, res) => {
    const { _id: userId } = req.user

    const account = await Account.findOne({ userId })

    try {
        if (account) {
            res.status(200).json({
                balance: account.balance
            })
        }
    } catch (error) {
        res.status(500).json({
            message: 'something went wrong'
        })
    }
}

const transferBalance = async(req, res) =>{

}



module.exports = { resgisterUser, authUser, updateUser, findUser, getBalance ,transferBalance}