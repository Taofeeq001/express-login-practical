const express = require('express')
const {signUp, login, logout} = require('../Controller/Auth')

const router = express.Router()


router.route("/signup").post(signUp)
router.route("/login").post(login)
router.route("/log-out").post(logout)








module.exports = router