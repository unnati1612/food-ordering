const mongoose=require('mongoose')
// const mongoURI='mongodb+srv://unnatijain1612:unianu00@cluster0.qquspiy.mongodb.net/foodifymern?retryWrites=true&w=majority'
const mongoURI='mongodb://unnatijain1612:unianu00@ac-4ykgwxs-shard-00-00.qquspiy.mongodb.net:27017,ac-4ykgwxs-shard-00-01.qquspiy.mongodb.net:27017,ac-4ykgwxs-shard-00-02.qquspiy.mongodb.net:27017/foodifymern?ssl=true&replicaSet=atlas-dew9pk-shard-0&authSource=admin&retryWrites=true&w=majority'

const mongoDB=async()=>{
    await mongoose.connect(mongoURI,{useNewUrlParser:true,useUnifiedTopology: true})    
    .then(()=>{
    console.log('connected mongoose to database')
    
    })
    .catch((err)=>{
        console.log('error in connecting to db')
    })
    const fetched_data= mongoose.connection.db.collection("food_items")
  const data=await fetched_data.find({}).toArray()
  global.food_items=data
  const foodCategory= mongoose.connection.db.collection("foodCategory")
  const dataCat=await foodCategory.find({}).toArray()
  global.foodCategory=dataCat

    // console.log(global.food_items)

   
}

module.exports=mongoDB



