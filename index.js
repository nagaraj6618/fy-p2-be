const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const authRoute = require("./routes/authRoute");
const grammarChatHistoryRoute = require("./routes/grammarChatHistoryRoute");

require("dotenv").config();

const PORT = process.env.PORT || 8000

app.use(cors());
app.use(express.json());

//DB connection
function dbConnection () {
   mongoose.connect(process.env.MONGODB_URL)
   .then(()=> console.log('DB Connected'))
   .catch((error)=>console.log('DB not connected:',error));
}
dbConnection();

app.use("/api/v1/auth",authRoute);
app.use("/api/v1/grammar-chat-history",grammarChatHistoryRoute);
app.get("/",(req,res) => {
   return res.status(200).json({
      message:"Server Running..."
   })
});

app.listen(PORT, () => {
   console.log("Server Started..")
})