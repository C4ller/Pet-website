const express = require('express');
const app = express();
const session = require('express-session');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const flash = require('connect-flash');
const fs = require('fs');

app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(expressLayouts);
app.use(session({ secret: 'C4ller', saveUninitialized: true }));
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));

app.set('layout', 'partials/layout');
app.set('view engine', 'ejs');


app.get('/', (req, res) => {
  res.render('home', { title: 'Home', currentPage : "/" });
});

app.get('/adopt', (req, res) => {
    res.render('adopt', { title: 'Adoption', currentPage : "/adopt"});
});

app.get('/dogcare', (req, res) => {
    res.render('dogcare', { title: 'Caring for your dog', currentPage : "/dogcare" });
});

app.get('/catcare', (req, res) => {
    res.render('catcare', { title: 'Caring for your cat', currentPage : "/catcare" });
});

app.get('/giveaway', (req, res) => {
    if(!req.session.username){
        return res.redirect('/login');
    }
    res.render('give', { title: 'Put up for adoption', currentPage : "/giveaway" });
});

app.get('/contact', (req, res) => {
    res.render('contact', { title: 'Contact', currentPage : "/contact" });
});

app.get('/disclaimer', (req, res) => {
    res.render('disclaimer', { title: 'Disclaimers', currentPage : "/" });
});

app.get('/account', (req, res) => {
    res.render('account', { title: 'Account creation', currentPage : "/account" });
});

app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log('Error destroying session:', err);
        } else {
            res.redirect('/', {message : "Logged out successfully."});
        }
    });
});

app.post('/creation', (req, res) => {
    const {username, password} = req.body;
    fs.readFile('data/login.txt', 'utf8', (err, data) => {
        if(err) {
            console.error('Error reading file', err);
        } else {
            if(data.split(("\n").some(line => line.split(":")[0] === username))) {
                fs.appendFile('data/login.txt', `${username}:${password}\n`, (err) => {
                    if (err) console.error('Error appending to file', err)
                });
                res.render('account', {title: 'Account creation', message: 'Account created successfully! You can now login whenever you are ready!'});
                
            } else {
                res.render('account', {title: 'Account creation', warning: 'Username already exists try again with a different one.'})
            }
            
        }
    });
});

app.get('/login', (req, res) => {
    if (req.session.username) {
        return res.redirect('/giveaway');
    }
    // Otherwise, render the login page
    res.render('login', { title: 'Login', message:"", currentPage:"/giveaway"});
});

app.post('/login', (req,res) => {
    const {username, password} = req.body;
    fs.readFile('data/login.txt', 'utf8', (err, data) => {
        if(err) {
            console.error('Error reading file', err);
        }
        else {
            const users = data.split(("\n"));
            let i=0;
            while(users[i].split(":")[0] !== username){
                i++;
            }
            if (i < users.length && users[i].split(":")[1] === password)
            {
                req.session.username = username;
                res.redirect('/giveaway');
            }
            else {
                res.render('login', {message: 'Username or password is incorrect.', currentPage:'/giveaway'});
            }
        }
    });           
});

app.post('/newPet', (req,res) => {
    const username = req.session.username;
    const { animal, breed, ageCheck, gender, niceArr, description, name, email} = req.body;
    fs.appendFile('data/availablePets.txt', `${username}:${animal}:${breed}:${ageCheck}:${gender}:${niceArr}:${description}:${name}:${email}\n`, (err) => {
        if (err) console.error('Error appending to file', err)
    });
    res.render('giveaway', {message: 'Your pet has been added to our database and is available for adoption!'});
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})