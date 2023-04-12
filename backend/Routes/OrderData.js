const express = require('express');
const router = express.Router();
const Order=require('../models/Orders')
router.post('/orderData',async(req,res)=>{
    let data=req.body.order_data
await data.splice(0,0,{Order_date:req.body.order_date})
    let eId=await Order.findOne({'email':req.body.email})
    console.log(eId)

    if(eId===null){
        const newOrder = new Order({
            email:req.body.email,
            order_data:[data]
        })
        newOrder.save()
    .then(order => {
      res.json(order);
 
    })
    .catch(err => {
      console.log(err);
      res.status(500).send('Error saving order to database');
    });
    }
    else{
        try{
         await Order.findOneAndUpdate({email:req.body.email},
         {$push:{order_data:data}}).then((order)=>{
            res.json(order)
         })
        }
        catch(err){
            res.send("server errorrr",err.message)
        }

         
    }

})

router.post('/myorderdata',async(req,res)=>{
try{
    let mydata= await Order.findOne({email:req.body.email})
    res.json({orderData:mydata})
    console.log( res.json({orderData:mydata}))
}
catch{
console.log('error in fetching')
}
})

module.exports=router