const express = require("express");
const helmet = require("helmet"); 
const http = require("http"); // Allows to create an HTTP server.
const statusMonitor = require('express-status-monitor');

const app = express();

app.use(statusMonitor());

app.use(helmet()); // Secure Express apps with various HTTP headers

app.get("/",(req, res) => {
    let i = 0;
    while(i < 1e7) i++;
    res.send(`✨ Hello from worker number: ${process.pid} ✨\n This is a demo!`)
});

// Exports function that starts the server.
module.exports.start = () => {
    const server = http.createServer(app); // Create an HTTP server with the Express.
    server.listen(3000, () => {
        console.log(`Worker ${process.pid} started!`) // indicates who's working.
    });
};    