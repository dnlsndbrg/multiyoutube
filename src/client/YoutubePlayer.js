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
        this.player.loadVideoById(videoID);
    }

    getVideoIDfromURL(url) {
        let regexp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i;
        let videoID = url.match(regexp);

        if (videoID) return videoID[1];
        else throw new Error('bad url');
    }

    isValidVideoID(videoID) {
        let regexp = /[a-zA-Z0-9_-]{11}/;
        return regexp.test(videoID);
    }
}
//[a-zA-Z0-9_-]{11}
module.exports = YoutubePlayer;
