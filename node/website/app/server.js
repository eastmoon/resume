// server.js
const fs = require('fs');
const path = require('path');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({dev});
const handle = app.getRequestHandler();

const express = require('express');
const server = express();

// Setting server port
var port = 80;
// Setting server public directory
server.use(express.static(path.join(__dirname, 'public')));
// Setting server error handle
require("./server_error_handle")(server);
// Setting server event handle
require("./server_event_handle")(server);

// Start server
app.prepare().then(() => {

    server.all('*', (req, res) => {
        return handle(req, res);
    });

    server.listen(port, err => {
        if (err) throw err;
        console.log(`> Ready on http://localhost:${port}`);
    });
});
