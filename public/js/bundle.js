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

},{}],3:[function(require,module,exports){
let YoutubePlayer = require('./YoutubePlayer');
let InputForm = require('./InputForm');

let youtubePlayer = new YoutubePlayer();
let input = document.querySelector('#input');
let button = document.querySelector('#add-url-button');
let inputform = new InputForm(input, button, youtubePlayer);

window.onYouTubeIframeAPIReady = function() {
    youtubePlayer.onYouTubeIframeAPIReady(window.YT);
};

},{"./InputForm":1,"./YoutubePlayer":2}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvY2xpZW50L0lucHV0Rm9ybS5qcyIsInNyYy9jbGllbnQvWW91dHViZVBsYXllci5qcyIsInNyYy9jbGllbnQvY2xpZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiY2xhc3MgSW5wdXRGb3JtIHtcclxuICAgIGNvbnN0cnVjdG9yKGlucHV0LCBidXR0b24sIHlvdXR1YmVQbGF5ZXIpIHtcclxuICAgICAgICB0aGlzLnlvdXR1YmVQbGF5ZXIgPSB5b3V0dWJlUGxheWVyO1xyXG4gICAgICAgIHRoaXMuaW5wdXQgPSBpbnB1dDtcclxuICAgICAgICB0aGlzLmJ1dHRvbiA9IGJ1dHRvbjtcclxuICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLnN1Ym1pdC5iaW5kKHRoaXMpKTtcclxuICAgIH1cclxuXHJcbiAgICBzdWJtaXQoZSkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBsZXQgdXJsID0gdGhpcy5nZXRTdHJpbmdGcm9tSW5wdXQoKTtcclxuICAgICAgICBsZXQgdmlkZW9JRCA9IHRoaXMuZ2V0VmlkZW9JRGZyb21VUkwodXJsKTtcclxuICAgICAgICB0aGlzLnlvdXR1YmVQbGF5ZXIuY2hhbmdlVmlkZW8odmlkZW9JRCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0U3RyaW5nRnJvbUlucHV0KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmlucHV0LnZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFZpZGVvSURmcm9tVVJMKHVybCkge1xyXG4gICAgICAgIGxldCByZWdleHAgPSAvKD86eW91dHViZVxcLmNvbVxcLyg/OlteXFwvXStcXC8uK1xcL3woPzp2fGUoPzptYmVkKT8pXFwvfC4qWz8mXXY9KXx5b3V0dVxcLmJlXFwvKShbXlwiJj9cXC8gXXsxMX0pL2k7XHJcbiAgICAgICAgbGV0IHZpZGVvSUQgPSB1cmwubWF0Y2gocmVnZXhwKTtcclxuXHJcbiAgICAgICAgaWYgKHZpZGVvSUQpIHJldHVybiB2aWRlb0lEWzFdO1xyXG4gICAgICAgIGVsc2UgdGhyb3cgbmV3IEVycm9yKCdiYWQgdXJsJyk7XHJcbiAgICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gSW5wdXRGb3JtO1xyXG4iLCJjbGFzcyBZb3V0dWJlUGxheWVyIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuZG9uZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMucGxheWVyID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBvbllvdVR1YmVJZnJhbWVBUElSZWFkeShpZnJhbWVBUEkpIHtcclxuICAgICAgICBpZighaWZyYW1lQVBJKSB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgQVBJIGFyZ3VtZW50IC0gcGFzcyB0aGlzIHNjcmlwdCBodHRwczovL3d3dy55b3V0dWJlLmNvbS9pZnJhbWVfYXBpIGFzIGFuIGFyZ3VtZW50Jyk7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXIgPSBuZXcgaWZyYW1lQVBJLlBsYXllcigncGxheWVyJywge1xyXG4gICAgICAgICAgICBoZWlnaHQ6ICczOTAnLFxyXG4gICAgICAgICAgICB3aWR0aDogJzY0MCcsXHJcbiAgICAgICAgICAgIHZpZGVvSWQ6ICdNN2xjMVVWZi1WRScsXHJcbiAgICAgICAgICAgIGV2ZW50czoge1xyXG4gICAgICAgICAgICAgICAgJ29uUmVhZHknOiB0aGlzLm9uUGxheWVyUmVhZHksXHJcbiAgICAgICAgICAgICAgICAnb25TdGF0ZUNoYW5nZSc6IHRoaXMub25QbGF5ZXJTdGF0ZUNoYW5nZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgb25QbGF5ZXJSZWFkeSgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnUmVhZHknKTtcclxuICAgIH1cclxuXHJcbiAgICBvblBsYXllclN0YXRlQ2hhbmdlKGV2ZW50KSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ1N0YXRlIGNoYW5nZScsIGV2ZW50KTtcclxuICAgIH1cclxuXHJcbiAgICBzdG9wVmlkZW8oKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ1N0b3AnKTtcclxuICAgIH1cclxuXHJcbiAgICBjaGFuZ2VWaWRlbyh2aWRlb0lEKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNWYWxpZFZpZGVvSUQodmlkZW9JRCkpXHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyLmxvYWRWaWRlb0J5SWQodmlkZW9JRCk7XHJcbiAgICB9XHJcblxyXG4gICAgaXNWYWxpZFZpZGVvSUQodmlkZW9JRCkge1xyXG4gICAgICAgIGxldCByZWdleHAgPSAvW2EtekEtWjAtOV8tXXsxMX0vO1xyXG4gICAgICAgIHJldHVybiByZWdleHAudGVzdCh2aWRlb0lEKTtcclxuICAgIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBZb3V0dWJlUGxheWVyO1xyXG4iLCJsZXQgWW91dHViZVBsYXllciA9IHJlcXVpcmUoJy4vWW91dHViZVBsYXllcicpO1xyXG5sZXQgSW5wdXRGb3JtID0gcmVxdWlyZSgnLi9JbnB1dEZvcm0nKTtcclxuXHJcbmxldCB5b3V0dWJlUGxheWVyID0gbmV3IFlvdXR1YmVQbGF5ZXIoKTtcclxubGV0IGlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2lucHV0Jyk7XHJcbmxldCBidXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYWRkLXVybC1idXR0b24nKTtcclxubGV0IGlucHV0Zm9ybSA9IG5ldyBJbnB1dEZvcm0oaW5wdXQsIGJ1dHRvbiwgeW91dHViZVBsYXllcik7XHJcblxyXG53aW5kb3cub25Zb3VUdWJlSWZyYW1lQVBJUmVhZHkgPSBmdW5jdGlvbigpIHtcclxuICAgIHlvdXR1YmVQbGF5ZXIub25Zb3VUdWJlSWZyYW1lQVBJUmVhZHkod2luZG93LllUKTtcclxufTtcclxuIl19
