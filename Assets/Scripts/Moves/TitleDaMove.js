#pragma strict

// タイトル画面の「田」の動き

private var velocity : Vector3;
private var spin : float;

// ゲーム開始メッセージの処理
function OnGameStart() {
    // 処理を開始する。
    enabled = true;
    // 親から切り離す。
    transform.parent = null;
    // 初速の決定。
    velocity.x = Random.Range(-1.0, 1.0);
    spin = Random.Range(-90.0, 90.0);
    // 効果音を鳴らす。
    audio.Play();
    // 切り離しエフェクト（子に付いている）を発動する。
    for (var child : Transform in transform) {
        child.particleEmitter.emit = true;
    }
}

function Update() {
    // 下方向への加速。
    velocity.y -= 5.0 * Timekeeper.delta;
    // 移動・回転。
    transform.localPosition += velocity * Timekeeper.delta;
    transform.localRotation *= Quaternion.AngleAxis(spin * Timekeeper.delta, Vector3.forward);
    transform.localRotation *= Quaternion.AngleAxis(spin * Timekeeper.delta * 0.5, Vector3.up);
}
