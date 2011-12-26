#pragma strict

// スクロール速度の制御

var normalSpeed : float = 4.0;      // 標準速度

private var speed : float;          // 現在の速度
private var targetSpeed : float;    // 目標移動速度

// スクロール速度の取得
function GetSpeed() : float{
    return speed;
}

// 山ステート変更メッセージの受信
function ChangeYamaState(level : int) {
    // スクロール速度を算出する。
    targetSpeed = normalSpeed * (1.0 + level * 0.2);
    // 最高レベルのときにエフェクトを有効化する。
    if (level == 3) {
        particleEmitter.worldVelocity.y = -targetSpeed;
        particleEmitter.emit = true;
    } else {
        particleEmitter.emit = false;
    }
}

function Start() {
    targetSpeed = normalSpeed;
}

function Update() {
    // 紙数関数補間で目標速度に近づける。
    speed = targetSpeed - (targetSpeed - speed) * Mathf.Exp(-4.0 * Timekeeper.delta); 
}
