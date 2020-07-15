class AutoPause {
    constructor() {
        this.threshold = 0.25;
        this.lastStateObserver = false;
        this.lastStateVisibility = false;
        this.handler = this.handler.bind(this);
        this.stopVideoWhenSwitchTab = this.stopVideoWhenSwitchTab.bind(this);
    }
    run(MainMedia) {
        this.MainMedia = MainMedia;
        this.setMediaObserver();
        this.addEventListeners();
    }
    setMediaObserver() {
        const observer = new IntersectionObserver(this.handler, { threshold: this.threshold });
        observer.observe(this.MainMedia);
    }
    handler(entries) {
        if (entries[0].intersectionRatio < this.threshold) {
            this.lastStateObserver = !this.MainMedia.paused;
            this.MainMedia.pause();
        }
        else if (this.lastStateObserver) {
            this.MainMedia.play();
        }
    }
    stopVideoWhenSwitchTab() {
        if (document.visibilityState === 'hidden') {
            this.lastStateVisibility = !this.MainMedia.paused;
            this.MainMedia.pause();
        }
        else if (this.lastStateVisibility) {
            this.MainMedia.play();
        }
    }
    addEventListeners() {
        document.addEventListener('visibilitychange', this.stopVideoWhenSwitchTab);
    }
}
export default AutoPause;
