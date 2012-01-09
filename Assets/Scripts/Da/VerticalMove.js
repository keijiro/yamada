#pragma strict

// 動き制御：縦方向の動き

private var maxSpeed : float = 3.0;

private var speed : float;

function Start() {
    speed = Random.Range(0.0, maxSpeed);
}

function Update() {
    transform.position.y -= speed * Timekeeper.delta;
}
