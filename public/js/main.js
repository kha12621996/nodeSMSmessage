// Variable für Funktion
const numberInput = document.getElementById('number'),
      textInput = document.getElementById('msg'),
      button = document.getElementById('button'),
      response = document.querySelector('.response');

button.addEventListener('click', send, false);

// Variable und Funktion Socket
const socket = io();
socket.on('smsStatus', function(data){
  response.innerHTML = '<h5>Nachricht wird an ' +' '+ data.number+' '+ 'gesendet'+' '+ '</h5>'
})

// Funktion zur Vesendung von Text und Nummer a
function send() {
  const number = numberInput.value.replace(/\D/g, '');
  const text = textInput.value;
  
  fetch('/', {
    method: 'post',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({number: number, text:text})
  })
  .then(function(res){
    console.log(res);
  })
  .catch(function(err){
    console.log(err);
  });
}
