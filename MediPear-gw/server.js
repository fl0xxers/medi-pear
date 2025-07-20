const express = require("express");
const app = express();
const path = require("path");
const PORT = 5501;


const { connectToDatabase, getDb } = require('./db'); //connect to db

app.use(express.json()); // parse JSON
app.use(express.static(path.join(__dirname, 'public'))); // serve the static files


// app.listen(PORT, (error) => {
//     if (error) {
//         console.error(error);
//     } else {
//         console.log(`Server listening on port ${PORT}`);
//     }
// });

//app.listen(PORT, () => console.log(`Server running on port ${PORT}`));




connectToDatabase().then(() => {
    app.listen(PORT, () => {
        console.log(`server running on port ${PORT}`);
    });
}).catch((err) => {
    console.error("failed to connect to MongoDB, server not started", err);
});


// 

// show the home page indexhtml
app.get('/', (req, res) => {
    console.log("hello");
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
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

    // Do something based on sortType, e.g. fetch sorted data
    // You can later send back the sorted posts
    res.json({ message: `Feed updated to ${sortType}` });
});


