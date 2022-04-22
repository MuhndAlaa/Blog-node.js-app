const express = require('express');
const { param } = require('express/lib/request');
const mongoose = require('mongoose');
const Blog = require('./models/blog');
require('dotenv').config();


// listen to port 5000
const PORT = process.env.PORT;
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;

//express app
const app = express();


//connect to DB
const dbURI = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@blogdb.7uqkr.mongodb.net/Blog-node?retryWrites=true&w=majority`;

mongoose.connect(dbURI)
.then((result)=>{
    console.log('connected to db')
    app.listen(PORT, console.log(`Goto http://localhost:${PORT}`));
}).catch((err)=>{
    console.log("something went wrong")
})

//register view engine
app.set('view engine' , 'ejs');

//static files
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}))



app.get('/' , (req,res)=>{
    res.redirect('/blogs')
})

app.get('/blogs' , (req,res)=>{
    Blog.find()
    .sort({createdAt:-1})
    .then(result=>{
        res.render('index' , {title:'all Blogs' , blogs:result})
    })
    .catch(err=>{
        console.log(err)
    })
    
})


app.post('/blogs' , (req,res)=>{

    const blog = new Blog(req.body)
    blog.save()
    .then(result=>{
        res.redirect("/blogs")
    })
    .catch(err=>{
        console.log(err)
    })
    
})

app.get('/blogs/:id' , (req,res)=>{
    const id = req.params.id;
    Blog.findById(id)
    .then(result=>{
        app.render('details' , {title:'details' , blog:result})
    })
    .catch(err=>{
        console.log(id)
    })
})

app.get('/blogs/create' , (req,res)=>{
    res.render('create blog' , {title:'create post'})
})

app.get('/about' , (req,res)=>{
    res.render('about' , {title:'About'})
})

//404 page
app.use((req,res)=>{
    res.status(404).render('404' , {title:'404 page'})
})
