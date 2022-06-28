const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
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
app.use(methodOverride('_method', {
  methods: ['GET', 'POST']
}));

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

app.get('/edit/:id', async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.render('edit', {
    post
  });
});

app.put('/post-update', async (req, res) => {
  await Post.findByIdAndUpdate(req.body.postId, {
    title: req.body.title,
    detail: req.body.detail
  });
  res.redirect('/');
});

app.delete('/delete-post/:id', async (req, res) => {
  await Post.deleteOne({
    _id: req.params.id
  });
  res.redirect('/');
});

app.get('/post', (req, res) => {
  res.render('post');
});

app.post('/blog-posts', async (req, res) => {
  await Post.create(req.body);
  res.redirect('/');
});

app.get('/posts/:id', async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.render('post', {
    post
  });
});

const port = 5000;


app.listen(port, () => {
  console.log(`Sunucu ${port} numaralı portta başlatıldı`);
});