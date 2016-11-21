class YoutubePlayer {
    constructor() {
        this.done = false;
        this.player = null;
    }

    onYouTubeIframeAPIReady(iframeAPI) {
        this.player = new iframeAPI.Player('player', {
            height: '390',
            width: '640',
            videoId: 'M7lc1UVf-VE',
            events: {
                'onReady': this.onPlayerReady,
                'onStateChange': this.onPlayerStateChange
            }
        });
    }
}

module.exports = YoutubePlayer;
