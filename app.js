const express = require('express');
const mongoose = require('mongoose');
const app = express();
const Post = require('./models/Post');

//Connect DB
mongoose.connect('mongodb://localhost/blog-db', {
  
});

//Template Engine
app.set("view engine", "ejs");

//MIDDLEWARES
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get("/" , async (req,res) => {
  const posts = await Post.find({});
  res.render("index", {
    posts
  });
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/add', (req, res) => {
  res.render('add_post');
});

app.get('/post', (req, res) => {
  res.render('post');
});

app.post('/blog-posts', async (req, res) => {
  await Post.create(req.body);
  res.redirect('/');
});

const port = 5000;


app.listen(port, () => {
  console.log(`Sunucu ${port} numaralı portta başlatıldı`);
});