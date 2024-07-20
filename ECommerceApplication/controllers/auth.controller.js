/**
 * Controller
 */
const bcrypt = require("bcryptjs")
const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const sct = require("../configs/auth.config")

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

exports.signIn = async(req, res)=>{
    /**
     * Logic to create the user
     */

    //1.Checking if userId is present
    const request_body = req.body
    const user = await userModel.findOne({userId : request_body.userId})

    if(user == null){
        return res.status(400).send({
            message : "UserId passed isn't valid"
        })
    }
    //2.Checking if password is correct
    const isPassswordValid = bcrypt.compareSync(request_body.password, user.password)
    if(!isPassswordValid){
        return res.status(401).send({
            message : "Wrond password is passed"
        })
    }
    //3.Creating access token with a given TTL and return using jwt
    const token = jwt.sign({id : user.userId}, sct.secret,{
        expiresIn : 120
    })
    res.status(200).send({
        name : user.name,
        userId : user.userId,
        email : user.email,
        userType : user.userType,
        accessToken : token
    })
}