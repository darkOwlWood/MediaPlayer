class HideControlBarPlugin {
    constructor() {
        this.visibleTime = 7; //miliseconds 
        this.flagDown = false;
        this.makePanelInvisible = this.makePanelInvisible.bind(this);
        this.makePanelVisible = this.makePanelVisible.bind(this);
    }
    run(MainMedia) {
        this.MainMedia = MainMedia;
        this.controlPanel = this.MainMedia.parentNode.parentNode.querySelector('.video-controls');
        this.setTimeoutId = setTimeout(this.makePanelInvisible, this.visibleTime * 1000);
        this.addEventListeners();
    }
    makePanelInvisible() {
        this.controlPanel.classList.add('video-controls--invisible');
    }
    makePanelVisible() {
        clearTimeout(this.setTimeoutId);
        this.controlPanel.classList.remove('video-controls--invisible');
        this.setTimeoutId = setTimeout(this.makePanelInvisible, this.visibleTime * 1000);
    }
    addEventListeners() {
        this.MainMedia.parentNode.parentNode.addEventListener('mousemove', this.makePanelVisible);
    }
}
export default HideControlBarPlugin;
