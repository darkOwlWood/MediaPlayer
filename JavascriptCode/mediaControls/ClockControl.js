class ClockControl {
    constructor(Elements, extras = {}) {
        this.Elements = Elements;
    }
    init(MainMedia) {
        this.MainMedia = MainMedia;
        this.showMediaDuration = this.showMediaDuration.bind(this);
        this.showMediaCurrentTime = this.showMediaCurrentTime.bind(this);
        this.printTime(this.Elements.DIVdurationTime, this.MainMedia.duration || 0); //It should like this because the video is embeded in HTML and the cache somtimes dont trigger the event durationchange
        this.addEventListener();
    }
    checkZeros(time) {
        return time === '00' ? '' : `${time}:`;
    }
    printTime(displatElement, timeToDisplay) {
        const array = this.getMediaHourMinSec(timeToDisplay);
        displatElement.innerHTML = `${this.checkZeros(array[0])}${array[1]}:${array[2]}`;
    }
    getMediaHourMinSec(mediaSeconds) {
        const mediaHours = mediaSeconds / 3600; //seconds to hours
        const mediaMins = (mediaHours - Math.floor(mediaHours)) * 60; //Hours to mins
        const mediaSecs = (mediaMins - Math.floor(mediaMins)) * 60; //Mins to seconds
        return [Math.floor(mediaHours).toString().padStart(2, '0'),
            Math.floor(mediaMins).toString().padStart(2, '0'),
            Math.floor(mediaSecs).toString().padStart(2, '0')];
    }
    showMediaDuration() {
        this.printTime(this.Elements.DIVdurationTime, this.MainMedia.duration);
    }
    showMediaCurrentTime() {
        this.printTime(this.Elements.DIVcurrentTime, this.MainMedia.currentTime);
    }
    addEventListener() {
        this.MainMedia.addEventListener('durationchange', this.showMediaDuration);
        this.MainMedia.addEventListener('timeupdate', this.showMediaCurrentTime);
    }
}
export default ClockControl;
