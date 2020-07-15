import AdSingleton, {Ad} from './AdSingleton.js';

class AdPlugin{

    private currentAd:   Ad; 
    private MainMedia:   HTMLMediaElement;
    private AdSingleton: AdSingleton;
    private adContainer: HTMLElement;
    private closeIcon:   HTMLElement;
    private renderTime:  number;
    private cleanTime:   number;

    constructor(){
        this.renderTime  = 50; //seconds
        this.cleanTime   = 10; //seconds
        this.AdSingleton = AdSingleton.getInstance();
        this.cleanAd = this.cleanAd.bind(this);
        this.handleTimeUpdate = this.handleTimeUpdate.bind(this);
    }

    run(MainMedia: HTMLMediaElement){
        this.MainMedia = MainMedia;
        this.setAdContainerToVideo();
        this.createCloseIcon();
        this.addEventListeners();
    }
    
    private setAdContainerToVideo(){
        this.adContainer = document.createElement('div');
        this.MainMedia.parentNode.parentNode.appendChild(this.adContainer);  //video-container
    }

    private createCloseIcon(){
        this.closeIcon = document.createElement('span');
        this.closeIcon.innerHTML = 'X';
        this.closeIcon.classList.add('close-icon');
    }

    private handleTimeUpdate(){
        Math.floor(this.MainMedia.currentTime) % this.renderTime === 0? this.renderAd() : '';
    }

    private renderAd(){
        if(this.currentAd){
            return;
        }

        this.currentAd = this.AdSingleton.getAd();
        this.adContainer.classList.add('ad');
        this.adContainer.innerHTML = `
            <a href="${this.currentAd.url}" class="ad__link">
                <img src="${this.currentAd.imageUrl}" alt="" class="ad__img">
                <div class="ad__info">
                    <h5 class="ad__title">${this.currentAd.title}</h5>
                    <p class="ad__body">${this.currentAd.body}</p>
                </div>
            </a>`;
        this.adContainer.appendChild(this.closeIcon);
        setTimeout(() => this.cleanAd(true), this.cleanTime*1000);
    }
    
    private cleanAd(setAdToNull: boolean){
        setAdToNull? this.currentAd = null : '';
        this.adContainer.innerHTML = '';
        this.adContainer.classList.remove('ad');
    }

    private addEventListeners(){
        this.MainMedia.addEventListener('timeupdate', this.handleTimeUpdate);
        this.closeIcon.addEventListener('click', () => this.cleanAd(false) );
    }
}

export default AdPlugin;


//Add a windows property in type script
declare global {
    interface Window { CanRunAd: any; }
}
window.CanRunAd = true;


//In order to have a better experience cleanTime should be short than renderTime