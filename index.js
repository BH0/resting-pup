const express = require("express");
const puppeteer_tasks = require("./puppeteer-tasks");  
const app = express();

const port = 5000;

// Body parser
app.use(express.urlencoded({ extended: false }));

// https://vercel.com/docs/cli#commands/env 
// to add secrets via vercel cli: vercel add secret my-secret my-secret-value
console.log(process.env.MYSECRET); 

// Home route (note: now.json is outdated)
app.get("/", (req, res) => {
  res.send("Welcome to a basic express App");
}); 

// /count?url='http://google.com'&element='div' // should this be URL encoded?  
app.get("/count", (req, res) => {
  (async () => {
    let count = await puppeteer_tasks.element_count("http://google.com", "div");
    // console.log(count); 
    res.send(count.toString()); // perhaps this should be sent back as JSON 
  })(); 
}); 

// /exists?url='http://google.com'&element='div' // should this be URL encoded?  
app.get("/exists", (req, res) => {
  (async () => {
    let exists = await puppeteer_tasks.element_exists("http://google.com", "div");
    // console.log(exists); 
    res.send(exists); 
  })(); 
}); 

// Listen on port 5000
app.listen(port, () => {
  console.log(`Server is running on port 5000
Visit http://localhost:5000`);
});

