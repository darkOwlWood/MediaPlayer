class ProgressBarControls {
    constructor(Elements, extras = {}) {
        this.Elements = Elements;
    }
    init(MainMedia) {
        this.MainMedia = MainMedia;
        this.moveProgressBar = this.moveProgressBar.bind(this);
        this.resizeProgressBar = this.resizeProgressBar.bind(this);
        this.moveVideoTime = this.moveVideoTime.bind(this);
        this.addEventListeners();
    }
    moveProgressBar() {
        const currentWidthBar = ((100 * this.MainMedia.currentTime) / this.MainMedia.duration).toFixed(3);
        this.Elements.DIVprogressBar.style.width = `${currentWidthBar}%`;
    }
    resizeProgressBar(event) {
        const WrapperSizes = this.Elements.DIVprogressWrapper.getBoundingClientRect();
        const mouseCoorX = Math.floor(event.clientX - WrapperSizes.x); //progress bar with px
        let progressBarWith = (100 * mouseCoorX) / WrapperSizes.width; //progress bar with %
        progressBarWith = progressBarWith < 0 ? 0 : progressBarWith > 100 ? 100 : progressBarWith;
        this.Elements.DIVprogressBar.style.width = `${progressBarWith}%`;
        this.moveVideoTime(progressBarWith);
    }
    moveVideoTime(currentWidthBar) {
        const videoCurrentTime = (currentWidthBar * this.MainMedia.duration) / 100;
        this.MainMedia.currentTime = videoCurrentTime;
    }
    addEventListeners() {
        this.MainMedia.addEventListener('timeupdate', this.moveProgressBar);
        this.Elements.DIVprogressWrapper.addEventListener('mousedown', (event) => {
            event.preventDefault();
            this.MainMedia.removeEventListener('timeupdate', this.moveProgressBar);
            this.resizeProgressBar(event);
            window.addEventListener('mousemove', this.resizeProgressBar);
        });
        window.addEventListener('mouseup', () => {
            window.removeEventListener('mousemove', this.resizeProgressBar);
            this.MainMedia.addEventListener('timeupdate', this.moveProgressBar);
        });
    }
}
export default ProgressBarControls;
