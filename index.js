const express = require('express');
const path = require('path');
const port = 8000;

const db = require('./config/mongoose');

const Contact = require('./modals/contact')

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));

// // middleware1
// app.use(function(req, res, next){
//     req.myName="Yummmmy";
//     console.log('middleware 1 called');
//     next();
// });

// // middleware2
// app.use(function(req, res, next){
//     console.log('middleware 2 called');
//     console.log('My New Name,', req.myName);
//     // console.log(contactList.top());
//     next();
// });




var contactList = [
    {
        name: "Ross",
        phone: "11111"
    },
    {
        name: "Joey",
        phone: "22222"
    },
    {
        name: "Chandler",
        phone: "33333"
    }
]



// fetching contacts from database

app.get('/', async function (req, res) {
    try {
        const contacts = await Contact.find({});
        return res.render('home', {
            title: "Contact List",
            contact_list: contacts
        });
    } catch (err) {
        console.log('error in fetching contacts from db', err);
        return res.redirect('back');
    }
})



// fetching contacts from static array:contacts_list -

// app.get('/', function (req, res) {

//     return res.render('home', {
//         title: "Contact List",
//         contact_list: contactList
//     });
// })




app.get('/practice', function (req, res) {
    return res.render('practice', {
        title: "EJS playground"
    });
})



// used for non-db functioning-

// app.post('/create-contact', function(req, res){
//     // contactList.push({
//     //     name: req.body.name,
//     //     phone: req.body.phone
//     // })
//     // return res.redirect('/');
// // or
//     // contactList.push(req.body);
// })




// used to function with db now

app.post('/create-contact', async function createContact(req, res) {
    let id = req.query.id;
    const check_duplicate = await Contact.findById(id);

    if(check_duplicate!= null){
        return res.redirect('back');
    }

    try {
        const newContact = await Contact.create({
            name: req.body.name,
            phone: req.body.phone
        });
        // console.log('***', newContact);
        return res.redirect('back');
    } catch (err) {
        console.log('error in creating a contact:', err);
        return res.redirect('back');

    }
})




// delete database contacts

app.get('/delete-number', async function (req, res) {
    // get the id from query in url
    let id = req.query.id;

    // find the contact in the database using id and delete it

    try {
        // console.log(id);
        await Contact.findByIdAndDelete(id);
        return res.redirect('back');        
    } catch(error) {
        console.log('error in deleting from database');
        return res.redirect('back');
    }

});




// deleting static array contact

// app.get('/delete-number/:phone&:name', function (req, res) {
//     // console.log(req.params);
//     let phone = req.params.phone;
//     let contactIndex = contactList.findIndex(contact => contact.phone == phone);

//     if (contactIndex != -1) {
//         contactList.splice(contactIndex, 1);
//     }

//     return res.redirect('back');
// });



// delete last contact in list 

// app.post('/delete-contact', function(req, res){
//     contactList.pop();
//     return res.redirect('back');
// })





app.listen(port, function (err) {
    if (err) {
        console.log("error in running server", err);
    }
    console.log("Yup ,express server is running on port:", port);
})



