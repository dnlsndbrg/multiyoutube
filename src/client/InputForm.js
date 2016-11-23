class InputForm {
    constructor(input, button, youtubePlayer) {
        this.youtubePlayer = youtubePlayer;
    }

    submit(e) {
        e.preventDefault();
        this.youtubePlayer.changeVideo();
    }
}

module.exports = InputForm;
