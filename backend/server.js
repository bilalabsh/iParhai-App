const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const mongoose=require('mongoose');
const colors=require('colors');
const userRoutes=require('./routes/userRoutes')
const {notFound,errorHandler}=require('./middlewares/errorHandler')
const app = express();
app.use(express.json());
//to accpet json data
app.use(cors());
app.use(bodyParser.json());


const connectDB=async()=>{
    try{
        console.log("Attempting to connect to MongoDB...");
        const con=await mongoose.connect(process.env.MONGO_URL,{
        });
        console.log(`Database connected: ${con.connection.host}`.cyan.underline);
       
    }catch(err){
        console.log(`Database connection error: , ${err.message}`.red.bold);
        console.log(err);
        process.exit(1);
    }
}
connectDB();

app.get("/", (req, res) => {
  res.json({ message: "Hello from the backend!" });
});

app.use('/api/user',userRoutes)
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`.yellow.bold);
});
