const mongoose=require("mongoose")

// mongoose
mongoose.connect("mongodb+srv://alan80904:Pallivathukkal@cluster0.ohehot2.mongodb.net/myDatabaseName?retryWrites=true&w=majority")

.then(()=>(
    console.log("connecting add offical users food and medi")
))
.catch(err=>console.log("DB connection error:", err));


let mongoSchema=mongoose.Schema


const userSchema=new mongoSchema({
    username:String,
    email:String,
    userid:Number,
    password:String,
    category:String,
   
})
var offical=mongoose.model("office",userSchema)
module.exports=offical