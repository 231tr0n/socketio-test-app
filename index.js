const express = require('express');
const path = require('path');
const http = require('http');

const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);

io.on('connection', (socket) => {
	socket.on('post_message', (message) => {
		if (message.username && message.data) {
			if (message.data.length < 100 && message.username.length < 20) {
				io.emit('message', message);
			}
		}
	});
});

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'views', 'homepage.html'));
});

app.get('/chat', (req, res) => {
	res.sendFile(path.join(__dirname, 'views', 'chat.html'));
});

server.listen(8080, () => {
	console.log('Server listening on port', 8080);
});
