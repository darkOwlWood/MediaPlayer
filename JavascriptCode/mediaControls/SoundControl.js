//CSS_CLASS_ARRAY[0] silent
class SoundControl {
    constructor(Elements, extras = {}) {
        this.initVolume = extras.initVolume;
        this.Elements = Elements;
    }
    init(MainMedia) {
        this.MainMedia = MainMedia;
        this.lastWith = `${this.initVolume}%`;
        this.setVolume(this.initVolume);
        this.Elements.DIVsoundBar.style.width = `${this.initVolume}%`;
        this.muteControl = this.muteControl.bind(this);
        this.moveSoundBar = this.moveSoundBar.bind(this);
        this.addEventListeners();
    }
    setMuteState(mute) {
        this.MainMedia.muted = mute;
    }
    getMuteState() {
        return this.MainMedia.muted;
    }
    getVolume() {
        return this.MainMedia.volume;
    }
    setVolume(soundBarWith) {
        const volume = (soundBarWith * 1) / 100;
        this.MainMedia.volume = volume;
    }
    toggleSoundBar(mute) {
        this.lastWith = mute ? this.Elements.DIVsoundBar.style.width : this.lastWith;
        this.Elements.DIVsoundBar.style.width = mute ? '0%' : this.lastWith;
    }
    muteAnimation(mute) {
        mute ?
            this.Elements.DIVprohibitionSign.classList.add(this.Elements.CSS_CLASS_ARRAY[0])
            : this.Elements.DIVprohibitionSign.classList.remove(this.Elements.CSS_CLASS_ARRAY[0]);
    }
    moveSoundBar(event) {
        //this 3 lines depents to much of css
        const soundWrapper = this.Elements.DIVsoundBarWrapper.getBoundingClientRect();
        const mouseCoorX = Math.floor(event.clientX - soundWrapper.x); //This could change to Y if vertical of X is is Horizontal
        let soundBarWith = (100 * mouseCoorX) / soundWrapper.width;
        soundBarWith = soundBarWith < 0 ? 0 : soundBarWith > 100 ? 100 : soundBarWith;
        this.Elements.DIVsoundBar.style.width = `${soundBarWith}%`;
        //set mute state and show animation if it requerie
        this.setMuteState(!soundBarWith);
        this.muteAnimation(!soundBarWith);
        //set the current volume base on the sound bar
        this.setVolume(soundBarWith);
    }
    addEventListeners() {
        this.Elements.DIVsoundSignWrapper.addEventListener('click', this.muteControl);
        this.Elements.DIVsoundBarWrapper.addEventListener('mousedown', () => {
            event.preventDefault();
            this.moveSoundBar(event);
            window.addEventListener('mousemove', this.moveSoundBar);
        });
        window.addEventListener('mouseup', () => {
            window.removeEventListener('mousemove', this.moveSoundBar);
        });
    }
    muteControl() {
        //the volume should'nt be 0 to run this code
        if (this.getVolume()) {
            this.setMuteState(!this.getMuteState());
            this.muteAnimation(this.getMuteState());
            this.toggleSoundBar(this.getMuteState());
        }
    }
}
export default SoundControl;
