const socket = io();
var username;
let textarea = document.querySelector('#textarea');
let messagearea = document.querySelector('.message__area');

do {
    username=prompt('enter your name');
}while(!username);

textarea.addEventListener('keyup',(e)=>{
    if(e.key==='Enter'){
        sendMessage(e.target.value);
    }
});

function sendMessage(msg){
    let msgobj={
        user : username,
        message: msg.trim()
   }
   appendMessage(msgobj,'outgoing');
   textarea.value='';
   scrollToBottom()
   socket.emit('message',msgobj);
}

function appendMessage(msg,type){
    let mainDiv= document.createElement('div');
    let className=type;
    mainDiv.classList.add(className,'message');

    let msgcontain =`<h4>${msg.user}</h4>
                      <p>${msg.message}</P> `;
    mainDiv.innerHTML=msgcontain;
    messagearea.appendChild(mainDiv);
}

socket.on('message',(msg)=>{
    appendMessage(msg,'incoming');
    scrollToBottom()

});

function scrollToBottom() {
    console.log('scroll valu call thay che');
    messagearea.scrollTop = messagearea.scrollHeight
}
