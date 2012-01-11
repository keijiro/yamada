#pragma strict

// スクロール速度の制御

var normalSpeed : float = 4.0;          // 標準速度
var acceleration : float = 1.0 / 60;    // 加速度

private var speed : float;          // 現在の速度（加速度を考慮しない）
private var targetSpeed : float;    // 目標移動速度

// スクロール速度の取得
function GetSpeed() : float{
    return speed + acceleration * Timekeeper.elapsed;
}

// 山ステート変更メッセージの受信
function ChangeYamaState(level : int) {
    // スクロール速度を算出する。
    targetSpeed = normalSpeed * (1.0 + level * 0.2);
    // 最高レベルのときにエフェクトを有効化する。
    if (level == 3) {
        particleSystem.startSpeed = targetSpeed;
        particleSystem.enableEmission = true;
    } else {
        particleSystem.enableEmission = false;
    }
}

function Start() {
    targetSpeed = normalSpeed;
}

function Update() {
    // 指数関数補間で目標速度に近づける。
    speed = targetSpeed - (targetSpeed - speed) * Mathf.Exp(-4.0 * Timekeeper.delta); 
}
