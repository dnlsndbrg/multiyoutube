(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
class InputForm {
    constructor(input, button, youtubePlayer) {
        this.youtubePlayer = youtubePlayer;
        this.input = input;
        this.button = button;
        button.addEventListener('click', this.submit.bind(this));
    }

    submit(e) {
        e.preventDefault();
        let url = this.getStringFromInput();
        let videoID = this.getVideoIDfromURL(url);
        this.youtubePlayer.changeVideo(videoID);
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

},{}],2:[function(require,module,exports){
class IoClient {
    constructor(url) {
        this.url = url;
    }
    connect(io) {
        this.socket = io(this.url);
    }
}

module.exports = IoClient;

},{}],3:[function(require,module,exports){
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

    onPlayerReady() {
        console.log('Ready');
    }

    onPlayerStateChange(event) {
        console.log('State change', event);
    }

    stopVideo() {
        console.log('Stop');
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

},{}],4:[function(require,module,exports){
// TODO: cover with tests

let YoutubePlayer = require('./YoutubePlayer');
let InputForm = require('./InputForm');
let IoClient = require('./IoClient');

let youtubePlayer = new YoutubePlayer();
let input = document.querySelector('#input');
let button = document.querySelector('#add-url-button');
let inputform = new InputForm(input, button, youtubePlayer);
let ioClient = new IoClient('http://localhost:3000'); //TODO dont hardcode url


ioClient.connect(window.io);

window.onYouTubeIframeAPIReady = function() {
    youtubePlayer.onYouTubeIframeAPIReady(window.YT);
};

},{"./InputForm":1,"./IoClient":2,"./YoutubePlayer":3}]},{},[4])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvY2xpZW50L0lucHV0Rm9ybS5qcyIsInNyYy9jbGllbnQvSW9DbGllbnQuanMiLCJzcmMvY2xpZW50L1lvdXR1YmVQbGF5ZXIuanMiLCJzcmMvY2xpZW50L2NsaWVudC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJjbGFzcyBJbnB1dEZvcm0ge1xuICAgIGNvbnN0cnVjdG9yKGlucHV0LCBidXR0b24sIHlvdXR1YmVQbGF5ZXIpIHtcbiAgICAgICAgdGhpcy55b3V0dWJlUGxheWVyID0geW91dHViZVBsYXllcjtcbiAgICAgICAgdGhpcy5pbnB1dCA9IGlucHV0O1xuICAgICAgICB0aGlzLmJ1dHRvbiA9IGJ1dHRvbjtcbiAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5zdWJtaXQuYmluZCh0aGlzKSk7XG4gICAgfVxuXG4gICAgc3VibWl0KGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBsZXQgdXJsID0gdGhpcy5nZXRTdHJpbmdGcm9tSW5wdXQoKTtcbiAgICAgICAgbGV0IHZpZGVvSUQgPSB0aGlzLmdldFZpZGVvSURmcm9tVVJMKHVybCk7XG4gICAgICAgIHRoaXMueW91dHViZVBsYXllci5jaGFuZ2VWaWRlbyh2aWRlb0lEKTtcbiAgICB9XG5cbiAgICBnZXRTdHJpbmdGcm9tSW5wdXQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmlucHV0LnZhbHVlO1xuICAgIH1cblxuICAgIGdldFZpZGVvSURmcm9tVVJMKHVybCkge1xuICAgICAgICBsZXQgcmVnZXhwID0gLyg/OnlvdXR1YmVcXC5jb21cXC8oPzpbXlxcL10rXFwvLitcXC98KD86dnxlKD86bWJlZCk/KVxcL3wuKls/Jl12PSl8eW91dHVcXC5iZVxcLykoW15cIiY/XFwvIF17MTF9KS9pO1xuICAgICAgICBsZXQgdmlkZW9JRCA9IHVybC5tYXRjaChyZWdleHApO1xuXG4gICAgICAgIGlmICh2aWRlb0lEKSByZXR1cm4gdmlkZW9JRFsxXTtcbiAgICAgICAgZWxzZSB0aHJvdyBuZXcgRXJyb3IoJ2JhZCB1cmwnKTtcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gSW5wdXRGb3JtO1xuIiwiY2xhc3MgSW9DbGllbnQge1xuICAgIGNvbnN0cnVjdG9yKHVybCkge1xuICAgICAgICB0aGlzLnVybCA9IHVybDtcbiAgICB9XG4gICAgY29ubmVjdChpbykge1xuICAgICAgICB0aGlzLnNvY2tldCA9IGlvKHRoaXMudXJsKTtcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gSW9DbGllbnQ7XG4iLCJjbGFzcyBZb3V0dWJlUGxheWVyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5kb25lID0gZmFsc2U7XG4gICAgICAgIHRoaXMucGxheWVyID0gbnVsbDtcbiAgICB9XG5cbiAgICBvbllvdVR1YmVJZnJhbWVBUElSZWFkeShpZnJhbWVBUEkpIHtcbiAgICAgICAgaWYoIWlmcmFtZUFQSSkgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIEFQSSBhcmd1bWVudCAtIHBhc3MgdGhpcyBzY3JpcHQgaHR0cHM6Ly93d3cueW91dHViZS5jb20vaWZyYW1lX2FwaSBhcyBhbiBhcmd1bWVudCcpO1xuICAgICAgICB0aGlzLnBsYXllciA9IG5ldyBpZnJhbWVBUEkuUGxheWVyKCdwbGF5ZXInLCB7XG4gICAgICAgICAgICBoZWlnaHQ6ICczOTAnLFxuICAgICAgICAgICAgd2lkdGg6ICc2NDAnLFxuICAgICAgICAgICAgdmlkZW9JZDogJ003bGMxVVZmLVZFJyxcbiAgICAgICAgICAgIGV2ZW50czoge1xuICAgICAgICAgICAgICAgICdvblJlYWR5JzogdGhpcy5vblBsYXllclJlYWR5LFxuICAgICAgICAgICAgICAgICdvblN0YXRlQ2hhbmdlJzogdGhpcy5vblBsYXllclN0YXRlQ2hhbmdlXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG9uUGxheWVyUmVhZHkoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdSZWFkeScpO1xuICAgIH1cblxuICAgIG9uUGxheWVyU3RhdGVDaGFuZ2UoZXZlbnQpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ1N0YXRlIGNoYW5nZScsIGV2ZW50KTtcbiAgICB9XG5cbiAgICBzdG9wVmlkZW8oKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdTdG9wJyk7XG4gICAgfVxuXG4gICAgY2hhbmdlVmlkZW8odmlkZW9JRCkge1xuICAgICAgICBpZiAodGhpcy5pc1ZhbGlkVmlkZW9JRCh2aWRlb0lEKSlcbiAgICAgICAgICAgIHRoaXMucGxheWVyLmxvYWRWaWRlb0J5SWQodmlkZW9JRCk7XG4gICAgfVxuXG4gICAgaXNWYWxpZFZpZGVvSUQodmlkZW9JRCkge1xuICAgICAgICBsZXQgcmVnZXhwID0gL1thLXpBLVowLTlfLV17MTF9LztcbiAgICAgICAgcmV0dXJuIHJlZ2V4cC50ZXN0KHZpZGVvSUQpO1xuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBZb3V0dWJlUGxheWVyO1xuIiwiLy8gVE9ETzogY292ZXIgd2l0aCB0ZXN0c1xuXG5sZXQgWW91dHViZVBsYXllciA9IHJlcXVpcmUoJy4vWW91dHViZVBsYXllcicpO1xubGV0IElucHV0Rm9ybSA9IHJlcXVpcmUoJy4vSW5wdXRGb3JtJyk7XG5sZXQgSW9DbGllbnQgPSByZXF1aXJlKCcuL0lvQ2xpZW50Jyk7XG5cbmxldCB5b3V0dWJlUGxheWVyID0gbmV3IFlvdXR1YmVQbGF5ZXIoKTtcbmxldCBpbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNpbnB1dCcpO1xubGV0IGJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhZGQtdXJsLWJ1dHRvbicpO1xubGV0IGlucHV0Zm9ybSA9IG5ldyBJbnB1dEZvcm0oaW5wdXQsIGJ1dHRvbiwgeW91dHViZVBsYXllcik7XG5sZXQgaW9DbGllbnQgPSBuZXcgSW9DbGllbnQoJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMCcpOyAvL1RPRE8gZG9udCBoYXJkY29kZSB1cmxcblxuXG5pb0NsaWVudC5jb25uZWN0KHdpbmRvdy5pbyk7XG5cbndpbmRvdy5vbllvdVR1YmVJZnJhbWVBUElSZWFkeSA9IGZ1bmN0aW9uKCkge1xuICAgIHlvdXR1YmVQbGF5ZXIub25Zb3VUdWJlSWZyYW1lQVBJUmVhZHkod2luZG93LllUKTtcbn07XG4iXX0=
