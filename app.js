const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const app = express();
const pageController = require('./controllers/pageController');
const postController = require('./controllers/postController');

//Connect DB
mongoose.connect('mongodb://localhost/blog-db');

//Template Engine
app.set("view engine", "ejs");

//MIDDLEWARES
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(methodOverride('_method', {
  methods: ['GET', 'POST']
}));

//PAGES
app.get('/about', pageController.getAboutPage);
app.get('/add', pageController.getAddPage);
app.get('/edit/:id', pageController.getPostEditPage);


app.get("/" , postController.getAllPosts);
app.get('/posts/:id', postController.getPost);
app.post('/blog-posts', postController.createPost);
app.put('/post-update', postController.updatePost);
app.delete('/delete-post/:id', postController.deletePost);

const port = 5000;

app.listen(port, () => {
  console.log(`Sunucu ${port} numaralı portta başlatıldı`);
});





