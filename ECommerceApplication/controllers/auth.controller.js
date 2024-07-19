/**
 * Controller
 */
const bcrypt = require("bcryptjs")
const userModel = require("../models/user.model")
exports.signUp = async (req, res)=>{
    /**
     * Logic to create the user
     */

    //1.Read the request body
    const request_body = req.body

    //2.Insert the data in Users collection in MongoDB
    const userObj = {
        name : request_body.name,
        userId : request_body.userId,
        email : request_body.email,
        userType : request_body.userType,
        password : bcrypt.hashSync(request_body.password,10)
    }

    //3.Return the response back to the user
    try{
        const user_created = await userModel.create(userObj)
        /**
         * Return this user
         */
        const res_obj = {
            name : user_created.name,
            userId : user_created.userId,
            email : user_created.email,
            userType : user_created.userType,
            createdAt : user_created.createdAt,
            updatedAt : user_created.updatedAt
        }
        res.status(201).send(res_obj)
    }catch(err){
        console.log("Error404 while registering the user",err)
        res.status(500).send({
            message : "Some error happened while registering the user"
        })
    }
}