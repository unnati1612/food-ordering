const express=require('express')
const app=express()
const port=5000
// const cors=require('cors')

const mongoDB=require("./db.js")
mongoDB()
// app.use(cors())
app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","http://localhost:3000")
    res.header(
        "Access-Control-Allow-Headers",
        "Origin,X-Requested-With,Content-Type,Accept")
    next()
})

const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({ extended: true }));

// app.use((_req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', '*');
  
//     next();
//   });

app.use(express.json())
app.use(bodyParser.json())

app.use('/api',require("./Routes/CreateUser.js"))
app.use('/api',require("./Routes/DisplayData.js"))
app.use('/api',require("./Routes/OrderData.js"))

app.get('/',(req,res)=>{
    res.send('hello')
})
app.listen(port,()=>{
    console.log(port)
})