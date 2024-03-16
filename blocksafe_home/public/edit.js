const express = require('express');
const session = require('express-session');
const path = require('path');

const app = express();

// Use express-session middleware
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true
}));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Set up a route to serve the main page
app.get('/Dpage', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'Dindex.html'));
});

// Set up routes for other pages
app.get('/Drequest_ride', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'Drequest_ride.html'));
});

app.get('/Dride_requests', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'Dride_requests.html'));
});

app.get('/Dhistory', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'Dhistory.html'));
});

app.get('/Dch_ride_st', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'Dch_ride_st.html'));
});

app.get('/Dsupport', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'Dsupport.html'));
});

app.get('/Dlogout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

// Set up a route to serve the main page
app.get('/Cpage', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'Cindex.html'));
});

// Set up routes for other pages
app.get('/request_ride', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'request_ride.html'));
});

app.get('/ride_requests', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'ride_requests.html'));
});

app.get('/history', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'history.html'));
});

app.get('/ch_ride_st', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'ch_ride_st.html'));
});

app.get('/support', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'support.html'));
});

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
