//requires Express library
const express = require('express')
const mongoose = require('mongoose')
const ShortUrl = require('./models/shortUrl')
const app = express()

//Set up default mongoose connection

mongoose.connect('mongodb://127.0.0.1:27017/urlShortener', {useNewUrlParser: true, useUnifiedTopology: true});

app.set('view engine','ejs')
app.use(express.urlencoded({ extended: false }))
app.get('/',async(req,res)=> {
    const shortUrls = await ShortUrl.find()
    res.render('index',{shortUrls:shortUrls})
})

app.post('/shortUrls',async(req,res)=>{
    //wait until shortening URL is completed
   await ShortUrl.create({full:req.body.fullUrl})
   //redirect back to home page
   res.redirect('/')
   res.setHeader('Content-Type', 'application/json');
   res.end(JSON.stringify({ a: 1 }, null, 3));
})
// var http = require('http');

/* var app = http.createServer(function(req,res){
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ a: 1 }, null, 3));
}); */
app.get('/:shortUrl',async(req,res)=>{
   const shortUrl = await ShortUrl.findOne({short: req.params.shortUrl})
   if (shortUrl ==null){
       return res.sendStatus(404)
   }
   res.redirect(shortUrl.full)
})
app.listen(process.env.PORT||5000);