#pragma strict

private var score : float;
private var display : ScoreDisplay;

function Awake() {
    display = FindObjectOfType(ScoreDisplay);
}

function OnGameStart() {
    enabled = true;
}

function OnGameEnd() {
    enabled = false;
}

function GetScore() : int {
    return score;
}
function AddScore(kind : String) {
    if (kind == "Grinding") {
        score += 5;
    }
}

function Update() {
    score += Timekeeper.delta * (3.0 + 0.1 * Timekeeper.elapsed);
    display.SetValue(score);
}
