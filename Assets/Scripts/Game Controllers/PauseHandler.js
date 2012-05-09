#pragma strict

static var paused : boolean;

function OnGameStart() {
    enabled = true;
}

function OnGameEnd() {
    enabled = false;
}

function ResumeGame() {
    paused = false;
}

function OnApplicationPause(toPause : boolean) {
    // Pause the game when the application goes to the background.
    if (enabled && !paused && toPause) {
        SendMessage("PauseGame");
        paused = true;
    }
}

function Update () {
    // Pause the game if the screen is tapped.
    if (Input.GetMouseButtonDown(0)) {
        var sw = Screen.width;
        var sh = Screen.height;
        var rect = Rect(0.05 * sw, 0.05 * sh, 0.9 * sw, 0.9 * sh);
        if (rect.Contains(Input.mousePosition)) {
            SendMessage("PauseGame");
            paused = true;
        }
    }
}
