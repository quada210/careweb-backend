const mongoose=require("mongoose")

// mongoose
mongoose.connect("mongodb+srv://alan80904:Pallivathukkal@cluster0.ohehot2.mongodb.net/myDatabaseName?retryWrites=true&w=majority")

.then(()=>(
    console.log("Login and signuo for admin is connected")
))
.catch(err=>console.log("DB connection error:", err));


let mongoSchema=mongoose.Schema


const userSchema=new mongoSchema({
    username:String,
    email:String,
    password:String,
   
})
var adminsignup=mongoose.model("adminsignup",userSchema)
module.exports=adminsignup