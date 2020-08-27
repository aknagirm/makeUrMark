const jwt=require('jsonwebtoken')
const User =require('../models/user')
require('dotenv').config()


const secretKey= process.env.SECRET_KEY

module.exports=function verifyToken(req,res, next) {
  setTimeout(() => {
    if(!req.headers.authorization) {
        console.log("header didnot find")
        return res.status(401).send('Unauthorized request')
    } else {
        let token= req.headers.authorization.split(' ')[1]
        if(token === 'null'){
            console.log("token didnot find")
            return res.status(401).send('Unauthorized request')
        } else {
            try {
                let payload= jwt.verify(token, secretKey)
                if(payload._id && payload.userName){
                    User.findById(payload._id, (err, user)=> {
                        if(err){
                            return res.status(401).send('Unauthorized request')
                        } else {   
                            if(user.userName == payload.userName){
                                req.userName= payload.userName
                                req.userRole= payload.userRole
                                next()
                            } else {
                                return res.status(401).send('Unauthorized request')
                            }
                        }
                    })
                } else {
                    return res.status(401).send('Unauthorized request')
                }
                
                } catch(err){
                    return res.status(401).send('Unauthorized request')
                }
            }
        }
    }, 5000)
    }
