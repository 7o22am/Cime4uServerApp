 
 const express = require("express");
const registerController = require("../controller/userControler")
 const router = express.Router();


 router.route("/register")
                        .post(registerController.register);

router.route("/login")
                        .post(registerController.login)


 module.exports=router;