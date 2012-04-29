#pragma strict

var scoreGrinding = 2.0;
var scorePerSecond = 3.0;
var spsAdd = 0.05;

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
        score += scoreGrinding;
    }
}

function Update() {
    score += Timekeeper.delta * (scorePerSecond + spsAdd * Timekeeper.elapsed);
    display.SetValue(score);
}
