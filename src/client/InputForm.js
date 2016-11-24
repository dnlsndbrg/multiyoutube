class InputForm {
    constructor(input, button, youtubePlayer) {
        this.youtubePlayer = youtubePlayer;
        this.input = input;
        this.button = button;
        button.addEventListener('click', this.submit.bind(this));
    }

    submit(e) {
        e.preventDefault();
        this.youtubePlayer.changeVideo();
    }

    getStringFromInput() {
        return this.input.value;
    }

    getVideoIDfromURL(url) {
        let regexp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i;
        let videoID = url.match(regexp);

        if (videoID) return videoID[1];
        else throw new Error('bad url');
    }
}

module.exports = InputForm;
