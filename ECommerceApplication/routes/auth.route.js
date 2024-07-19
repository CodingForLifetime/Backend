/**
 * POST localhost:6969/ecomm/api/auth/signup
 */
const authController = require("../controllers/auth.controller")
const authMW = require("../Middlewares/auth.mw")
module.exports = (app)=>{
    app.post("/ecomm/api/auth/signup" ,[authMW.verifySignUpBody], authController.signUp)
}