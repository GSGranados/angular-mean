const path = require('path');
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const postRoutes = require('./routes/posts')

//Declare express for the Application
const app = express();

//Define a body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use("/images", express.static(path.join("backend/images")));

//Mongoose Connect
mongoose
  .connect(
    "mongodb+srv://jeager:Zywktof2NHaLOiZH@angular-mean-postsdb.dbx2x.mongodb.net/angular-posts?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to Angular MEAN DB");
  })
  .catch(() => {
    console.log("Connection Failed, check the cluster availability");
  });

//CORS Configuration
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, PUT, OPTIONS"
  );
  next();
});

//ROUTE PREFIX
app.use("/api/posts",postRoutes);

module.exports = app;
