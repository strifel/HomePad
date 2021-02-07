const net = require('net');
const fetch = require('node-fetch');
const Config = require('./config');
let config = new Config();

let server = net.createServer((socket) => {
    socket.write('CONNECTED\r\n');
    socket.on('data', (data) => {
        let command = data.toString().replace('\r\n', '');
        if (command.match(/^([ABC])\d+(\*\d+)?#$/i) != null) {
            let address = command.includes('*') ? command.split('*')[0] : command.split('#')[0];
            if (address in config.config) {
                let d = config.config[address];
                if (d.hasVal === command.includes('*')) {
                    if (d.type === 'http') {
                        fetch(
                            d.hasVal
                                ? d.url.replace('%val%', command.split('#')[0].split('*')[1])
                                : d.url)
                        .then(() => socket.write('OK: ' + address + '\r\n'));
                    }
                } else {
                    socket.write('ERROR\r\n');
                }
            } else {
                console.log("Got unknown address: " + address);
                socket.write('ERROR\r\n');
            }
        } else {
            socket.write('ERROR\r\n');
        }
    })
});

server.listen(7906, '0.0.0.0');
