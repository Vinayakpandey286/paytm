const z = require('zod')

const createUser = z.object({
    userName: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    password: z.string()
})

module.exports ={createUser}