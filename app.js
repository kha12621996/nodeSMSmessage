const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const Nexmo = require('nexmo');
const socketio = require('socket.io');

// Initialiserung von Nexmo
const nexmo = new Nexmo({
  apiKey: 'cf462ec3',
  apiSecret: '9BZmlQnKSvQNYAh8'
}, { debug: true });

// Initialiserung von App
const app = express();

// Template Engine wird installiert
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);

// Publicordner wird installiert
app.use(express.static(__dirname + '/public'));

// Body Middleware Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Indexrouter
app.get('/', (req, res) => {
  res.render('index');
});


//Submit wird übermittelt durch Request und Response (catch)
app.post('/', (req, res) => {
  
  const number = req.body.number;
  const text = req.body.text;

  nexmo.message.sendSms(
    '56219', number, text, { type: 'unicode' },
    (err, responseData) => {
      if(err) {
        console.log(err);
      } else {
        console.dir(responseData);
        // Daten von Response erhalten
        const data = {
          id: responseData.messages[0]['message-id'],
          number: responseData.
          messages[0]['to']
        }
        // Versendung an Client
        io.emit('smsStatus', data)
      }
    }
  );
});

// Port wird definiert
const port = 3000;

// Server wird gestartet
const server = app.listen(port, () => console.log(`Serverport startet: ${port}`));

// Verbindung mit socket.io
const io = socketio(server);
io.on('Verbinden', (socket) => {
  console.log('Verbinden');
  io.on('Verbindung trennen', () => {
    console.log('Verbindung getrennt');
  })
});

