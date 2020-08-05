const express = require ('express')
const router = express.Router();
const bodyParser = require("body-parser");
// Defining model from the Models Folder
const Post = require("../models/post");


//Define a body parser
router.use(bodyParser.json());


//SAVE A POST
router.post("", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });
  post.save().then((createdPost)=>{
    res.status(201).json({
      message: "POST ADDED SUCCESSFULLY!",
      postId: createdPost._id
    });
  });
});

//GET POSTS

router.get("", (req, res, next) => {
  Post.find()
  .then((documents) => {
    res.status(200).json({
      message: "Post fetched succesfully!",
      posts: documents
    });
  });
});

//DELETE A POST
router.delete("/:id", (req, res, next) => {
  Post.deleteOne({_id: req.params.id})
  .then((result)=>{
    console.log(result);
    res.status(200).json({
      message: "POST DELETED!"
    })
  });
})

//PUT METHOD

router.put("/:id", (req, res, next)=>{
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content
  })
  Post.updateOne({_id: req.params.id}, post).then(result => {
    console.log(result);
    res.status(200).json({
      message: "UPDATE SUCCESSFUL"
    })
  })
})

//GET ONLY ONE VALUE
router.get('/:id', (req, res, next)=>{
  Post.findById(req.params.id)
  .then((post)=>{
    if (post) {
      res.status(200).json(post)
    }else{
      res.status(400).json({
        message: "we could not find a post with that ID"
      })
    }

  });
})

module.exports = router;
