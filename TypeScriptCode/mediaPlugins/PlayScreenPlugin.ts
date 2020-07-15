
class PlayScreenPlugin{

    private MainMedia: HTMLMediaElement;

    constructor(){
        this.togglePlayState = this.togglePlayState.bind(this);
    }

    run(MainMedia: HTMLMediaElement){
        this.MainMedia = MainMedia;
        this.addEventListeners();
    }

    private togglePlayState(){
        this.MainMedia.paused?
         this.MainMedia.play()
        :this.MainMedia.pause();
    }

    private addEventListeners(){
        this.MainMedia.addEventListener('click', this.togglePlayState);
    }
}

export default PlayScreenPlugin;