#pragma strict

// 「山」の見た目のアニメーション

var energy : float = 0.5;               // 演出の長さ

private var targetScale : float = 1.0;  // スケールの目標値
private var timer : float;              // 演出用タイマー
private var enlarge : boolean;          // 拡大モードフラグ

// 拡大・縮小メッセージの処理
function Enlarge(scale : float) {
    targetScale = scale;
    timer = energy;
    enlarge = true;
}
function Shrink(scale : float) {
    targetScale = scale;
    timer = energy;
    enlarge = false;
}
function Bonused() {
    timer = energy;
    enlarge = true;
}

function Update() {
    if (PauseHandler.paused) {
        // ポーズ中は処理しない。
    } else if (timer > 0.0) {
        timer = Mathf.Max(timer - Timekeeper.delta, 0.0);
        if (enlarge) {
            transform.localPosition = Vector3.zero;
            // スケールを振動させるアニメーション。
            var vib = 1.0 + 0.5 * timer * Mathf.Cos(30.0 * (energy - timer));
            transform.localScale = Vector3.one * (targetScale * vib);
        } else {
            transform.localScale = Vector3.one * targetScale;
            // 位置を振動させるアニメーション。
            var radius = timer * 0.8 * targetScale;
            transform.localPosition.x = Mathf.Sin(100.0 * Time.time) * radius;
            transform.localPosition.y = Mathf.Sin(133.3 * Time.time) * radius * 0.5;
        }
    } else {
        transform.localScale = Vector3.one * targetScale;
        transform.localPosition = Vector3.zero;
    }
}
