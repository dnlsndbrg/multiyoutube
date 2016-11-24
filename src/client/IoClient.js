class IoClient {
    constructor(url) {
        this.url = url;
    }
    connect(io) {
        this.socket = io(this.url);

        this.socket.on('connect', function() {
            console.log('connected');
        });

        this.socket.on('emit', function(data) {
            console.log('io', data);
        });
    }
}

module.exports = IoClient;
