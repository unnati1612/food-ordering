const express = require('express');
const router = express.Router();
const User = require('../models/User.js');
const {body,validationResult}=require('express-validator')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs')
const jwtSecret='hellomynameisblabla$#'


router.post('/createuser',[
body('email').isEmail(),
body('password').isLength({min:5})
] ,async(req, res) => {
    const errors=validationResult(req)
    if(!errors.isEmpty()){        
        return res.status(400).json({errors:errors.array()})
    }
    const salt= await bcrypt.genSalt(10);
    let secPass= await bcrypt.hash(req.body.password,salt)
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password:secPass,
    location:req.body.location
  });

  newUser.save()
    .then(user => {
      res.json(user);
 
    })
    .catch(err => {
      console.log(err);
      res.status(500).send('Error saving user to database');
    });
});


router.post('/loginuser',
[
  body('email').isEmail(),
  body('password').isLength({min:5})
  ] 
,async (req, res) => {
  const errors=validationResult(req)
    if(!errors.isEmpty()){        
        return res.status(400).json({errors:errors.array()})
    }
        let email=req.body.email
          let userData= await User.findOne({email:email})
          if(!userData){
            console.log("not found")
            return res.status(400).json({errors:"try again"})
          }
          const pwdCompare = await bcrypt.compare(req.body.password,userData.password)
          if(!pwdCompare){
            console.log("not match")
            return res.status(400).json({errors:"try again"})
          }
          const data={
            user:{
              id:userData._id
            }
          }
          console.log('user: ',data)
          const authToken=jwt.sign(data,jwtSecret)
          console.log(authToken)
          res.json({authToken})
      //authtoken has 3 parts: header,data(userdata.id), sign
       
    });


module.exports = router;
