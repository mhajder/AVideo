$(document).ready(function () {
    setResolutionClick();
});

function setResolutionClick() {

    if (!playerIsReady()) {
        setTimeout(function () {
            setResolutionClick();
        }, 200);
        return false;
    }

    var lastResolution = getLastResolution();
    if (lastResolution) {
        videoJsResolutionSwitcherDefault = lastResolution;
    }
    //console.log('setResolutionClick', videoJsResolutionSwitcherDefault);
    player.videoJsResolutionSwitcher({default: videoJsResolutionSwitcherDefault});

    setTimeout(function () {
        $('.vjs-resolution-button').siblings('.vjs-menu').find('li').click(function () {
            var label = $(this).find('.vjs-menu-item-text').text();
            //console.log('setResolutionClick::newResolution', label);
            var newResolution = $('#mainVideo').find('source[label="' + label + '"]').attr('res');
            if(typeof newResolution === 'undefined'){
                label = label.replace("HD", '');
                label = label.replace("FHD", '');
                label = label.replace("4K", '');
                label = label.replace("FHD+", '');
                //console.log('setResolutionClick::newResolution again ', label);
                newResolution = $('#mainVideo').find('source[label="' + label + '"]').attr('res');
            }
            if(typeof newResolution === 'undefined'){
                newResolution = label.replace(/\D/g,'');
            }
            //console.log('setResolutionClick::newResolution', newResolution);
            Cookies.set('lastResolution', newResolution, {
                path: '/',
                expires: 365
            });

            setTimeout(function () {
                player.play();
            }, 1000);
        });
    }, 1000);

}

function getLastResolution() {
    var lastResolution = parseInt(Cookies.get('lastResolution'));
    if (lastResolution) {
        //console.log('getLastResolution found: ', lastResolution);
        var resolutions = [240, 360, 480, 560, 720, 1080, 1440, 2160];
        if ($('#mainVideo').find('source[res="' + lastResolution + '"]').length) {
            return lastResolution;
        }
        //console.log('getLastResolution video does not have this resolution');
        for(var i = resolutions.length-1; i>=0;i--){
            if(resolutions.length[i]>lastResolution){
                continue;
            }
            if ($('#mainVideo').find('source[res="' + resolutions[i] + '"]').length) {
                //console.log('getLastResolution new resolution found: ', resolutions[i]);
                return resolutions[i];
            }
            //console.log('getLastResolution lower not found: ', resolutions.length[i]);
        }
        //console.log('getLastResolution no lower resolution available');
        for(var i = resolutions.length-1; i>=0;i--){
            if ($('#mainVideo').find('source[res="' + resolutions[i] + '"]').length) {
                //console.log('getLastResolution gettinh the first available ', resolutions[i]);
                return resolutions[i];
            }
        }
    }
    //console.log('getLastResolution not found');
    return 0;
}

function changeVideoSrc(vid_obj, source) {
    vid_obj.updateSrc(source);
    vid_obj.src(source);
    vid_obj.load();
    vid_obj.play();
}
