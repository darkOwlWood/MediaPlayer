class PlayScreenPlugin {
    constructor() {
        this.togglePlayState = this.togglePlayState.bind(this);
    }
    run(MainMedia) {
        this.MainMedia = MainMedia;
        this.addEventListeners();
    }
    togglePlayState() {
        this.MainMedia.paused ?
            this.MainMedia.play()
            : this.MainMedia.pause();
    }
    addEventListeners() {
        this.MainMedia.addEventListener('click', this.togglePlayState);
    }
}
export default PlayScreenPlugin;
