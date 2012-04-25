#pragma strict

var normalSpeed : float = 3.6;
var acceleration : float = 0.01;

function GetSpeed() : float {
    return normalSpeed + acceleration * Timekeeper.elapsed;
}

function Update() {
    var speed = GetSpeed();
    if (speed > 4.0) {
        particleSystem.enableEmission = true;
        particleSystem.startSpeed = speed;
        particleSystem.emissionRate = Mathf.Min((speed - 4.0) * 20.0, 25.0);
    }
}
