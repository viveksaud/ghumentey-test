const express = require("express");
const { signIn, signUp, signOut } = require("../controllers/user.js");

const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.get("/signout", signOut);

module.exports = router;
