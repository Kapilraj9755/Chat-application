const socket = io();

document.querySelectorAll('.chat-container')[1].style.display = 'none';

const inputBox = document.querySelector('.input-box');
const sendButton = document.querySelector('.send-btn');
const chat = document.querySelector('.chat');

sendButton.addEventListener('click', () => {
    const textMessage = inputBox.value;
    inputBox.value = '';

    socket.emit('send-msg', {msg:textMessage});
});


socket.on('received-msg', (data)=>{
    // console.log(data);
    const div = document.createElement('div');

    if(data.id === socket.id){
        div.classList.add('message', 'sender');
    }
    else{
        div.classList.add('message', 'receiver');
    }

    div.innerHTML = `<strong>${data.username}</strong> - <span>${data.msg}</span>`

    chat.append(div);
});

const loginName = document.querySelector('#login-name');
const loginBtn = document.querySelector('#login-btn');

loginBtn.addEventListener('click', () => {
    const username = loginName.value;
    loginName.value = '';

    if(username === ''){
        return;
    }

    socket.emit('login', {username});
    document.querySelectorAll('.chat-container')[0].style.display = 'none';
    document.querySelectorAll('.chat-container')[1].style.display = 'block';
})

////// .......time

function getCurrentTime12Hours() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    hours = hours % 12 || 12; // Convert to 12-hour format
    
    const formattedTime = `${hours}:${minutes < 10 ? '0' : ''}${minutes} ${ampm}`;
    return formattedTime;
  }
  
  const currentTime12Hours = getCurrentTime12Hours();

 
const Time = document.querySelector('.time')
const div = document.createElement('div');
div.innerHTML = `<strong>  Time: ${currentTime12Hours}`

Time.append(div);