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
  //console.log('Serving request type ' + req.method + ' for url ' + req.url);

  if (req.method === 'GET') {
    if (req.url === '/') {
      res.writeHead(200, headers);
      res.end(messageQueue.dequeue());
      next();
    } else if (req.url === '/background.jpg') {
      fs.readFile(module.exports.backgroundImageFile, (err, data) => {
        if (err) {
          res.writeHead(404, headers);
        } else {
          res.writeHead(200, headers);
          res.write(data, 'binary');
        }
        res.end();
        next();
      })
    }
  }

  if (req.method === 'POST' && req.url === '/background.jpg') {
    var fileStorage = Buffer.alloc(0);
    req.on('data', (chunk) => {
      //Buffer concats differently from array.
      fileStorage = Buffer.concat([fileStorage, chunk]);
    })

    req.on('end', () => {
      var file = multipart.getFile(fileStorage);
      fs.writeFile(module.exports.backgroundImageFile, file.data, (err, data) => {
        if (err) {
          res.writeHead(400, headers);
          res.end();
        } else {
          res.writeHead(201, headers);
          res.end();
        }
        next();
      })
    })
  }

  if (req.method === 'OPTIONS') {
    res.writeHead(200, headers);
    res.end();
    next();
  }
 // invoke next() at the end of a request to help with testing!
};
