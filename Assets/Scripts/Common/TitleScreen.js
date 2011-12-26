#pragma strict

// タイトル画面の制御

var skin : GUISkin;

function Start() {
    // フォントのフィルターモードをポイントサンプリングに変更。
    // ここで処理するのは違うような気がするが、現状の Unity の仕様では
    // 最初に GUI を使用する直前に行うしかない……
    skin.font.material.mainTexture.filterMode = FilterMode.Point;
}

function Update() {
    if (Input.GetButtonUp("Fire1")) {
        // ゲーム開始メッセージの送信。　
        GameObject.FindWithTag("Player").BroadcastMessage("OnGameStart");
        GameObject.FindWithTag("GameController").BroadcastMessage("OnGameStart");
        // 自分自身を破棄。
        Destroy(gameObject);
    }
}

function OnGUI() {
    // "Tap to start" を点滅表示する。
    var sw = Screen.width;
    var sh = Screen.height;
    var scale = Config.GetUIScale();
    GUI.skin = skin;
    GUIUtility.ScaleAroundPivot(Vector2(1.0 / scale, 1.0 / scale), Vector2(0, 0));
    GUI.Label(Rect(0, sh * scale * 0.5, sw * scale, sh * scale * 0.5), "やまだゲーム\n\n\nタップしてスタート");
}
