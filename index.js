const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const PORT = require('./config').PORT;
const DB_URI = require('./config').DB_URI;
const router = require('./router');
const mongoose = require('mongoose');

mongoose.connect(DB_URI);

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json({type: '*/*'}));

router(app);

const port = process.env.PORT || PORT;
app.listen(port);
console.log('Server listening on port ' + port);