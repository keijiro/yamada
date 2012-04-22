#pragma strict

static var delta : float;
static var elapsed : float;

private var paused : boolean;

function Awake() {
    Application.targetFrameRate = 60;
    elapsed = 0;
}

function PauseGame() {
    paused = true;
}

function ResumeGame() {
    paused = false;
}

function Update() {
    if (paused) {
        delta = 0;
    } else {
#if UNITY_IPHONE && !UNITY_EDITOR
        // iOS: Round deltaTime to a multiple of 1/60.
        delta = Mathf.Round(Time.deltaTime * 60) / 60;
#else
        delta = Time.smoothDeltaTime;
#endif
    }
    elapsed += delta;
}
