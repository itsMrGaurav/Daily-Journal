
// modules
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');
const toProperCase = require(__dirname + '/propercase.js');


// create an instance of express app
const app = express();


// setting up the express app
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


// js vars
const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";
const contents = [];


// handle get requests
app.get('/', (req, res) => {

  res.render('home', {topContent: homeStartingContent, contents: contents});  

})

app.get('/posts/:title', (req, res) => {


  const paramTitle = (req.params.title).replace('-', ' ')
  for (const content of contents){
    if (content.title.toLowerCase() === paramTitle){
      res.render('post', {content: content});
    }
  }

})

app.get('/about', (req, res) => {

  res.render('about', {content: aboutContent});

})

app.get('/contact', (req, res) => {

  res.render('contact', {content: contactContent});

})

app.get('/compose', (req, res) => {

  res.render('compose');

})


// handle post requests
app.post('/', (req, res) => {

  const reqTitle = req.body.contentTitle;
  const reqBody = req.body.contentBody;

  if (reqTitle != '' && reqBody != ''){    
    const newPost = {
      title: (_.lowerCase(reqTitle).toProperCase()),
      body: reqBody
    }
    contents.push(newPost);
  }
  
  res.redirect('/');

})


// set up a port
app.listen(3000, function() {
  console.log("Server started on port 3000");
});
