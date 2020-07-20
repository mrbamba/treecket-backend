const bcrypt = require('bcrypt')
const userService = require('../user/user.service')
const logger = require('../../services/logger.service')

const saltRounds = 10

async function login(email, password) {
    logger.debug(`auth.service - login with email: ${email}`)
    if (!email || !password) return Promise.reject('email and password are required!')

    const user = await userService.getByEmail(email)
    if (!user) return Promise.reject('Invalid email or password')
    const match = await bcrypt.compare(password, user.password)
    if (!match) return Promise.reject('Invalid email or password')

    delete user.password;
    return user;
}

async function signup(email, password, fullName,imgSrc, type) {
    logger.debug(`auth.service - signup with email: ${email}, fullName: ${fullName}`)
    if (!email || !password || !fullName) return Promise.reject('email, full name and password are required!')

    const hash = await bcrypt.hash(password, saltRounds)
    return userService.add({email, password: hash, fullName,imgSrc, type})
}

module.exports = {
    signup,
    login,
}