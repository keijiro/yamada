#pragma strict

var skin : GUISkin;
var black : Texture2D;

private var stringPaused : String;
private var stringTapToResume : String;

function Awake() {
    if (Application.systemLanguage == SystemLanguage.Japanese) {
        stringPaused = "ポーズ ちゅう";
        stringTapToResume = "タップで さいかい";
    } else {
        stringPaused = "PAUSED";
        stringTapToResume = "TAP TO RESUME";
    }
}

function PauseGame() {
    enabled = true;
}

function Update() {
    if (Input.GetButtonDown("Fire1")) {
        SendMessage("ResumeGame");
        enabled = false;
    }
}

function OnGUI() {
    var sw = Screen.width;
    var sh = Screen.height;
    var scale = Config.GetUIScale();

    GUI.skin = skin;
    GUI.color = Color(1, 1, 1, 0.75);

    GUIUtility.ScaleAroundPivot(Vector2(1.0 / scale, 1.0 / scale), Vector2.zero);
    GUI.DrawTexture(Rect(0, 0, sw * scale, sh * scale), black);

    if (Time.time * 4.0 % 2 > 1.0) {
        GUI.Label(Rect(0, 0, sw * scale, 0.5 * sh * scale), stringPaused);
    }

    GUI.Label(Rect(0, sh * scale * 0.5, sw * scale, sh * scale * 0.5), stringTapToResume);
}
