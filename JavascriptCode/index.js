//CONTROLS
import MediaPlayer from './MediaPlayer.js';
import PlayControl from './mediaControls/PlayControl.js';
import SoundControl from './mediaControls/SoundControl.js';
import ClockControl from './mediaControls/ClockControl.js';
import FullScreenControl from './mediaControls/FullScreenControl.js';
import ProgressBarControls from './mediaControls/ProgressBarControl.js';
//PLUGINS
import AutoPausePlugin from './mediaPlugins/AutoPausePlugin.js';
import AdPlugin from './mediaPlugins/AdPlugin/AdPlugin.js';
import PlayScreenPlugin from './mediaPlugins/PlayScreenPlugin.js';
import HideControlBarPlugin from './mediaPlugins/HideControlBarPlugin.js';
const MainMedia = document.querySelector('video');
/*=====PLAY=====*/
const PLAY_CONTROL_ELEMENTS = {
    DIVwrapperPlay: document.querySelector('.play-section'),
    SPNplayIcon: document.querySelector('.play-icon'),
    CSS_CLASS_ARRAY: ['play-icon--play', 'play-icon--pause', 'play-icon--rewind'],
};
/*=====SOUND=====*/
const SOUND_CONTROL_ELEMENTS = {
    DIVsoundBar: document.querySelector('.sound-bar'),
    DIVprohibitionSign: document.querySelector('.prohibition-sign'),
    DIVsoundSignWrapper: document.querySelector('.sign-wrapper'),
    DIVsoundBarWrapper: document.querySelector('.sound-bar-wrapper'),
    CSS_CLASS_ARRAY: ['prohibition-sign--slient'],
};
/*=====CLOCK=====*/
const CLOCK_CONTROLS_ELEMENTS = {
    DIVcurrentTime: document.querySelector('.current-time  .clock-time'),
    DIVdurationTime: document.querySelector('.duration-time .clock-time'),
};
/*=====RESIZE=====*/
const FULLSCREEN_CONTROL_ELEMENTS = {
    DIVvideocontainer: document.querySelector('.video-container'),
    DIVresizeSection: document.querySelector('.resize-section'),
    SPNiconPartList: document.querySelectorAll('.icon-part'),
    CSS_CLASS_ARRAY: ['icon-part__top-left', 'icon-part__top-rigth', 'icon-part__bottom-left', 'icon-part__bottom-rigth'],
};
/*=====PROGRESS=====*/
const PROGRESSBAR_CONTROLS_ELEMENTS = {
    DIVprogressBar: document.querySelector('.progress-wrapper__bar'),
    DIVprogressWrapper: document.querySelector('.progress-wrapper'),
};
/************************/
const MEDIA_PLAYER_ELEMENTS = {
    VIDEO_CONTROLS: [new PlayControl(PLAY_CONTROL_ELEMENTS),
        new SoundControl(SOUND_CONTROL_ELEMENTS, { initVolume: 25 }),
        new ClockControl(CLOCK_CONTROLS_ELEMENTS),
        new FullScreenControl(FULLSCREEN_CONTROL_ELEMENTS),
        new ProgressBarControls(PROGRESSBAR_CONTROLS_ELEMENTS)],
    VIDEO_PLUGINS: [new AutoPausePlugin(),
        new AdPlugin(),
        new PlayScreenPlugin(),
        new HideControlBarPlugin(),],
};
const mediaPlayer = new MediaPlayer(MainMedia, MEDIA_PLAYER_ELEMENTS);
mediaPlayer.initControls();
mediaPlayer.initPlugins();
/************************/
