#pragma strict

var speed : float = 0.3;
var angle : float = 10.0;

private var vx : float;

function Start() {
    var sign = Random.value < 0.5 ? -1.0 : 1.0;
    vx = sign * speed;
    transform.localRotation = Quaternion.AngleAxis(angle * sign, Vector3.forward);
}

function Update() {
    transform.position.x += vx * Timekeeper.delta;
}
