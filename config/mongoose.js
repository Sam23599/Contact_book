// require lib
const mongoose = require('mongoose');

// connect to db
mongoose.connect('mongodb+srv://satyamvirat:VhjdgBRmNepIAQsX@cluster0.vkjd2g0.mongodb.net/?retryWrites=true&w=majority');

// accquire the connection for operations
const db = mongoose.connection;

// error checking
db.on('error', console.error.bind(console, 'Error connecting to DB'));
db.once('open', function(){
    console.log('Successfuly connected to db');
})
