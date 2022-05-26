import bcrypt from "bcryptjs/dist/bcrypt.js"

const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    },
    {
        name: 'Vadick Palomino',
        email: 'vadick@vadick.com',
        password: bcrypt.hashSync('123456', 10),
    },
    {
        name: 'Jose tisoc',
        email: 'jose@jose.com',
        password: bcrypt.hashSync('123456', 10),
    },
]

export default users;