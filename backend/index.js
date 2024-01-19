const express = require('express');
const app = express();
const port = 3000;

const bearerToken = "foo";
const allowOrigin = "*";
const allowHeaders = "Authorization";

// button 1
app.get('/missing-cors', (req, res) => {
    res.json({ message: 'Hello, this is a simple JSON response!' });
});

// button 2
app.get('/having-cors', (req, res) => {
    res.header('Access-Control-Allow-Origin', allowOrigin);
    res.json({ message: 'Hello, this is a simple JSON response!' });
});

// button 3
app.get('/auth/missing-cors', (req, res) => {
    if (req.headers?.authorization !== `Bearer ${bearerToken}`) {
        res.status(401).json({ message: 'Auth error' });
        return;
    }
    res.json({ message: 'Hello, this is a simple JSON response!' });
});

// button 4
// this needs a pre-flight reponse
app.get('/auth/having-cors', (req, res) => {
    if (req.headers?.authorization !== `Bearer ${bearerToken}`) {
        res.status(401).json({ message: 'Auth error' });
        return;
    }
    res.header('Access-Control-Allow-Origin', allowOrigin);
    res.json({ message: 'Hello, this is a simple JSON response!' });
});
app.options('/auth/having-cors', (req, res) => {
    res.header('Access-Control-Allow-Origin', allowOrigin);
    res.header('Access-Control-Allow-Headers', allowHeaders);
    res.send();
});
  
  

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});