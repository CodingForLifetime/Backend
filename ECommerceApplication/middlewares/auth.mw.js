/**
 * Creata a MW which will check the request body is proper and correct
 */

const userModel = require("../models/user.model")

const verifySignUpBody = async (req, res, next)=>{
    try{
        // Checking name
        if(!req.body.name){
            return res.status(400).send({
                message : "Failed : Name was not provided in req body"
            })
        }

        // Checking email
        if(!req.body.email){
            return res.status(400).send({
                message : "Failed : Email was not provided in req body"
            })
        }

        // Checking userId
        if(!req.body.userId){
            return res.status(400).send({
                message : "Failed : UserId was not provided in req body"
            })
        }

        // Checking if the user with the same userId is already present
        const user = await userModel.findOne({userId : req.body.userId})
        if(user){
            return res.status(400).send({
                message : "Failed : User with the same userId is already present"
            })
        }

        next()

    }catch(err){
        console.log("Error404 while validating the request ogject",err)
        req.status(500).send({
            message : "Error404 while validating the request body"
        })
    }
}

module.exports = {
    verifySignUpBody : verifySignUpBody
}