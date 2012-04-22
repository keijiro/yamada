#pragma strict

var normalSpeed : float = 4.0;
var acceleration : float = 1.0 / 60;

function GetSpeed() : float{
    return normalSpeed + acceleration * Timekeeper.elapsed;
}

function EnableSpeedEffects() {
    particleSystem.enableEmission = true;
}
