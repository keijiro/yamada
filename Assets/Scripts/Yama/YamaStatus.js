#pragma strict

// 「山」のステータス管理

var explosionPrefab : GameObject;       // 死亡時のエフェクト

private var scaler : Transform;         // 表示スケール操作用のトランスフォーム

private var power = 1;                  // 現状の山パワー
private var targetScale : float = 1.0;  // スケールのターゲット値

function Awake() {
    scaler = transform.Find("Scaler");
}

// パワー増加
function IncrementPowerAndGetScale() : float {
    if (power == 3) {
        // フルパワーボーナス。
        BroadcastMessage("InvokeEffect", "Bonus");
        GameObject.FindWithTag("GameController").BroadcastMessage("AddScore", "Bonus");
    } else {
        AddSubPower(1);
    }
    return targetScale;
}

// パワー減少
function DecrementPowerAndGetScale() : float {
    if (power == 0) {
        // 死亡処理。
        Instantiate(explosionPrefab, transform.position, transform.rotation);
        GameObject.FindWithTag("GameController").BroadcastMessage("OnGameEnd");
        Destroy(gameObject);
    } else {
        AddSubPower(-1);
    }
    return targetScale;
}

private function AddSubPower(delta : int) {
    power = Mathf.Clamp(power + delta, 0, 3);
    // エフェクトを発動する。
    BroadcastMessage("InvokeEffect", delta > 0 ? "PowerUp" : "PowerDown");
    // スケールに反映する。
    targetScale = 1.0 + (power - 1) * 0.3;
    scaler.localScale = Vector3.one * targetScale;
    // Game controller に伝える。
    var gameController = GameObject.FindWithTag("GameController");
    gameController.BroadcastMessage("ChangeYamaState", power);
    if (delta > 0) gameController.BroadcastMessage("AddScore", "Yama");
}
