
class AutoPause{
    
    private MainMedia:     HTMLMediaElement;
    private threshold:     number;
    private lastStateObserver:   boolean;
    private lastStateVisibility: boolean;

    constructor(){
        this.threshold = 0.25;
        this.lastStateObserver = false;
        this.lastStateVisibility = false;
        this.handler = this.handler.bind(this);
        this.stopVideoWhenSwitchTab = this.stopVideoWhenSwitchTab.bind(this);
    }

    run(MainMedia: HTMLMediaElement){
        this.MainMedia = MainMedia;
        this.setMediaObserver();
        this.addEventListeners();
    }
    
    private setMediaObserver(){
        const observer = new IntersectionObserver(this.handler, {threshold: this.threshold});
        observer.observe(this.MainMedia);
    }
    
    private handler(entries: IntersectionObserverEntry[]){
        if(entries[0].intersectionRatio < this.threshold){
            this.lastStateObserver = !this.MainMedia.paused;
            this.MainMedia.pause();
        }else if(this.lastStateObserver){
            this.MainMedia.play();
        }
    }
    
    private stopVideoWhenSwitchTab(){
        if(document.visibilityState === 'hidden'){
            this.lastStateVisibility = !this.MainMedia.paused;
            this.MainMedia.pause();
        }else if(this.lastStateVisibility){
            this.MainMedia.play();
        }
    }
    
    private addEventListeners(){
        document.addEventListener('visibilitychange',this.stopVideoWhenSwitchTab);
    }
}

export default AutoPause;