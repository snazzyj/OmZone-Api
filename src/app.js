require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const {NODE_ENV} = require('./config');
const userAuth = require('./auth/users-auth');
const medTrackerRouter = require('./medtracker/medtracker');

const app = express();

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());

app.use('/api/auth', userAuth) // post req for login and sign up
app.use('/api/medtracker', medTrackerRouter) // posts req to keep track of meditation times 

app.get('/', (req, res) => {
    res.send('Hello, world!');
});

app.use(function errorHandler(error, req, res, next) {
    let response;

    if(NODE_ENV === 'production') {
        response = {error: {message: 'server error'}}
    } else {
        response = {message: error.message, error}
    }
    res.status(500).json(response);
});

module.exports = app