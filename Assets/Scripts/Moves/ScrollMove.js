#pragma strict

// 動き制御：スクロールの適用

private var scroll : ScrollController;

function Start() {
    scroll = FindObjectOfType(ScrollController) as ScrollController;
}

function Update() {
    transform.position.y -= scroll.GetSpeed() * Timekeeper.delta;
}
