//init
const Launchpad = require( 'launchpad-mini' ), pad = new Launchpad();
var W3CWebSocket = require('websocket').w3cwebsocket;

// remote functions
var remoteFunctions = []
remoteFunctions.handleUpdate = ({field}) => {for(let y = 0; y<8; y++)for(let x = 0; x<8; x++)pad.col(pad[field[y][x]], {0: x, 1: y})}
remoteFunctions.handleUserOnline = ({amount}) => {}

//websocket
var initWebsocket = () => {
  var client = new W3CWebSocket('wss://www.failearly.de/subledws', 'echo-protocol');
  client.onopen = () => {client.send(JSON.stringify({method: 'init', params: {}}))};
  client.onmessage = (e) => {
    let data = JSON.parse(e.data)
    remoteFunctions[data.method](data.params);
  }
}

//launchpad
pad.connect()
.then( () => pad.reset(0))
.then( () => initWebsocket())
