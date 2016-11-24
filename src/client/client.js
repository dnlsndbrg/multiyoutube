let YoutubePlayer = require('./YoutubePlayer');
let InputForm = require('./InputForm');

let youtubePlayer = new YoutubePlayer();
let input = document.querySelector('#input');
let button = document.querySelector('#add-url-button');
let inputform = new InputForm(input, button, youtubePlayer);

window.onYouTubeIframeAPIReady = function() {
    youtubePlayer.onYouTubeIframeAPIReady(window.YT);
};
