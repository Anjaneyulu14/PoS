const express = require("express")
const {registerValidator, chooseValidator, generateStake} = require("./userController")
const router = express.Router()

router.post("/registerValidator", registerValidator)
router.get("/chooseValidator", chooseValidator)
router.get("/generateStake", generateStake)

module.exports = router