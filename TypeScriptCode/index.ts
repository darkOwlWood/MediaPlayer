//CONTROLS
import MediaPlayer,        {MediaPlayerElements}         from './MediaPlayer.js';
import PlayControl,        {PlayControlElements}         from './mediaControls/PlayControl.js'
import SoundControl,       {SoundControlElements}        from './mediaControls/SoundControl.js';
import ClockControl,       {ClockControlsElements}       from './mediaControls/ClockControl.js';
import FullScreenControl,  {FullScreenControlElements}   from './mediaControls/FullScreenControl.js'
import ProgressBarControls,{ProgressBarControlsElements} from './mediaControls/ProgressBarControl.js';

//PLUGINS
import AutoPausePlugin      from './mediaPlugins/AutoPausePlugin.js';
import AdPlugin             from './mediaPlugins/AdPlugin/AdPlugin.js';
import PlayScreenPlugin     from './mediaPlugins/PlayScreenPlugin.js';
import HideControlBarPlugin from './mediaPlugins/HideControlBarPlugin.js';

const MainMedia = document.querySelector('video');

/*=====PLAY=====*/
const PLAY_CONTROL_ELEMENTS: PlayControlElements = {
    DIVwrapperPlay:    document.querySelector('.play-section'),   
    SPNplayIcon:       document.querySelector('.play-icon'),
    CSS_CLASS_ARRAY:   ['play-icon--play','play-icon--pause','play-icon--rewind'],
}

/*=====SOUND=====*/
const SOUND_CONTROL_ELEMENTS: SoundControlElements = {
    DIVsoundBar:         document.querySelector('.sound-bar'),
    DIVprohibitionSign:  document.querySelector('.prohibition-sign'),
    DIVsoundSignWrapper: document.querySelector('.sign-wrapper'),
    DIVsoundBarWrapper:  document.querySelector('.sound-bar-wrapper'),
    CSS_CLASS_ARRAY:     ['prohibition-sign--slient'],
}

/*=====CLOCK=====*/
const CLOCK_CONTROLS_ELEMENTS: ClockControlsElements = {
    DIVcurrentTime:   document.querySelector('.current-time  .clock-time'),
    DIVdurationTime:  document.querySelector('.duration-time .clock-time'),
}

/*=====RESIZE=====*/
const FULLSCREEN_CONTROL_ELEMENTS: FullScreenControlElements = {
    DIVvideocontainer: document.querySelector('.video-container'),
    DIVresizeSection:  document.querySelector('.resize-section'),
    SPNiconPartList:   document.querySelectorAll<HTMLElement>('.icon-part'),
    CSS_CLASS_ARRAY:   ['icon-part__top-left','icon-part__top-rigth','icon-part__bottom-left','icon-part__bottom-rigth'],
}

/*=====PROGRESS=====*/
const PROGRESSBAR_CONTROLS_ELEMENTS : ProgressBarControlsElements = {
    DIVprogressBar:     document.querySelector('.progress-wrapper__bar'),
    DIVprogressWrapper: document.querySelector('.progress-wrapper'),
}

/************************/
const MEDIA_PLAYER_ELEMENTS: MediaPlayerElements = {
    VIDEO_CONTROLS: [new PlayControl(PLAY_CONTROL_ELEMENTS),
                     new SoundControl(SOUND_CONTROL_ELEMENTS,{initVolume: 25}),
                     new ClockControl(CLOCK_CONTROLS_ELEMENTS),
                     new FullScreenControl(FULLSCREEN_CONTROL_ELEMENTS),
                     new ProgressBarControls(PROGRESSBAR_CONTROLS_ELEMENTS)],

    VIDEO_PLUGINS: [new AutoPausePlugin(), 
                    new AdPlugin(), 
                    new PlayScreenPlugin(),
                    new HideControlBarPlugin(),],
}

const mediaPlayer: MediaPlayer = new MediaPlayer(MainMedia, MEDIA_PLAYER_ELEMENTS);
mediaPlayer.initControls();
mediaPlayer.initPlugins();
/************************/

