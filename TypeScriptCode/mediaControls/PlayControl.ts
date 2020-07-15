//CSS_CLASS_ARRAY[0] = play
//CSS_CLASS_ARRAY[1] = pause
//CSS_CLASS_ARRAY[2] = rewind

export interface PlayControlElements{
    DIVwrapperPlay:    HTMLElement,
    SPNplayIcon:       HTMLElement,
    CSS_CLASS_ARRAY:   string[];
}

class PlayControl{

    private MainMedia: HTMLMediaElement;
    private Elements:  PlayControlElements;

    constructor(Elements: PlayControlElements,  extras: any = {}){
        this.Elements = Elements;
    }

    init(MainMedia: HTMLMediaElement){
        this.MainMedia = MainMedia;
        this.setIconBaseCurrentState = this.setIconBaseCurrentState.bind(this);
        this.playButtonMainAction = this.playButtonMainAction.bind(this);
        this.addEventListeners();
    }

    play(): void{
        this.MainMedia.play();
    }

    pause(): void{
        this.MainMedia.pause();
    }

    private pauseIcon(): void{
        this.Elements.SPNplayIcon.classList.remove(this.Elements.CSS_CLASS_ARRAY[0]);
        this.Elements.SPNplayIcon.classList.remove(this.Elements.CSS_CLASS_ARRAY[2]);
        this.Elements.SPNplayIcon.classList.add(this.Elements.CSS_CLASS_ARRAY[1]);
    }

    private playIcon(): void{
        this.Elements.SPNplayIcon.classList.remove(this.Elements.CSS_CLASS_ARRAY[2]);
        this.Elements.SPNplayIcon.classList.remove(this.Elements.CSS_CLASS_ARRAY[1]);
        this.Elements.SPNplayIcon.classList.add(this.Elements.CSS_CLASS_ARRAY[0]);
    }

    private rewindIcon(): void{
        this.Elements.SPNplayIcon.classList.remove(this.Elements.CSS_CLASS_ARRAY[0]);
        this.Elements.SPNplayIcon.classList.remove(this.Elements.CSS_CLASS_ARRAY[1]);
        this.Elements.SPNplayIcon.classList.add(this.Elements.CSS_CLASS_ARRAY[2]);
    }

    isMediaPlaying(): boolean{
        return !this.MainMedia.paused;
    }

    private togglePlaySate(isPlay: boolean): void{
        isPlay? this.pause() : this.play();
    }

    private togglePlayAnimation(isPlay: boolean): void{
        isPlay? this.pauseIcon() : this.playIcon();
    }

    private playButtonMainAction(): void{
        this.togglePlaySate(this.isMediaPlaying());
        this.togglePlayAnimation(this.isMediaPlaying()); //This shouldn't be here but makes the animation more faster
    }

    private setIconBaseCurrentState(): void{
        this.MainMedia.ended?
         this.rewindIcon()
        :this.togglePlayAnimation(this.isMediaPlaying());
    }

    private addEventListeners(): void{
        this.MainMedia.addEventListener('timeupdate', this.setIconBaseCurrentState);
        this.Elements.DIVwrapperPlay.addEventListener('click', this.playButtonMainAction);
    }
}

export default PlayControl;
