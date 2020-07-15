export interface MediaPlayerElements{
    VIDEO_CONTROLS: any[],
    VIDEO_PLUGINS:  any[],
}

class MediaPlayer{

    private MainMedia: HTMLMediaElement;
    private VIDEO_CONTROLS: any[]; 
    private VIDEO_PLUGINS:  any[];

    constructor(MainMedia: HTMLMediaElement,obj: MediaPlayerElements){
        this.MainMedia      = MainMedia;
        this.VIDEO_CONTROLS = obj.VIDEO_CONTROLS;
        this.VIDEO_PLUGINS  = obj.VIDEO_PLUGINS; 
    }

    initControls(){
        this.VIDEO_CONTROLS.forEach(element => {
            element.init(this.MainMedia);
        });
    }

    initPlugins(){
        this.VIDEO_PLUGINS.forEach(element => {
            element.run(this.MainMedia);
        });
    }
}

export default MediaPlayer;