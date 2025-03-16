const mongoose=require("mongoose")

// mongoose
mongoose.connect("mongodb+srv://alan80904:Pallivathukkal@cluster0.ohehot2.mongodb.net/myDatabaseName?retryWrites=true&w=majority")

.then(()=>(
    console.log("order is connected")
))
.catch(err=>console.log("DB connection error:", err));


let mongoSchema=mongoose.Schema


const userSchema=new mongoSchema({
    foodItems: Array,
    totalPrice: Number,
    email:String,
    name:String,
    phone:Number,
    altphone:Number,
    otp:Number,
    id:Number,
   
})
var Order=mongoose.model("Order",userSchema)
module.exports=Order