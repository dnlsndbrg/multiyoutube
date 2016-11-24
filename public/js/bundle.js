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

        this.socket.on('connect', function() {
            console.log('connected');
        });

        this.socket.on('emit', function(data) {
            console.log('io', data);
        });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvY2xpZW50L0lucHV0Rm9ybS5qcyIsInNyYy9jbGllbnQvSW9DbGllbnQuanMiLCJzcmMvY2xpZW50L1lvdXR1YmVQbGF5ZXIuanMiLCJzcmMvY2xpZW50L2NsaWVudC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImNsYXNzIElucHV0Rm9ybSB7XHJcbiAgICBjb25zdHJ1Y3RvcihpbnB1dCwgYnV0dG9uLCB5b3V0dWJlUGxheWVyKSB7XHJcbiAgICAgICAgdGhpcy55b3V0dWJlUGxheWVyID0geW91dHViZVBsYXllcjtcclxuICAgICAgICB0aGlzLmlucHV0ID0gaW5wdXQ7XHJcbiAgICAgICAgdGhpcy5idXR0b24gPSBidXR0b247XHJcbiAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5zdWJtaXQuYmluZCh0aGlzKSk7XHJcbiAgICB9XHJcblxyXG4gICAgc3VibWl0KGUpIHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgbGV0IHVybCA9IHRoaXMuZ2V0U3RyaW5nRnJvbUlucHV0KCk7XHJcbiAgICAgICAgbGV0IHZpZGVvSUQgPSB0aGlzLmdldFZpZGVvSURmcm9tVVJMKHVybCk7XHJcbiAgICAgICAgdGhpcy55b3V0dWJlUGxheWVyLmNoYW5nZVZpZGVvKHZpZGVvSUQpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFN0cmluZ0Zyb21JbnB1dCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5pbnB1dC52YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRWaWRlb0lEZnJvbVVSTCh1cmwpIHtcclxuICAgICAgICBsZXQgcmVnZXhwID0gLyg/OnlvdXR1YmVcXC5jb21cXC8oPzpbXlxcL10rXFwvLitcXC98KD86dnxlKD86bWJlZCk/KVxcL3wuKls/Jl12PSl8eW91dHVcXC5iZVxcLykoW15cIiY/XFwvIF17MTF9KS9pO1xyXG4gICAgICAgIGxldCB2aWRlb0lEID0gdXJsLm1hdGNoKHJlZ2V4cCk7XHJcblxyXG4gICAgICAgIGlmICh2aWRlb0lEKSByZXR1cm4gdmlkZW9JRFsxXTtcclxuICAgICAgICBlbHNlIHRocm93IG5ldyBFcnJvcignYmFkIHVybCcpO1xyXG4gICAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IElucHV0Rm9ybTtcclxuIiwiY2xhc3MgSW9DbGllbnQge1xyXG4gICAgY29uc3RydWN0b3IodXJsKSB7XHJcbiAgICAgICAgdGhpcy51cmwgPSB1cmw7XHJcbiAgICB9XHJcbiAgICBjb25uZWN0KGlvKSB7XHJcbiAgICAgICAgdGhpcy5zb2NrZXQgPSBpbyh0aGlzLnVybCk7XHJcblxyXG4gICAgICAgIHRoaXMuc29ja2V0Lm9uKCdjb25uZWN0JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjb25uZWN0ZWQnKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5zb2NrZXQub24oJ2VtaXQnLCBmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdpbycsIGRhdGEpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IElvQ2xpZW50O1xyXG4iLCJjbGFzcyBZb3V0dWJlUGxheWVyIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuZG9uZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMucGxheWVyID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBvbllvdVR1YmVJZnJhbWVBUElSZWFkeShpZnJhbWVBUEkpIHtcclxuICAgICAgICBpZighaWZyYW1lQVBJKSB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgQVBJIGFyZ3VtZW50IC0gcGFzcyB0aGlzIHNjcmlwdCBodHRwczovL3d3dy55b3V0dWJlLmNvbS9pZnJhbWVfYXBpIGFzIGFuIGFyZ3VtZW50Jyk7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXIgPSBuZXcgaWZyYW1lQVBJLlBsYXllcigncGxheWVyJywge1xyXG4gICAgICAgICAgICBoZWlnaHQ6ICczOTAnLFxyXG4gICAgICAgICAgICB3aWR0aDogJzY0MCcsXHJcbiAgICAgICAgICAgIHZpZGVvSWQ6ICdNN2xjMVVWZi1WRScsXHJcbiAgICAgICAgICAgIGV2ZW50czoge1xyXG4gICAgICAgICAgICAgICAgJ29uUmVhZHknOiB0aGlzLm9uUGxheWVyUmVhZHksXHJcbiAgICAgICAgICAgICAgICAnb25TdGF0ZUNoYW5nZSc6IHRoaXMub25QbGF5ZXJTdGF0ZUNoYW5nZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgb25QbGF5ZXJSZWFkeSgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnUmVhZHknKTtcclxuICAgIH1cclxuXHJcbiAgICBvblBsYXllclN0YXRlQ2hhbmdlKGV2ZW50KSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ1N0YXRlIGNoYW5nZScsIGV2ZW50KTtcclxuICAgIH1cclxuXHJcbiAgICBzdG9wVmlkZW8oKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ1N0b3AnKTtcclxuICAgIH1cclxuXHJcbiAgICBjaGFuZ2VWaWRlbyh2aWRlb0lEKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNWYWxpZFZpZGVvSUQodmlkZW9JRCkpXHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyLmxvYWRWaWRlb0J5SWQodmlkZW9JRCk7XHJcbiAgICB9XHJcblxyXG4gICAgaXNWYWxpZFZpZGVvSUQodmlkZW9JRCkge1xyXG4gICAgICAgIGxldCByZWdleHAgPSAvW2EtekEtWjAtOV8tXXsxMX0vO1xyXG4gICAgICAgIHJldHVybiByZWdleHAudGVzdCh2aWRlb0lEKTtcclxuICAgIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBZb3V0dWJlUGxheWVyO1xyXG4iLCIvLyBUT0RPOiBjb3ZlciB3aXRoIHRlc3RzXHJcblxyXG5sZXQgWW91dHViZVBsYXllciA9IHJlcXVpcmUoJy4vWW91dHViZVBsYXllcicpO1xyXG5sZXQgSW5wdXRGb3JtID0gcmVxdWlyZSgnLi9JbnB1dEZvcm0nKTtcclxubGV0IElvQ2xpZW50ID0gcmVxdWlyZSgnLi9Jb0NsaWVudCcpO1xyXG5cclxubGV0IHlvdXR1YmVQbGF5ZXIgPSBuZXcgWW91dHViZVBsYXllcigpO1xyXG5sZXQgaW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjaW5wdXQnKTtcclxubGV0IGJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhZGQtdXJsLWJ1dHRvbicpO1xyXG5sZXQgaW5wdXRmb3JtID0gbmV3IElucHV0Rm9ybShpbnB1dCwgYnV0dG9uLCB5b3V0dWJlUGxheWVyKTtcclxubGV0IGlvQ2xpZW50ID0gbmV3IElvQ2xpZW50KCdodHRwOi8vbG9jYWxob3N0OjMwMDAnKTsgLy9UT0RPIGRvbnQgaGFyZGNvZGUgdXJsXHJcblxyXG5cclxuaW9DbGllbnQuY29ubmVjdCh3aW5kb3cuaW8pO1xyXG5cclxud2luZG93Lm9uWW91VHViZUlmcmFtZUFQSVJlYWR5ID0gZnVuY3Rpb24oKSB7XHJcbiAgICB5b3V0dWJlUGxheWVyLm9uWW91VHViZUlmcmFtZUFQSVJlYWR5KHdpbmRvdy5ZVCk7XHJcbn07XHJcbiJdfQ==
