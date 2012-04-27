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
        score += 3;
    }
}

function Update() {
    score += Timekeeper.delta * (3.0 + 0.035 * Timekeeper.elapsed);
    display.SetValue(score);
}
