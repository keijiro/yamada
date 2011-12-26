#pragma strict

// ポーズを発動するスクリプト

static var paused : boolean;

// ゲーム開始/終了メッセージの受信
function OnGameStart() {
    enabled = true;
}
function OnGameEnd() {
    enabled = false;
}

// ポーズ解除メッセージの受信
function ResumeGame() {
    paused = false;
}

function OnApplicationPause(pause : boolean) {
    // アプリケーションの動作がバックグラウンドに入った場合にポーズを発動する。
    if (!paused && pause) {
        SendMessage("PauseGame");
        paused = true;
    }
}

function Update () {
    // 画面中央付近をタップしたときにポーズを発動する。
    if (Input.GetButtonDown("Fire1")) {
        var sw = Screen.width;
        var sh = Screen.height;
        var rect = Rect(0.05 * sw, 0.05 * sh, 0.9 * sw, 0.9 * sh);
        if (rect.Contains(Input.mousePosition)) {
            SendMessage("PauseGame");
            paused = true;
        }
    }
}
