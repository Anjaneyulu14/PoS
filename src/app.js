const express = require("express")
const bodyParser = require('body-parser');
const mongoose = require("mongoose")
const app = express()
var cors = require('cors');

app.use(cors())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const userRoutes = require("./apis/users/userRoutes")

let dburl = ""
console.log(process.env.MONGO_URL)

if(process.env.MONGO_URL){
    dburl = process.env.MONGO_URL;
}
else{
    dburl = "mongodb://localhost:27017/pos";
}
mongoose.connect(dburl)
    .then((res) => {
        app.listen(3000)
        console.log("Conneceted to db");
    })
    .catch((err) => console.log("Error connecting to db"))
// app.listen(3000)

app.use("/user", userRoutes)

module.exports = app;
