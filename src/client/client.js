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
