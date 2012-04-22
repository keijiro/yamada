#pragma strict

// タイトル画面の制御

var skin : GUISkin;
var bgTexture : Texture2D;

private var alpha = 1.0;

function Start() {
    // フォントのフィルターモードをポイントサンプリングに変更。
    // ここで処理するのは違うような気がするが、現状の Unity の仕様では
    // 最初に GUI を使用する直前に行うしかない……
    skin.font.material.mainTexture.filterMode = FilterMode.Point;
}

function Update() {
    alpha = Mathf.Max(alpha - Timekeeper.delta * 4.0, 0.0);

    if (Input.GetButtonUp("Fire1")) {
        // ゲーム開始メッセージの送信。　
        GameObject.FindWithTag("Player").BroadcastMessage("OnGameStart");
        GameObject.FindWithTag("GameController").BroadcastMessage("OnGameStart");
        // 自分自身を破棄。
        Destroy(gameObject);
    }
}

function OnGUI() {
    var sw = Screen.width;
    var sh = Screen.height;
    var scale = Config.GetUIScale();
    // "Tap to start" を点滅表示する。
    GUI.skin = skin;
    GUIUtility.ScaleAroundPivot(Vector2(1.0 / scale, 1.0 / scale), Vector2(0, 0));
    GUI.Label(Rect(0, sh * scale * 0.5, sw * scale, sh * scale * 0.5), "やまだゲーム\n\n\nタップしてスタート");
    // フェードイン用の黒塗り。
    if (alpha > 0.0) {
        GUI.color = Color(1, 1, 1, alpha);
        GUI.DrawTexture(Rect(0, 0, sw, sh), bgTexture);
    }
}
