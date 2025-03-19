const express=require('express')
const router=express.Router();
const cors=require('cors');
const signup=require('./Signup')
const adminsignup=require('./Signupad')
const offical=require('./Officeuser')
const addmedi=require('./Addmedi')
const addfood=require('./Addfood')
const contact=require('./Contact')
const feedback=require('./feedback')
const cart=require('./Cart')
const feedfive=require('./Feedfive')
const Order=require('./order')

const sendEmail=require("./utils/sendEmail");
const crypto=require("crypto");

const app=new express()

app.use(express.urlencoded({extended:true}))
app.use (express.json())
app.use(cors())


// api for signup user
app.post('/add', async (req, res) => {
    const { email } = req.body;
    
    // Check if the email already exists in the database
    const existingUser = await signup.findOne({ email });
    if (existingUser) {
        return res.status(400).send("Email already exists");
        
    }else{

    
    const result = new signup(req.body);
    await result.save();
    res.send("Data added");
    }
});




//api for login user

app.post("/login",(req,res)=>{
    const{email,password}=req.body;
    signup.findOne({email :email})
    .then(user =>{
        if(user){
            if(user.password === password){
                res.json("successful")
            }else{
                res.json("password is incorrect")
            }
        }else{
            res.json("no data existed/  incorrect email")
        }
       
})
})
//api for signup admin
app.post('/addadmin', async (req, res) => {
    const { email } = req.body;
    
    // Check if the email already exists in the database
    const existingUser = await adminsignup.findOne({ email });
    if (existingUser) {
        return res.status(400).send("Email already exists");
        
    }else{

    
    const result = new adminsignup(req.body);
    await result.save();
    res.send("Admin is added");
    }
});


//api for login admin
app.post("/adminlogin",(req,res)=>{
    const{email,password}=req.body;
    adminsignup.findOne({email :email})
    .then(user =>{
        if(user){
            if(user.password === password){
                res.json("successful")
            }else{
                res.json("password is incorrect")
            }
        }else{
            res.json("no data existed/  incorrect email")
        }
       
})
})




// api for offical user


app.post("/addoffical", async (req, res) => {
    try {
        
        const result = new offical(req.body);
        await result.save(); // ✅ Ensure save completes before continuing

        const { username, email, userid, password, category} = req.body;

        // ✅ Send email with ID and password
        const emailSubject = "Your Office User Credentials";
        const emailText = `
        Hello ${username},

        Your office user account has been created successfully.
        Here are your login credentials:

        User ID: ${userid}
        Password: ${password}
        Section: ${category}

        Please keep this information secure.

        Best regards,
        Your Admin Team
        `;

        await sendEmail(email, emailSubject, emailText);

        res.status(201).json({ message: "Office user created and email sent successfully" });
    } catch (error) {
        console.error("Error creating office user:", error);
        res.status(500).json({ message: "Failed to create office user" });
    }
});


  
//api for view offical user food

