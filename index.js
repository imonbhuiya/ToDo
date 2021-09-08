const express = require('express');
const mongoose = require('mongoose');


//load model

const Todo = require('./models/todo');

const app = express();

const port = 5000;

//mongoDB connection

mongoose.connect('mongodb://localhost/todolist',{
    useNewUrlParser:true, useUnifiedTopology:true


}).then(()=>{
    console.log('Mongodb is connected......')
})


//middlewars

app.set('view engine','ejs')
app.use(express.json());
app.use(express.urlencoded({extended:false}))

//Index route 

app.get('/',async(req,res)=>{

    //get todos
    const todos = await Todo.find({}).sort('-date');
    res.render("index",{todos})
})


app.get('/:id/delete',async(req,res)=>{

    //get todos
    const todo = await Todo.findByIdAndDelete(req.params.id)
    res.redirect('/');
})

// post 

app.post('/',async(req,res)=>{
   const text= req.body.text.trim();
   if(text === '')
   { 
       return res.redirect('/');
    }
    let newTodo = new Todo (
        {
            text
        });
        await newTodo.save();
        res.redirect('/');
  })
//about route
app.get('/about',(req,res)=>{
    res.render("about")
})



app.listen(port,() =>{
 console.log("server is live on port",port);
})