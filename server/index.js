const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const routes = require("./routes/routes");


dotenv.config();
app.use(express.json());


mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/", routes);
app.use("/register", routes);


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
