const z = require('zod')

const createUser = z.object({
    userName: z.string().email(),
    firstName: z.string(),
    lastName: z.string(),
    password: z.string()
})

const signInBody = z.object({
    userName:z.string().email(),
    password:z.string()
})

const updateBody = z.object({
    firstName:z.string().optional(),
    lastName:z.string().optional(),
    password:z.string().optional()
})

module.exports ={createUser, signInBody, updateBody}