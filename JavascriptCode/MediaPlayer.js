class MediaPlayer {
    constructor(MainMedia, obj) {
        this.MainMedia = MainMedia;
        this.VIDEO_CONTROLS = obj.VIDEO_CONTROLS;
        this.VIDEO_PLUGINS = obj.VIDEO_PLUGINS;
    }
    initControls() {
        this.VIDEO_CONTROLS.forEach(element => {
            element.init(this.MainMedia);
        });
    }
    initPlugins() {
        this.VIDEO_PLUGINS.forEach(element => {
            element.run(this.MainMedia);
        });
    }
}
export default MediaPlayer;
