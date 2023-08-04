// require lib
const mongoose = require('mongoose');

// connect to db
mongoose.connect('mongodb://127.0.0.1:27017/contact_list_db');

// accquire the connection for operations
const db = mongoose.connection;

// error checking
db.on('error', console.error.bind(console, 'Error connecting to DB'));
db.once('open', function(){
    console.log('Successfuly connected to db');
})