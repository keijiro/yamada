#pragma strict

// 時間の管理

static var delta : float;   // Update 増分
static var elapsed : float; // 開始からの経過時間

private var paused : boolean;

function Awake() {
    Application.targetFrameRate = 60;
    elapsed = 0;
}

// ポーズ操作
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
        // iOS: VSync 倍数に合わせる。
        delta = Mathf.Round(Time.deltaTime * 60) / 60;
#else
        delta = Time.smoothDeltaTime;
#endif
    }
    elapsed += delta;
}
