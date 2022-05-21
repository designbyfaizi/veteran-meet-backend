const express = require("express");
const { default: mongoose } = require("mongoose");
require('dotenv').config({path: __dirname + '/.env'})

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
const communityRoutes = require("./routes/community");

app.use("/community", communityRoutes)

app.use("/", (req, res, next) => {
    res.send("This is the Home Route")
})
app.use("*", (req, res, next) => {
    res.send({message: "Error"})
})

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.3x9nf.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
      console.log("Connected to MongoDB")
    app.listen(port, () => {
      console.log(`Server started on PORT: ${port}`);
    });
  })
  .catch((err) => console.log(err));
