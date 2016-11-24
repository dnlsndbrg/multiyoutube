class InputForm {
    constructor(input, button, youtubePlayer) {
        this.youtubePlayer = youtubePlayer;
        button.addEventListener('click', this.submit.bind(this));
    }

    submit(e) {
        e.preventDefault();
        this.youtubePlayer.changeVideo();
    }
}

module.exports = InputForm;
