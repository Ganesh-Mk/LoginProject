require('dotenv').config();

const mongoose = require('mongoose');

// mongoose.connect("mongodb://127.0.0.1:27017/LoginDB");

 

const PORT = process.env.PORT || 3000;
const connectDB = async () => {
  try{
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`)
  }
  catch(err){
    console.log(err);
    process.exit(1);
  }
}

const userScheme = mongoose.Schema({
    name: String,
    email: String,
    password: String
});  

connectDB().then(() => {
    console.log(`Listening on PORT: ${PORT}`);
})
        

module.exports = mongoose.model("usersModel", userScheme);      