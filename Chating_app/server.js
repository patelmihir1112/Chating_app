const express = require('express');
const app = express(); 
const http = require('http').Server(app);
const port = process.env.PORT || 3000;
const io = require('socket.io')(http);

app.use(express.static(__dirname+'/public'));

app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/index.html')
});
io.on('connection',(socket)=>{
    console.log('socket connection');
    socket.on('message',(msg)=>{
        socket.broadcast.emit('message', msg)
    });
    socket.on('disconnect', function () {
        console.log('A user disconnected');
     });
})

http.listen(port,()=>{
    console.log('connection..');
    
});