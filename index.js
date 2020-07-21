// this willhandkle socketio server
const io = require('socket.io')(process.env.PORT || 8000);

const users = {};

io.on('connection', socket =>{
  socket.on('new-user-joined', name=>{
    console.log(name);
     users[socket.id]= name;
     socket.broadcast.emit('user-joined',name)
  });
  socket.on('send',message=>{

    socket.broadcast.emit('recieve',{message: message , name :users[socket.id]})
  });

  socket.on('disconnect', message =>{
    socket.broadcast.emit('chat-leaved',users[socket.id]);
    delete users[socket.id];

  });
});
