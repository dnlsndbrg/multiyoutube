class IoClient {
    constructor(url) {
        this.url = url;
    }
    connect(io) {
        this.socket = io(this.url);
    }
}

module.exports = IoClient;
