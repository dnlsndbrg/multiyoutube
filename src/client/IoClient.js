class IoClient {
    constructor(url) {
        this.url = url;
    }
    connect(io) {
        io(this.url);
    }
}

module.exports = IoClient;
