import AdSingleton from './AdSingleton.js';
class AdPlugin {
    constructor() {
        this.renderTime = 50; //seconds
        this.cleanTime = 10; //seconds
        this.AdSingleton = AdSingleton.getInstance();
        this.cleanAd = this.cleanAd.bind(this);
        this.handleTimeUpdate = this.handleTimeUpdate.bind(this);
    }
    run(MainMedia) {
        this.MainMedia = MainMedia;
        this.setAdContainerToVideo();
        this.createCloseIcon();
        this.addEventListeners();
    }
    setAdContainerToVideo() {
        this.adContainer = document.createElement('div');
        this.MainMedia.parentNode.parentNode.appendChild(this.adContainer); //video-container
    }
    createCloseIcon() {
        this.closeIcon = document.createElement('span');
        this.closeIcon.innerHTML = 'X';
        this.closeIcon.classList.add('close-icon');
    }
    handleTimeUpdate() {
        Math.floor(this.MainMedia.currentTime) % this.renderTime === 0 ? this.renderAd() : '';
    }
    renderAd() {
        if (this.currentAd) {
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
        setTimeout(() => this.cleanAd(true), this.cleanTime * 1000);
    }
    cleanAd(setAdToNull) {
        setAdToNull ? this.currentAd = null : '';
        this.adContainer.innerHTML = '';
        this.adContainer.classList.remove('ad');
    }
    addEventListeners() {
        this.MainMedia.addEventListener('timeupdate', this.handleTimeUpdate);
        this.closeIcon.addEventListener('click', () => this.cleanAd(false));
    }
}
export default AdPlugin;
window.CanRunAd = true;
//In order to have a better experience cleanTime should be short than renderTime
