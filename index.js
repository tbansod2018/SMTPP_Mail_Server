const { SMTPServer } = require('smtp-server');

const server = new SMTPServer({
    allowInsecureAuth: true,
    authOptional: true,
    onConnect(session, cb) {
        console.log("onConnect");
        cb(); // Call the callback to accept the connection
    },
    onMailFrom(address, session, cb) {
        console.log(`Mail from: ${address}`);
        cb(null, address); // Accept the sender address
    },
    onRcptTo(address, session, cb) {
        console.log(`Recipient to: ${address}`);
        cb(null, address); // Accept the recipient address
    },
    onData(stream, session, cb) {
        stream.on('data', (data) => console.log(`Received data: ${data.toString()}`));
        stream.on('end', cb); // Call cb when the stream ends
    }
});


server.listen(25, () => console.log('SMTP server is running on port 25'));
