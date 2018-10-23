const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const sqlite3 = require("sqlite3").verbose();
// const multipart = require("connect-multiparty");
const cors = require("cors");
// const jwt = require("jsonwebtoken");
// const clientPath = path.join(__dirname, '../frontend');
const cookieParser = require('cookie-parser');
const api = require('./api');

const bcrypt = require("bcrypt");
const saltRounds = 10;

const PORT = process.env.PORT || 3128;


// app.use(express.static(clientPath));

// const multipartMiddleware = multipart();

function isEmpty(str) {
    return !str || 0 === str.length;
}

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/api', api);




// function isAsset(path) {
//     var pieces = path.split('/');
//     if (pieces.length === 0) { return false; }
//     var last = pieces[pieces.length - 1];
//     if (path.indexOf('/api') !== -1 || path.indexOf('/?') !== -1) {
//         return true;
//     } else if (last.indexOf('.') !== -1) {
//         return true;
//     } else {
//         return false;
//     }
// }

// app.get('*', function(req, res, next) {
//     if (isAsset(req.url)) {
//         return next();    
//     } else {        
//         res.sendFile(path.join(clientPath, 'index.html'));    
//     }
// }); 


// app.listen(process.env.PORT || 3000);

app.get("/", function (req, res) {
    res.send("<h1>Welcome to Invoicing App</h1>");
});



// app.get('*', function(req, res, next) {
//     if (isAsset(req.url)) {
//         return next();    
//     } else {        
//         res.sendFile(path.join(clientPath, 'build/webpack.dev.conf.js'));    
//     }
// }); 



app.listen(PORT, function () {
    console.log(`App running on localhost:${PORT}`);
});