const express = require("express");
const bodyParser = require("body-parser")

//Declare express for the Application
const app = express();

//Define a body parser
app.use(bodyParser.json());

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


//SAVE A POST
app.post('/api/posts', (req, res, next) => {
  const post = req.body;
  console.log(post);
  res.status(201).json({
    message: "POST ADDED SUCCESSFULLY!"
  });
})


//GET POSTS

app.get("/api/posts", (req, res, next) => {
  const posts = [
    {
      id: "123456",
      title: "first server side post",
      content: "this is coming from the server",
    },
    {
      id: "654321",
      title: "second server side post",
      content: "this is coming from the server",
    },
    {
      id: "654123",
      title: "third server side post",
      content: "this is coming from the server",
    },
  ];
  res.status(200).json({
    messag: "Post fetched succesfully!",
    posts: posts,
  });
});

module.exports = app;
