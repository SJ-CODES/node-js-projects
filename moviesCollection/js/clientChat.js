

const chatMessageTextBox = document.getElementById("chatMessageTextBox")
const usernameTextBox = document.getElementById("usernameTextBox")
const sendButton = document.getElementById("sendButton")
const messagesUL = document.getElementById("messagesUL")

sendButton.addEventListener('click', () => {

    const username = usernameTextBox.value 
    const chatMessage = chatMessageTextBox.value 
   
    socket.emit('Curious', {username: username, message: chatMessage})
})



socket.on('Curious', (chat) => {
    const messageItem = `
                        <h3 id:"displayConvo">
                            ${chat.username}: ${chat.message}
                        </h3>
                            `
                     
    messagesUL.insertAdjacentHTML('beforeend', messageItem)
})



  // var messages = document.getElementById('messages');
  // var form = document.getElementById('form');
  // var input = document.getElementById('input');

  // form.addEventListener('submit', function(e) {
  //   e.preventDefault();
  //   if (input.value) {
  //     socket.emit('chat message', input.value);
  //     input.value = '';
  //   }
  // });

  // socket.on('chat message', function(msg) {
  //   var item = document.createElement('li');
  //   item.textContent = msg;
  //   messages.appendChild(item);
  //   window.scrollTo(0, document.body.scrollHeight);
  // });

  // form.addEventListener('submit', function(e) {
  //   e.preventDefault();
  //   if (input.value) {
  //     socket.emit('chat message', input.value);
  //     input.value = '';
  //   }
  // })

 

  // io.on('connection', (socket) => {
  //   socket.on('chat message', (msg) => {
  //     io.emit('chat message', msg);
  //   });
  // });