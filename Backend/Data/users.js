import bcrypt from "bcryptjs"

const users = [
    {
        name:'Admin',
        email:'admin@gmail.com',
        password:bcrypt.hashSync('123456', 10),
        isAdmin: true
    },
    {
        name:'Yuvi',
        email:'yuvi@gmail.com',
        password:bcrypt.hashSync('123456', 10)
    },
    {
        name:'Isha',
        email:'isha7701@gmail.com',
        password:bcrypt.hashSync('123456', 10)
    }
]

export default users