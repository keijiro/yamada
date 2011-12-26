#pragma strict

// スコアの保持

var skin : GUISkin;                 // 表示に使うスキン
var scoreUpSpeed : float = 2000.0;  // 表示スコアの上昇速度

private var level : int;            // 現状の山ステート
private var score : int;            // 実スコア
private var displayScore : float;   // 表示上のスコア

// 得点の取得
function GetScore() : int {
    return score;
}

// ゲーム開始メッセージの処理
function OnGameStart() {
    enabled = true;
}

// 山ステート変更メッセージの受信
function ChangeYamaState(level : int) {
    this.level = level;
}

// 得点メッセージの処理
function AddScore(kind : String) {
    if (kind == "Grinding") {
        score += (level == 0) ? 1291 : 151;
    } else if (kind == "Yama") {
        score += 3000;
    } else if (kind == "Bonus") {
        score += 9513;
    }
    // 上昇アニメーションを最長 0.5 秒に制限する。
    displayScore = Mathf.Max(displayScore, score - 0.5 * scoreUpSpeed);
}

function Update() {
    if (displayScore < score) {
        displayScore = Mathf.Min(displayScore + Timekeeper.delta * scoreUpSpeed, score);
    }
}

/* 
function OnGUI() {
    GUI.skin = skin;
    GUI.Label(Rect(0, 0, Screen.width, 30), Mathf.RoundToInt(displayScore).ToString("#,##0"), "score");
}
*/
