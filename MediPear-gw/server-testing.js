// /* FOR TESTING PURPOSES ONLY NOT MAIN SERVER FILE*/

// const express = require("express");
// const http = require("http");
// const app = express();
// const PORT = 5501;


// const server = http.createServer(function(req, res) {
//     res.writeHead(200, {'Content-Type': 'text/html'}) // everything OK
//     fstat.readFile('index.html', function(error, data) {
//         if (error) {
//             res.writeHead(400);
//             res.write('Error: file not found')
//         } else {
//             res.write(data);
//         }
//         res.end();
//     })
// })

// server.listen(PORT, function(error){
//     if (error){
//         console.log(error);
//     } else {
//         console.log("server is listening on port " + PORT);
//     }

// })



// app.listen(PORT, () => console.log(`listening at port ${PORT}`));


// app.use(express.static("public"))




// const http = require("http");
// const port = 3001

// const server = http.createServer(function(req, res) {

// })













const express = require("express");
const app = express();
const PORT = 5501;
const path = require("path");

app.use(express.json()); // allows parsing of JSON request bodies

app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
    console.log("hello");
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, (error) => {
    if (error) {
        console.error(error);
        res.sendStatus(500).send("theres a problem");
    } else {
        console.log("server is listening on port " + PORT);
    }
});



app.post('/vote-up', (req, res) => {
    console.log("Vote up received");
    res.send("Vote up recorded");
});

app.post('/vote-down', (req, res) => {
    console.log("Vote down received");
    res.send("Vote down recorded");
});