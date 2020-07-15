export interface ClockControlsElements{
    DIVcurrentTime:  HTMLElement,    
    DIVdurationTime: HTMLElement, 
}

class ClockControl{

    private MainMedia: HTMLMediaElement;
    private Elements:  ClockControlsElements;    
    
    constructor(Elements: ClockControlsElements,  extras: any = {}){
        this.Elements = Elements;
    }

    init(MainMedia: HTMLMediaElement){
        this.MainMedia = MainMedia;
        this.showMediaDuration = this.showMediaDuration.bind(this);      
        this.showMediaCurrentTime = this.showMediaCurrentTime.bind(this);
        this.printTime(this.Elements.DIVdurationTime, this.MainMedia.duration || 0); //It should like this because the video is embeded in HTML and the cache somtimes dont trigger the event durationchange
        this.addEventListener();
    }
    
    checkZeros(time: string): string{
        return time==='00'? '' : `${time}:`;
    }

    printTime(displatElement: HTMLElement, timeToDisplay: number): void{
        const array: string[] = this.getMediaHourMinSec(timeToDisplay);
        displatElement.innerHTML = `${this.checkZeros(array[0])}${array[1]}:${array[2]}`;
    }
    
    getMediaHourMinSec(mediaSeconds: number): string[]{
        const mediaHours: number = mediaSeconds / 3600;                         //seconds to hours
        const mediaMins:  number = (mediaHours - Math.floor(mediaHours)) * 60;  //Hours to mins
        const mediaSecs:  number = (mediaMins - Math.floor(mediaMins)) * 60;    //Mins to seconds
        
        return [Math.floor(mediaHours).toString().padStart(2,'0'),
                Math.floor(mediaMins) .toString().padStart(2,'0'),
                Math.floor(mediaSecs) .toString().padStart(2,'0')];
    }
    
    showMediaDuration(){
        this.printTime(this.Elements.DIVdurationTime, this.MainMedia.duration);
    }
    
    showMediaCurrentTime(){
        this.printTime(this.Elements.DIVcurrentTime, this.MainMedia.currentTime);
    }
    
    private addEventListener(): void{
        this.MainMedia.addEventListener('durationchange',this.showMediaDuration);
        this.MainMedia.addEventListener('timeupdate',this.showMediaCurrentTime);
    }   
}

export default ClockControl;