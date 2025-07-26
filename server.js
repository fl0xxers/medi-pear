const express = require("express");
const app = express();
const path = require("path");
const PORT = 5501;
const cors = require('cors');


const { connectToDatabase, getDb } = require('./db'); //connect to db

app.use(cors()); // allow cross-origin requests 
app.use(express.json()); // parse JSON
app.use(express.static(path.join(__dirname, 'public'))); // serve the static files



connectToDatabase().then(() => {
    app.listen(PORT, () => {
        console.log(`server running on port ${PORT}`);
    });
}).catch((err) => {
    console.error("failed to connect to MongoDB, server not started", err);
});


// show the home page indexhtml
app.get('/', (req, res) => {
    console.log("hello");
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});



// // dummy login credentials
// const USER = {
//   username: 'admin',
//   password: '1234'
// };

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // dummy authentication logic (yes we will change this in the future)
  if (username === 'admin' && password === 'password123') {
    return res.status(200).json({ message: 'Login successful' });
  } else {
    return res.status(401).json({ error: 'Invalid username or password' });
  }
});





//VOTING STUFF
app.post('/vote-up', (req, res) => {
    console.log("Vote up received");
    res.send("Vote up recorded");
});

app.post('/vote-down', (req, res) => {
    console.log("Vote down received");
    res.send("Vote down recorded");
});





// route handle feed sorting
app.post('/update-feed', (req, res) => {
    const sortType = req.body.sort;
    console.log("received sort type:", sortType);

    // do something based on sortType, e.g. fetch sorted data
    // You can later send back the sorted posts
    res.json({ message: `Feed updated to ${sortType}` });
});


//wei ens stuff 
// Proxy /predict to Flask server
app.post('/predict', async (req, res) => {
    try {
        const response = await fetch('http://localhost:5000/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(req.body)
        });
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to connect to prediction server' });
    }
});