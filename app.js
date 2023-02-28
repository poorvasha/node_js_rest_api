const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv/config");

const postsRoute = require("./routes/posts");

const app = express();

app.use(bodyParser.json());

app.use("/posts", postsRoute);
app.get("/", (req, res) => res.send("WE ARE ON HOME"));
mongoose.set("strictQuery", false);
// connect to DB
mongoose.connect(
  process.env.DB_CONNECTION,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (error) => {
    if(error){
      return console.log(error);
    }
    console.log("Database connected!");
  },
  
);

// listen
app.listen(3001);
