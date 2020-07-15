console.log('CanRunAd' in window);
if (!('CanRunAd' in window)) {
    const DIVcomments = document.querySelector('.comments');
    const DIVcomment = document.createElement('div');
    const DIVreferenceNode = document.querySelector('.comment:first-child');
    DIVcomment.classList.add('comment');
    DIVcomment.innerHTML = `
        <div class="comment__picture" style="background-image: url('https://vignette.wikia.nocookie.net/jojo/images/3/31/Dio_Brando_Anime.png/revision/latest?cb=20160623041757&path-prefix=es');"></div>
        <div class="comment_info">
            <div class="comment__user-name">Dio Brando</div>
            <div class="comment__body">You expected to use the "media player", too bad, it was me DIO!!!. Now listen carefully due to the way the code was made and the nature of the AddBlock plugins, when the addblock is activate it breaks all the code of the "media player" so, if you want to use the media player you should deactivate your addBlock in this page.</div>
        </div>`;
    DIVcomments.insertBefore(DIVcomment, DIVreferenceNode);
    const DIVbannerWarning = document.createElement('div');
    const DIVvideocontainer = document.querySelector('.video-container');
    const DIVreferenceNode2 = document.querySelector('.main-video');
    DIVbannerWarning.classList.add('banner-warning');
    DIVbannerWarning.innerHTML = `:c You need to deactivate the addblock, read the DIO comment for more info`;
    DIVvideocontainer.insertBefore(DIVbannerWarning, DIVreferenceNode2);
}
