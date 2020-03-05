const express = require('express')
const bodyParser = require('body-parser')
const Sequelize = require('sequelize')

const router = express.Router()

const { Post } = require('../database')

router.use(bodyParser.json());

router.post("/posts", async (req, res) => {
    let post = await Post.create({
      author: req.body.author,
      posts: req.body.posts
    }).then(data=>res.send(data));
    
  });
  
  router.get("/posts", async (req, res) => {
    let post = await Post.findAll({
      order: [["id", "DESC"]]
    })
      .then(posts => posts)
      .catch(error => error);
    res.json(post);
  });

  router.post("/like/:id", async (req, res) => {
    // console.log(req.params.id);
  
    Post.findOne({ where: { id: req.params.id } })
      .then(result => {
        if (result) {
          var newArr = [req.body.name];
          var arr = newArr.concat(result.like);
        
          // console.log(result);
          Post.update(
            {
              author: result.author,
              posts: result.posts,
              images: result.images,
              like: arr,
              comment: result.comment
            },
            { where: { id: req.params.id } }
          )
            .then(resp => res.json(resp))
            .catch(err => console.log(err));
        }
      })
      .catch(err => console.log(err));
  });

  router.post("/dislike/:id", async (req, res) => {
    // console.log(req.params.id);
  
    Post.findOne({ where: { id: req.params.id } })
      .then(result => {
        const index = result.like.indexOf(req.body.name);
        // console.log("ind" + index);
        var newArr = result.like;
        newArr.splice(index, 1);
       
        // console.log(newArr);
        Post.update(
          {
            author: result.author,
            posts: result.posts,
            images: result.images,
            like: newArr,
            comment: result.comment
          },
          { where: { id: req.params.id } }
        )
          .then(resp => res.json(resp))
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  });

  router.post("/comment/:id", async (req, res) => {
    // console.log(req.params.id);
  
    Post.findOne({ where: { id: req.params.id } })
      .then(result => {
        if (result) {
          var newArr = [{ author: req.body.author, comment: req.body.comment }];
          var arr = newArr.concat(result.comment);
         
          Post.update(
            {
              author: result.author,
              posts: result.posts,
              images: result.images,
              like: result.like,
              comment: arr
            },
            { where: { id: req.params.id } }
          )
            .then(resp => res.json(resp))
            .catch(err => console.log(err));
        }
      })
      .catch(err => console.log(err));
  });

  router.get("/comments/:id", async (req, res) => {
    let PostData = await Post.findAll({
      where: { id: { [Sequelize.Op.eq]: req.params.id } }
    });
    // console.log(PostData);
    res.json(PostData[0].dataValues);
  });


module.exports = router;
