const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');

require('dotenv').config()

const app = express();
app.use(bodyParser.json());

const screenshotRouter = require('./routes/screenshot');

// Enable CORS for all routes
app.use(cors());

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Handle CORS preflight requests
app.options('*', cors());

app.use('/screenshot', screenshotRouter);


module.exports = app