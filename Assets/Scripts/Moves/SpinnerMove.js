#pragma strict

// 動き制御：スピン攻撃

private var spin : float;   // 現在の回転角
private var vspin : float;  // 回転速度

function Start() {
    vspin = Random.Range(200.0, 400.0) * (Random.value < 0.5 ? 1.0 : -1.0);
}

function Update() {
    spin += vspin * Timekeeper.delta;
    // 回転角の適用。
    transform.localRotation = Quaternion.AngleAxis(spin, Vector3.forward);
    // 拡大・縮小アニメーション。
    transform.localScale = Vector3.one * (Mathf.Sin(spin / 30.0) * 0.27 + 1.0);
}
