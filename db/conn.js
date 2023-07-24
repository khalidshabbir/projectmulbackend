const mongoose=require("mongoose");

const DB=process.env.DB
mongoose.connect(DB,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
 

}).then(()=>console.log('Database Connect'))
   .catch((error)=>console.log(error.message))