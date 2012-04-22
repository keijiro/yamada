#pragma strict

// スコアの保持

private var level : int;    // 現状の山ステート
private var score : float;  // 実スコア

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
}

function Update() {
    score += Timekeeper.delta * (50.0 + 0.25 * Timekeeper.elapsed);
}
