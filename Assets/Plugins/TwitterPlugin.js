import System.Runtime.InteropServices;

#if UNITY_IPHONE && !UNITY_EDITOR

@DllImportAttribute("__Internal") static private function _TwitterIsAvailable() : boolean {}
@DllImportAttribute("__Internal") static private function _TwitterComposeTweet(initialText : String, url : String, screenshotPath : String) {}

private var initialText : String;
private var url : String;

static function IsAvailable() : boolean {
    return _TwitterIsAvailable();
}

static function ComposeTweet(initialText : String) {
    _TwitterComposeTweet(initialText, null, null);
}

static function ComposeTweet(initialText : String, url : String) {
    _TwitterComposeTweet(initialText, url, null);
}

static function ComposeTweetWithScreenshot(initialText : String) {
    ComposeTweetWithScreenshot(initialText, null);
}

static function ComposeTweetWithScreenshot(initialText : String, url : String) {
    Application.CaptureScreenshot("screenshot.png");
    var component = (new GameObject()).AddComponent.<TwitterPlugin>();
    component.initialText = initialText;
    component.url = url;
}

function Start() {
    yield;
    _TwitterComposeTweet(initialText, url, Application.persistentDataPath + "/screenshot.png");
    Destroy(gameObject);
}

#else

static function IsAvailable() : boolean {
    return false;
}

static function ComposeTweet(initalText : String) {}
static function ComposeTweet(initalText : String, url : String) {}
static function ComposeTweetWithScreenshot(initialText : String) {}
static function ComposeTweetWithScreenshot(initialText : String, url : String) {}

#endif
