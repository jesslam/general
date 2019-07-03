'use strict'
const express = require("express");
const bodyParser = require("body-parser")
const app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public')); // set location for static files
app.use(bodyParser.urlencoded({extended: true})); // parse form submissions

const handlebars =  require("express-handlebars");
app.engine(".html", handlebars({extname: '.html', defaultLayout: false}));
app.set("view engine", ".html");

// send static file as response
/* app.get('/', (req, res) => {
console.log(req.query)
 res.type('text/html');
 res.sendFile(__dirname + '/public/home.html'); 
}); */

// send content of 'home' view
app.get('/', (req,res) => {
    res.render('home', {name: req.query.name});
   });

// send plain text response
app.get('/about', (req, res) => {
 res.type('text/plain');
 res.send('About  ' + req.query.name + '\'s page');
});

// handle form submit response
app.post('/detail', (req, res) => {
    console.log(req.body.username)
    res.type('text/plain');
    res.render('detail', {name: req.body.username});
   });

// define 404 handler
app.use( (req,res) => {
 res.type('text/plain'); 
 res.status(404);
 res.send('404 - Not found');
});

app.listen(app.get('port'), () => {
 console.log('Express started at ' + __dirname); 
});

app.get('/get', (req, res) => {
    console.log(req.query); // display parsed querystring object
  });

  app.post('/get', (req, res) => {
    console.log(req.body); // display parsed form submission
  });

