const mongoose=require("mongoose")

// mongoose
mongoose.connect("mongodb+srv://alan80904:Pallivathukkal@cluster0.ohehot2.mongodb.net/myDatabaseName?retryWrites=true&w=majority")

.then(()=>(
    console.log("Login and signup for user is connected")
))
.catch(err=>console.log("DB connection error:", err));


let mongoSchema=mongoose.Schema


const userSchema=new mongoSchema({
    name:String,
    email:String,
    number:Number,
    address:String,
    password:String,
    verified: { type: Boolean, default: false },
   
})
var signup=mongoose.model("signup",userSchema)
module.exports=signup