var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '390',
        width: '640',
        videoId: 'm0KFY6o6unw',
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
    event.target.playVideo();
}

function onPlayerStateChange(event) {
}

var start = 0;
var end = 0;

function toggle() {
    if (player.getPlayerState() == YT.PlayerState.PLAYING) {
        player.pauseVideo();
        end = player.getCurrentTime();
    } else {
        player.playVideo();
        start = player.getCurrentTime();
    }
}

function replay() {
    player.seekTo(start);
    if (player.getPlayerState() == YT.PlayerState.PLAYING) {
        end = player.getCurrentTime();
    } else {
        player.playVideo();
    }
    var duration = end - start;
    setTimeout(pause, duration * 1000);
}

function pause() {
    player.pauseVideo();
}

document.body.onkeydown = function(event) {
    event = event || window.event;    
    var keycode = event.charCode || event.keyCode;    
    switch (keycode) {
        case 80: //p
            toggle();
            break;
        case 82: //r
            replay();
            break;
    }
}