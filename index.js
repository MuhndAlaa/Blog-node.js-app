const express = require('express');

//express app
const app = express();

//register view engine
app.set('view engine' , 'ejs');

//static files
app.use(express.static('public'));

// listen to port 5000
const PORT = 5000;

app.listen(PORT, console.log(`Goto http://localhost:${PORT}`));

app.get('/' , (req,res)=>{
    res.render('index' , {title:'Home'})
})

app.get('/blog/create' , (req,res)=>{
    res.render('create blog' , {title:'create post'})
})

app.get('/about' , (req,res)=>{
    res.render('about' , {title:'About'})
})

//404 page
app.use((req,res)=>{
    res.status(404).render('404' , {title:'404 page'})
})