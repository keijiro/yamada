#pragma strict

private var scroll : ScrollController;

function Start() {
    scroll = FindObjectOfType(ScrollController) as ScrollController;
}

function Update() {
    transform.position.y -= scroll.GetSpeed() * Timekeeper.delta;
}
