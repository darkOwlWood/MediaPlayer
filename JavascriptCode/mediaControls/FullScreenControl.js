//CSS_CLASS_ARRAY[0]: top-left
//CSS_CLASS_ARRAY[1]: top-rigth
//CSS_CLASS_ARRAY[2]: bottom-left
//CSS_CLASS_ARRAY[3]: bottom-rigth
class FullScreenControl {
    constructor(Elements, extras = {}) {
        this.Elements = Elements;
    }
    init(MainMedia) {
        this.MainMedia = MainMedia;
        this.toggleSizeIcon = this.toggleSizeIcon.bind(this);
        this.toggleVideoFullScreen = this.toggleVideoFullScreen.bind(this);
        this.addEventListeners();
    }
    addFramesToNodes(classes) {
        this.Elements.SPNiconPartList.forEach((val, ndx) => val.classList.add(classes[ndx]));
    }
    removeFramesToNodes(classes) {
        this.Elements.SPNiconPartList.forEach((val, ndx) => val.classList.remove(classes[ndx]));
    }
    crossIcon() {
        this.removeFramesToNodes(this.Elements.CSS_CLASS_ARRAY);
        this.addFramesToNodes([...this.Elements.CSS_CLASS_ARRAY].reverse());
    }
    squareIcon() {
        this.removeFramesToNodes([...this.Elements.CSS_CLASS_ARRAY].reverse());
        this.addFramesToNodes(this.Elements.CSS_CLASS_ARRAY);
    }
    toggleSizeIcon() {
        document.fullscreenElement ? this.crossIcon() : this.squareIcon();
    }
    toggleVideoFullScreen() {
        !document.fullscreenElement ? this.Elements.DIVvideocontainer.requestFullscreen() : document.exitFullscreen();
    }
    addEventListeners() {
        this.Elements.DIVresizeSection.addEventListener('click', this.toggleVideoFullScreen);
        document.addEventListener('fullscreenchange', this.toggleSizeIcon);
    }
}
export default FullScreenControl;
