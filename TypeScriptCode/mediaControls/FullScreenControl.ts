//CSS_CLASS_ARRAY[0]: top-left
//CSS_CLASS_ARRAY[1]: top-rigth
//CSS_CLASS_ARRAY[2]: bottom-left
//CSS_CLASS_ARRAY[3]: bottom-rigth

export interface FullScreenControlElements{
    DIVvideocontainer: HTMLElement,
    DIVresizeSection:  HTMLElement,
    SPNiconPartList:   NodeListOf<HTMLElement>,
    CSS_CLASS_ARRAY:   string[],
}

class FullScreenControl{

    private MainMedia: HTMLMediaElement;
    private Elements:  FullScreenControlElements;

    constructor(Elements: FullScreenControlElements, extras: any = {}){
        this.Elements = Elements;
    }

    init(MainMedia: HTMLMediaElement){
        this.MainMedia = MainMedia;
        this.toggleSizeIcon = this.toggleSizeIcon.bind(this);
        this.toggleVideoFullScreen = this.toggleVideoFullScreen.bind(this);
        this.addEventListeners();
    }
    
    addFramesToNodes(classes: string[]){
        this.Elements.SPNiconPartList.forEach( (val,ndx) => val.classList.add(classes[ndx]) );
    }
    
    removeFramesToNodes(classes: string[]){
        this.Elements.SPNiconPartList.forEach( (val,ndx) => val.classList.remove(classes[ndx]) );
    }
    
    crossIcon(): void{
        this.removeFramesToNodes(this.Elements.CSS_CLASS_ARRAY);
        this.addFramesToNodes([...this.Elements.CSS_CLASS_ARRAY].reverse());
    }
    
    squareIcon(): void{
        this.removeFramesToNodes([...this.Elements.CSS_CLASS_ARRAY].reverse());
        this.addFramesToNodes(this.Elements.CSS_CLASS_ARRAY);
    }
    
    private toggleSizeIcon(): void{
        document.fullscreenElement? this.crossIcon() : this.squareIcon();
    }

    private toggleVideoFullScreen(): void{
        !document.fullscreenElement? this.Elements.DIVvideocontainer.requestFullscreen() : document.exitFullscreen();
    }

    private addEventListeners(): void{
        this.Elements.DIVresizeSection.addEventListener('click',this.toggleVideoFullScreen)
        document.addEventListener('fullscreenchange',this.toggleSizeIcon);
    }
}

export default FullScreenControl;