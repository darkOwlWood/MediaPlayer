export interface ProgressBarControlsElements{
    DIVprogressBar:     HTMLElement,     
    DIVprogressWrapper: HTMLElement,    
}

class ProgressBarControls{

    private MainMedia: HTMLMediaElement;
    private Elements:  ProgressBarControlsElements 
    
    constructor(Elements: ProgressBarControlsElements, extras: any = {}){
        this.Elements = Elements;
    }

    init(MainMedia: HTMLMediaElement){
        this.MainMedia = MainMedia;
        this.moveProgressBar = this.moveProgressBar.bind(this);
        this.resizeProgressBar = this.resizeProgressBar.bind(this);
        this.moveVideoTime = this.moveVideoTime.bind(this);
        this.addEventListeners();
    }

    private moveProgressBar(): void{
        const currentWidthBar: string = ( (100 * this.MainMedia.currentTime) / this.MainMedia.duration ).toFixed(3);
        this.Elements.DIVprogressBar.style.width = `${currentWidthBar}%`;
    }
    
    private resizeProgressBar(event): void{
        const WrapperSizes:    DOMRect = this.Elements.DIVprogressWrapper.getBoundingClientRect();
        const mouseCoorX:      number  = Math.floor(event.clientX - WrapperSizes.x); //progress bar with px
        let   progressBarWith: number  = (100 * mouseCoorX) /  WrapperSizes.width;   //progress bar with %
        
        progressBarWith = progressBarWith < 0? 0 : progressBarWith > 100? 100 : progressBarWith;
        this.Elements.DIVprogressBar.style.width = `${progressBarWith}%`;
        this.moveVideoTime(progressBarWith);
    }
    
    private moveVideoTime(currentWidthBar: number): void{
        const videoCurrentTime: number = (currentWidthBar * this.MainMedia.duration) / 100;
        this.MainMedia.currentTime = videoCurrentTime;
    }

    private addEventListeners(){
        this.MainMedia.addEventListener('timeupdate', this.moveProgressBar);
        this.Elements.DIVprogressWrapper.addEventListener('mousedown',(event) => {
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