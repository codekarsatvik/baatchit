var audio = new Audio('js/ting.mp3');
const socket = io('https://baatcheetit.herokuapp.com/');
audio.play();


const form = document.getElementById('send-form');
const messageinput = document.getElementById('messageinp');
const messagecontainer = document.querySelector('.chatbox');

const append = (message,position)=>{
  var div = document.createElement('div');
  var messagetext = document.createElement('h1');
  div.appendChild(messagetext);

  var text = document.createTextNode(message);
  messagetext.classList.add("message",position)
  messagetext.appendChild(text);
  messagecontainer.appendChild(messagetext);
  if(position!='right'){
    audio.play();
    muted = "muted";


  }

}

const name = prompt('enter your name to join ');
socket.emit('new-user-joined',name);
socket.on('user-joined', (name) =>{
  append(  name + ' has joined the chat', 'middle');
})

form.addEventListener('submit', (e)=>{
  e.preventDefault();
  var message = document.querySelector('#messageinp').value;
  append("you : " + message ,'right');
  socket.emit('send', message );
  messageinput.value ='';

});
socket.on('recieve', data =>{
  console.log({});
  append( data.name + " : " + data.message , 'left');
});
socket.on('chat-leaved', data =>{

  append( data + " has left the Chat !", 'middle');
});







// button
