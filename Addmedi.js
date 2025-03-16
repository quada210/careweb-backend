const mongoose=require("mongoose")

// mongoose
mongoose.connect("mongodb+srv://alan80904:Pallivathukkal@cluster0.ohehot2.mongodb.net/myDatabaseName?retryWrites=true&w=majority")

.then(()=>(
    console.log("add medi")
))
.catch(err=>console.log("DB connection error:", err));


let mongoSchema=mongoose.Schema


const userSchema=new mongoSchema({
    name:String,
    price:String,
    image:String,
    category:String,
    base:String,
    
   
   
})
var addmedi=mongoose.model("addmedi",userSchema)
module.exports=addmedi