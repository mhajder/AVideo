<?php

require_once $global['systemRootPath'] . 'plugin/Plugin.abstract.php';
require_once $global['systemRootPath'] . 'plugin/AVideoPlugin.php';
class VideoJsResolutionSwitcher extends PluginAbstract {

    public function getTags() {
        return array(
            PluginTags::$FREE,
            PluginTags::$PLAYER,
            PluginTags::$LAYOUT,
        );
    }

    public function getDescription() {
        return "Change video quality with just one click";
    }

    public function getName() {
        return "VideoJsResolutionSwitcher";
    }

    public function getUUID() {
        return "ADO73225-3807-4167-ba81-0509dd668e06";
    }

    public function getPluginVersion() {
        return "1.0";
    }

    public function getHeadCode() {
        global $global;

        $css = '<link href="' . $global['webSiteRootURL'] . 'plugin/VideoJsResolutionSwitcher/videojs-resolution-switcher.css" rel="stylesheet" type="text/css"/>';
        return $css;
    }

    public function getFooterCode() {
        global $global;

        $js = '<script src="' . $global['webSiteRootURL'] . 'plugin/VideoJsResolutionSwitcher/videojs-resolution-switcher.js"></script>';
        $js .= '<script src="' . $global['webSiteRootURL'] . 'plugin/VideoJsResolutionSwitcher/script.js"></script>';
        $js .= '<script>var videoJsResolutionSwitcherDefault = "\'Auto\'";</script>';
        return $js;
    }
}
