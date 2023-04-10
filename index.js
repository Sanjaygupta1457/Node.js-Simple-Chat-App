const express = require('express');
const app= express();
const bodyParser = require('body-parser');
const fs = require('fs');
const { METHODS } = require('http');
app.use(bodyParser.urlencoded({extended:false}));
// app.use(express.json())

app.get('/login',(req,res)=>{
    res.send(`<form action="/" method="get" onsubmit="localStorage.setItem('username', document.getElementById('username').value)" ><input id="username" type="text" name="title"><button type="submit">add</button></form>`)
})

app.get('/',(req,res)=>{
     fs.readFile('username.txt',(err,data)=>{
        if(data){
            let chat=data.toString();
            console.log(chat)
            
            res.send(`${chat}<form action="/data" method="POST" onsubmit="document.getElementById('username').value=localStorage.getItem('username')"> <input type="text" name="message"><input type="hidden" name="username" id="username"><button type="submit">Chat</button></form>`)}
       else{
        res.send(`<form action="/data" method="POST" onsubmit="document.getElementById('username').value=localStorage.getItem('username')"> <input type="text" name="message"><input type="hidden" name="username" id="username"><button type="submit">Chat</button></form>`)
       }
        
    })
    
})
app.post('/data',(req,res)=>{
   const username=req.body.username;
   const message =req.body.message;
   fs.writeFile('username.txt',`${username}:${message}`,{flag:'a'},(err)=>{
    if (err) throw err;
    res.redirect('/')
   })
   
  
 
 
})

app.listen(3000);