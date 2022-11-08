const express = require("express")
const {registerValidator, chooseValidator, generateStake, getUsers} = require("./userController")
const router = express.Router()

router.post("/registerValidator", registerValidator)
router.get("/chooseValidator", chooseValidator)
router.get("/generateStake", generateStake)
router.get("/getUsers", getUsers)

module.exports = router