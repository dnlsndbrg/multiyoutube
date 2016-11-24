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
}

module.exports = InputForm;
