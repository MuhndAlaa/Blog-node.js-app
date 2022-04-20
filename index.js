const express = require('express');
const { param } = require('express/lib/request');
const mongoose = require('mongoose');
const Blog = require('./models/blog');

// listen to port 5000
const PORT = 5000;

//express app
const app = express();

//connect to DB

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


//mongoose routes
// app.get('/add-blog',(req,res)=>{
//     const blog = new Blog({
//         title:'first blog',
//         snippet:'a snippet about Blog',
//         body:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus, velit?'
//     })

//     blog.save().then((result)=>{
//         res.send(result)
//     })
//     .catch((err)=>{
//         console.log(err)
//     })
// })

// app.get('/all-blogs' , (req,res)=>{
//     Blog.find()
//     .then(result=>{
//         res.send(result)
//     })
//     .catch(err=>{
//         console.log(err)
//     })
// })

app.get('/' , (req,res)=>{
    res.redirect('/blogs')
})

app.get('/blogs' , (req,res)=>{
    Blog.find()
    .sort({createdAt:-1})
    .then(result=>{
        res.send(result)
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
