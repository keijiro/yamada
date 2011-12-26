#pragma strict

// 動き制御：左右への動き

var speed : float = 0.3;    // 左右への移動速度
var angle : float = 10.0;   // 傾き角度

private var vx : float;     // 実際の速度値

function Start() {
    var sign = Random.value < 0.5 ? -1.0 : 1.0;
    vx = sign * speed;
    transform.localRotation = Quaternion.AngleAxis(angle * sign, Vector3.forward);
}

function Update() {
    transform.position.x += vx * Timekeeper.delta;
}
