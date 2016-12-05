class YoutubePlayer {
    constructor() {
        this.done = false;
        this.player = null;
    }

    onYouTubeIframeAPIReady(iframeAPI) {
        if(!iframeAPI) throw new Error('Missing API argument - pass this script https://www.youtube.com/iframe_api as an argument');
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

    changeVideo(videoID) {
        if (this.isValidVideoID(videoID))
            this.player.loadVideoById(videoID);
    }

    isValidVideoID(videoID) {
        let regexp = /[a-zA-Z0-9_-]{11}/;
        return regexp.test(videoID);
    }
}

module.exports = YoutubePlayer;
