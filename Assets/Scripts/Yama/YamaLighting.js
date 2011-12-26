#pragma strict

// 山に付加された点光源の制御

private var offset : Vector3;   // 配置オフセット
private var intensity : float;  // 光源の強さ
private var thruFlag : boolean; // スルー化状態

function Start() {
    offset = transform.localPosition;
}

// スルー化の切り替えメッセージ
function OnEnableThru(positive : boolean) {
    intensity = 1.0;
    thruFlag = true;
    // 初期位置に再配置。
    transform.localPosition = offset;
    // 光源色を変更。
    light.color = positive ? Color.yellow : Color(1, 0.75, 0);
}
function OnDisableThru() {
    thruFlag = false;
}

// グラインディングメッセージ
function OnGrinding(other : GameObject) {
    if (!thruFlag) {
        intensity = 1.0;
        // 中間地点に自分自身を再配置する。
        transform.position = (transform.parent.position + other.transform.position) * 0.5 + offset;
        // 光源を赤色に設定。
        light.color = Color.red;
    }
}

function Update() {
    if (intensity > 0.0) {
        // 光量の減衰（スルー化中は減衰しない）。
        if (!thruFlag) {
            intensity = Mathf.Max(intensity - Timekeeper.delta * 1.6, 0.0);
        }
        if (intensity == 0.0) {
            // ライティングの終了。
            light.enabled = false;
        } else {
            // ライティングの設定。
            light.enabled = true;
            light.intensity = intensity * 3;
        }
    }
}
