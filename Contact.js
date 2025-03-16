const mongoose=require("mongoose")

// mongoose
mongoose.connect("mongodb+srv://alan80904:Pallivathukkal@cluster0.ohehot2.mongodb.net/myDatabaseName?retryWrites=true&w=majority")

.then(()=>(
    console.log("contact")
))
.catch(err=>console.log("DB connection error:", err));


let mongoSchema=mongoose.Schema


const userSchema=new mongoSchema({
    name:String,
    email:String,
    message:String,   
   
})
var contact=mongoose.model("contact",userSchema)
module.exports=contact