/**
 * This is the starting of the project
 */

const express = require("express")
const mongoose = require("mongoose")
const app = express()
const server_config = require("./configs/server.config")
const db_config = require("./configs/db.config")
const user_model = require("./models/user.model")
const bcrypt = require("bcryptjs")

// Middleware
app.use(express.json())

/**
 * Create an admin user at the starting of the application
 * If not already present
 */

// Connection with MongoDB
mongoose.connect(db_config.DB_URL)

const db = mongoose.connection

db.on("error", ()=>{
    console.log("Error404")
})

db.once("open", ()=>{
    console.log("Connnected to MongoDB")
    init()
})

async function init(){
    try{
        const user = await user_model.findOne({userId : "admin"})
        if(user){
            console.log("Admin is already present")
            return
        }
    }catch(err){
        console.log("Error404 on reading the data of the admin user", err)
    }

    try{
        user = await user_model.create({
            name : "Shivam",
            userId : "admin",
            password : bcrypt.hashSync("BEDEVADMIN",10),
            email : "notshivam@gmail.com",
            userType : "ADMIN"
        })
        console.log("Admin user is created successfully")
    }catch(err){
        console.log("Error404 on creating the admin user", err)
    }
}

/**
 * Stich the route to the server
 */
require("./routes/auth.route")(app)

/**
 * Starting of the server
 */

app.listen(server_config.PORT, ()=>{
    console.log("Server is started at port number : ",server_config.PORT);
})