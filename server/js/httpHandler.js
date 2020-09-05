const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////

let messageQueue = null;
module.exports.initialize = (queue) => {
  messageQueue = queue;
};

//parameters: req(request) has method and url properties
//greet all the requests, send it to different places
//so we need to check request method to decide where it goes next
//we will send the response back to the client from here as well
//google writeHead and end for parameters and functionality


module.exports.router = (req, res, next = ()=>{}) => {
  console.log('Serving request type ' + req.method + ' for url ' + req.url);

  //once we know req.url, add && req.url === 'something'
  // if (req.method === 'GET') {
  //   //create random move
    // const validMessages = ['left', 'right', 'up', 'down'];
    // const index = Math.random() * validMessages.length;
    // const message = validMessages[index];

  //   //send the random move along
  //   res.writeHead(200, 'application/JSON');
  //   res.end(JSONstringify(message));
  // }

  if (req.method === 'GET' && req.url === '/') {
    // const validMessages = ['left', 'right', 'up', 'down'];
    // let index = Math.floor(Math.random() * validMessages.length);
    // let message = validMessages[index];

    res.writeHead(200, headers);
    res.end(messageQueue.dequeue());
  }

  if (req.method === 'OPTIONS') {
    res.writeHead(200, headers);
    res.end();
  }
  //send the random move along
  // res.writeHead(200, {'Content-Type': 'text/html'});
  // res.end('hello');
  //write function which directs req.method GET to randomMove function
  //write an http response with result from randomMove
  next(); // invoke next() at the end of a request to help with testing!
};
