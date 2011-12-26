#pragma strict

// ポーズ画面の制御

var skin : GUISkin;
var black : Texture2D;

// ポーズ発動メッセージの受信
function PauseGame() {
    enabled = true;
}

function Update() {
    if (Input.GetButtonDown("Fire1")) {
        // ポーズ解除操作
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
        GUI.Label(Rect(0, 0, sw * scale, sh * scale), "PAUSED");
    }

    GUI.Label(Rect(0, sh * scale * 0.5, sw * scale, sh * scale * 0.5), "TAP TO RESUME");
}