app.get('/view', async (req, res) => {
    try {
        let result = await offical.find({ category: "food" }); 
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});
//api for delete offical user food
app.delete('/remove/:id',async(req,res)=>{
    console.log(req.params);
    let id = req.params.id
    await offical.findByIdAndDelete(id);
    res.send("Deleted")
  
  })

//api for view offical user medi
  app.get('/viewmedi', async (req, res) => {
    try {
        let result = await offical.find({ category: "medicine" }); 
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

//api for  food login admin
app.post("/fooduserlogin", (req, res) => {
    const { userid, password } = req.body;
    offical.findOne({ userid: userid })
      .then(user => {
        if (user) {
          if (user.password === password) {
            if (user.category === "food") {
              res.json("successful");
            } else {
              res.json("Unauthorized: Not a food user");
            }
          } else {
            res.json("password is incorrect");
          }
        } else {
          res.json("no data existed/ incorrect ID");
        }
      })
      .catch(err => {
        console.error(err);
        res.json("Server error. Please try again later.");
      });
  });

  //api for  medicine login admin
app.post("/mediuserlogin", (req, res) => {
    const { userid, password } = req.body;
    offical.findOne({ userid: userid })
      .then(user => {
        if (user) {
          if (user.password === password) {
            if (user.category === "medicine") {
              res.json("successful");
            } else {
              res.json("Unauthorized: Not a food user");
            }
          } else {
            res.json("password is incorrect");
          }
        } else {
          res.json("no data existed/ incorrect ID");
        }
      })
      .catch(err => {
        console.error(err);
        res.json("Server error. Please try again later.");
      });
  });
  








//api for delete offical user food
app.delete('/removemedi/:id',async(req,res)=>{
    console.log(req.params);
    let id = req.params.id
    await offical.findByIdAndDelete(id);
    res.send("Deleted")
  
  })


// API for adding medicine
app.post('/addmedi', async (req, res) => {
    try {
        const result = new addmedi({
            ...req.body,
            base: "medicine" // Always set base to "medicine"
        });

        await result.save();
        res.send("Data added");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});



//api for view,update,delete medi
app.get('/getmedi',(req,res)=>{
    addmedi.find()
    .then(user=> res.json(user))
    .catch(err=> res.json(err))
})


//api for delete medi
app.delete('/removemedi1/:id',async(req,res)=>{
    console.log(req.params);
    let id = req.params.id
    await addmedi.findByIdAndDelete(id);
    res.send("Deleted")
  
  })
//api for update

  
app.put('/edit/:id',async(req,res)=>{
    let id = req.params.id
    await addmedi.findByIdAndUpdate(id,req.body);
    res.send("updated")
    })



//api foe add food

    app.post('/addfood', async (req, res) => {
        try {
            const result = new addfood({
                ...req.body,
                base: "food" // Always set base to "food"
            });
            
            await result.save();
            res.send("Data added");
        } catch (error) {
            console.error(error);
            res.status(500).send("Internal Server Error");
        }
    });


// api for view food
app.get('/getfood',(req,res)=>{
    addfood.find()
    .then(user=> res.json(user))
    .catch(err=> res.json(err))
})


//api for delete food
app.delete('/removefood/:id',async(req,res)=>{
    console.log(req.params);
    let id = req.params.id
    await addfood.findByIdAndDelete(id);
    res.send("Deleted")
  
  })

//api for update food
  app.put('/editfood/:id',async(req,res)=>{
    let id = req.params.id
    await addfood.findByIdAndUpdate(id,req.body);
    res.send("updated")
    })


  // api for veiw only mroning food

  app.get('/viewmrng', async (req, res) => {
    try {
        let result = await addfood.find({ category: "Breakfast" }); 
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

// api for veiw only lunch

app.get('/viewlunch', async (req, res) => {
    try {
        let result = await addfood.find({ category: "Lunch" }); 
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});
// api for veiw only Snacks

app.get('/viewsnacks', async (req, res) => {
    try {
        let result = await addfood.find({ category: "Snacks" }); 
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

// api for veiw only Dinner

app.get('/viewdinner', async (req, res) => {
    try {
        let result = await addfood.find({ category: "Dinner" }); 
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

//api for veiw only specials

app.get('/viewspecials', async (req, res) => {
    try {
        let result = await addfood.find({ category: "Specials" }); 
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

//api for view Pain Relief
app.get('/viewpainrelief', async (req, res) => {
    try {
        let result = await addmedi.find({ category: "Pain Relief" }); 
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

//api for view Cold & Flu
app.get('/viewColdFlu', async (req, res) => {
    try {
        let result = await addmedi.find({ category: "Cold & Flu" }); 
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});
//api for view supplements
app.get('/viewsupplements', async (req, res) => {
    try {
        let result = await addmedi.find({ category: "Supplements" }); 
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

//api for view allergy
app.get('/viewallergy', async (req, res) => {
    try {
        let result = await addmedi.find({ category: "Allergy" }); 
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});
//api for view 1st aid
app.get('/viewaid', async (req, res) => {
    try {
        let result = await addmedi.find({ category: "FirstAid" }); 
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

// api for add contactUS

app.post('/contact',async(req,res)=>{
    const result=await new contact(req.body);
    result.save();
    res.send("data added")
})
//api veiw contact as in admin
app.get('/getcontact',(req,res)=>{
    contact.find()
    .then(user=> res.json(user))
    .catch(err=> res.json(err))
})

// api for add feedback from user
app.post('/feedback',async(req,res)=>{
    const result=await new feedback(req.body);
    result.save();
    res.send("data added")
})
//api veiw feedback as in admin
app.get('/getfeedback',(req,res)=>{
    feedback.find()
    .then(user=> res.json(user))
    .catch(err=> res.json(err))
})


//api for view rating in 5

app.get('/viewfivestar', async (req, res) => {
    try {
        let result = await feedback.find({ rating: "5" }); 
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

//api for save 5 star rating that admin wants to add to our fontend page
app.post('/addfeedfive', async (req, res) => {
    try {
        const result = await new feedfive(req.body);
        await result.save();
        res.send("Data added");
    } catch (error) {
        if (error.code === 11000) { // Check if the error is a duplicate key error
            res.status(400).send("This item is already in the main page.");
        } else {
            res.status(500).send("Internal Server Error");
        }
    }
});

// api of view 5 five rating that admin selected
app.get('/getfeedfive',(req,res)=>{
    feedfive.find()
    .then(user=> res.json(user))
    .catch(err=> res.json(err))
})

//api for removing main apge feedback
//api for delete food
app.delete('/removefeed/:id',async(req,res)=>{
    console.log(req.params);
    let id = req.params.id
    await feedfive.findByIdAndDelete(id);
    res.send("Deleted")
  
  })


//api for add items in cart

app.post('/addcart', async (req, res) => {
    try {
        const result = await new cart(req.body);
        await result.save();
        res.send("Data added");
    } catch (error) {
        if (error.code === 11000) { // Check if the error is a duplicate key error
            res.status(400).send("This item is already in the cart.");
        } else {
            res.status(500).send("Internal Server Error");
        }
    }
});

// api for veiw cart
app.get('/getcart',(req,res)=>{
    cart.find()
    .then(user=> res.json(user))
    .catch(err=> res.json(err))
})

// delete a item from cart

app.delete('/removefromcart/:id',async(req,res)=>{
    console.log(req.params);
    let id = req.params.id
    await cart.findByIdAndDelete(id);
    res.send("Deleted")
  
  })

  //convert cart to order


  app.post('/addorder', async (req, res) => {
    try {
        const { foodItems, totalPrice, email, name, phone, altphone } = req.body;

        // Generate a unique numeric ID and a 6-digit OTP
        const id = Math.floor(1000 + Math.random() * 9000); // Unique 4-digit ID
        const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP

        // Create a new Order instance with the received data
        const order = new Order({
            foodItems: foodItems,
            totalPrice: totalPrice,
            email: email,
            name: name,
            phone: phone,
            altphone: altphone,
            otp: otp,
            id: id,
        });

        // Save the order to the database
        await order.save();

        // Log foodItems, totalPrice, ID, and OTP
        console.log("Food items:", foodItems);
        console.log("Total price:", totalPrice);
        console.log("Order ID:", id);
        console.log("OTP:", otp);

        // ✅ Send email with ID and OTP
        const emailSubject = "Order Confirmation";
        const emailText = `
        Hello ${name},

        Your order has been successfully verified.
        Here are your order details:

        Order ID: ${id}
        OTP: ${otp}
        Items: ${foodItems.join(", ")}
        Total Price: $${totalPrice}

        Please keep the OTP secure as you will need it for order verification.

        Best regards,
        Your  Team Careweb
        `;

        await sendEmail(email, emailSubject, emailText);

        res.status(201).json({ message: "Order created and email sent successfully" });
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ message: "Failed to create order" });
    }
});

// api for delete al thing from cart after adding to order
app.delete('/removeAll', async (req, res) => {
    try {
        // Remove all documents from the collection
        await cart.deleteMany({});

        // Respond with success message
        res.status(200).json({ message: 'All data removed successfully.' });
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error.' });
    }
});
//api from only view food item in oder

app.get('/get',(req,res)=>{
    Order.find()
    .then(user=> res.json(user))
    .catch(err=> res.json(err))
})

app.post("/otp", (req, res) => {
    const { id, otp } = req.body;
    
    // Validate input
    if (!id || !otp) {
        return res.json("Missing ID or OTP");
    }

    Order.findOne({ id: id })  // Find order by ID
        .then(order => {
            if (order) {
                // Convert both to strings to ensure correct comparison
                if (String(order.otp) === String(otp)) {
                    // Delete the order after successful OTP verification
                    Order.deleteOne({ id: id })
                        .then(() => res.json("successful"))
                        .catch(err => {
                            console.error("Error deleting order:", err);
                            res.json("Error deleting order");
                        });
                } else {
                    res.json("otp is incorrect");
                }
            } else {
                res.json("no data existed/incorrect id");
            }
        })
        .catch(err => {
            console.error("Error finding order:", err);
            res.json("Error finding order");
        });
});





//create a localhost port
app.listen(4040,()=>{
    console.log("port is running at 4040")
})

module.exports = router;