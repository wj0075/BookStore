const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const book = require('./routes/books');
let app = express();
app.use(express.static(path.join(__dirname,'/')));
app.use(bodyParser.json());
app.use('/books',book);
app.get('/',function (req, res) {
   res.sendFile(path.join(__dirname,'index.html'))
});
app.listen(9090);