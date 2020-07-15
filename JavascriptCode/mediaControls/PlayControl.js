//CSS_CLASS_ARRAY[0] = play
//CSS_CLASS_ARRAY[1] = pause
//CSS_CLASS_ARRAY[2] = rewind
class PlayControl {
    constructor(Elements, extras = {}) {
        this.Elements = Elements;
    }
    init(MainMedia) {
        this.MainMedia = MainMedia;
        this.setIconBaseCurrentState = this.setIconBaseCurrentState.bind(this);
        this.playButtonMainAction = this.playButtonMainAction.bind(this);
        this.addEventListeners();
    }
    play() {
        this.MainMedia.play();
    }
    pause() {
        this.MainMedia.pause();
    }
    pauseIcon() {
        this.Elements.SPNplayIcon.classList.remove(this.Elements.CSS_CLASS_ARRAY[0]);
        this.Elements.SPNplayIcon.classList.remove(this.Elements.CSS_CLASS_ARRAY[2]);
        this.Elements.SPNplayIcon.classList.add(this.Elements.CSS_CLASS_ARRAY[1]);
    }
    playIcon() {
        this.Elements.SPNplayIcon.classList.remove(this.Elements.CSS_CLASS_ARRAY[2]);
        this.Elements.SPNplayIcon.classList.remove(this.Elements.CSS_CLASS_ARRAY[1]);
        this.Elements.SPNplayIcon.classList.add(this.Elements.CSS_CLASS_ARRAY[0]);
    }
    rewindIcon() {
        this.Elements.SPNplayIcon.classList.remove(this.Elements.CSS_CLASS_ARRAY[0]);
        this.Elements.SPNplayIcon.classList.remove(this.Elements.CSS_CLASS_ARRAY[1]);
        this.Elements.SPNplayIcon.classList.add(this.Elements.CSS_CLASS_ARRAY[2]);
    }
    isMediaPlaying() {
        return !this.MainMedia.paused;
    }
    togglePlaySate(isPlay) {
        isPlay ? this.pause() : this.play();
    }
    togglePlayAnimation(isPlay) {
        isPlay ? this.pauseIcon() : this.playIcon();
    }
    playButtonMainAction() {
        this.togglePlaySate(this.isMediaPlaying());
        this.togglePlayAnimation(this.isMediaPlaying()); //This shouldn't be here but makes the animation more faster
    }
    setIconBaseCurrentState() {
        this.MainMedia.ended ?
            this.rewindIcon()
            : this.togglePlayAnimation(this.isMediaPlaying());
    }
    addEventListeners() {
        this.MainMedia.addEventListener('timeupdate', this.setIconBaseCurrentState);
        this.Elements.DIVwrapperPlay.addEventListener('click', this.playButtonMainAction);
    }
}
export default PlayControl;
