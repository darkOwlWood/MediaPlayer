//CSS_CLASS_ARRAY[0] silent

export interface SoundControlElements {
    DIVsoundBar:         HTMLElement;
    DIVprohibitionSign:  HTMLElement;
    DIVsoundSignWrapper: HTMLElement;
    DIVsoundBarWrapper:  HTMLElement;
    CSS_CLASS_ARRAY:     string[];
}


class SoundControl{

        private MainMedia:  HTMLMediaElement;
        private Elements:   SoundControlElements;
        private initVolume: number;
        private lastWith:   string;

    constructor(Elements: SoundControlElements, extras: any = {}){
        this.initVolume = extras.initVolume;
        this.Elements   = Elements;
    }
    
    init(MainMedia: HTMLMediaElement){
        this.MainMedia = MainMedia;
        this.lastWith = `${this.initVolume}%`;
        this.setVolume(this.initVolume);
        this.Elements.DIVsoundBar.style.width = `${this.initVolume}%`;
        this.muteControl = this.muteControl.bind(this);
        this.moveSoundBar = this.moveSoundBar.bind(this);
        this.addEventListeners();
    }
    
    setMuteState(mute: boolean): void{
        this.MainMedia.muted = mute;
    }
    
    getMuteState(): boolean{
        return this.MainMedia.muted;
    }
    
    getVolume(): number{
        return this.MainMedia.volume;
    }

    private setVolume(soundBarWith: number): void{
        const volume = (soundBarWith * 1) / 100;
        this.MainMedia.volume = volume;
    }

    private toggleSoundBar(mute: boolean): void{
        this.lastWith = mute? this.Elements.DIVsoundBar.style.width : this.lastWith;
        this.Elements.DIVsoundBar.style.width = mute? '0%' : this.lastWith;    
    }

    private muteAnimation(mute: boolean): void{
        mute?
         this.Elements.DIVprohibitionSign.classList.add(this.Elements.CSS_CLASS_ARRAY[0])
        :this.Elements.DIVprohibitionSign.classList.remove(this.Elements.CSS_CLASS_ARRAY[0]);
    }

    private moveSoundBar(event): void{
        //this 3 lines depents to much of css
        const soundWrapper: DOMRect = this.Elements.DIVsoundBarWrapper.getBoundingClientRect();
        const mouseCoorX:   number  = Math.floor(event.clientX - soundWrapper.x); //This could change to Y if vertical of X is is Horizontal
        let   soundBarWith: number  = (100 * mouseCoorX) / soundWrapper.width;
    
        soundBarWith = soundBarWith < 0? 0 : soundBarWith > 100? 100 : soundBarWith;  
        this.Elements.DIVsoundBar.style.width = `${soundBarWith}%`;
    
        //set mute state and show animation if it requerie
        this.setMuteState(!soundBarWith);
        this.muteAnimation(!soundBarWith);
    
        //set the current volume base on the sound bar
        this.setVolume(soundBarWith);
    }


    addEventListeners(){
        this.Elements.DIVsoundSignWrapper.addEventListener('click', this.muteControl)
        this.Elements.DIVsoundBarWrapper.addEventListener('mousedown', () => {
            event.preventDefault();
            
            this.moveSoundBar(event);
            window.addEventListener('mousemove', this.moveSoundBar);
        });
        window.addEventListener('mouseup', () => { //Remove event
            window.removeEventListener('mousemove',this.moveSoundBar);
        });
    }

    private muteControl(){
        //the volume should'nt be 0 to run this code
        if(this.getVolume()){
            this.setMuteState(!this.getMuteState());
            this.muteAnimation(this.getMuteState());
            this.toggleSoundBar(this.getMuteState());
        }
    }
}

export default SoundControl;



