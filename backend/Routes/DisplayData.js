const express = require('express');
const router = express.Router();

router.post('/fooddata',(req,res)=>{
    res.send([global.food_items,global.foodCategory])
// console.log(global.food_items)
})

module.exports = router;
