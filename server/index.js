const app = require('express')();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


// Define the promise library to use

mongoose.Promise = global.Promise;

// Setup database connection
mongoose.connect('mongodb://localhost/react-auth');


// Add middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());


// Add routes
app.use('/api', require('./routes/user'));


// Listen
const PORT = 7777
app.listen(PORT, () => { console.log(`Listening on ${PORT}`) })
