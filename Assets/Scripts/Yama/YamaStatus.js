#pragma strict

// 「山」のステータス管理

var explosionPrefab : GameObject;

private var power = 1;                  // 現状の山パワー
private var targetScale : float = 1.0;  // スケールのターゲット値

// パワー増加
function IncrementPower() {
    if (power == 3) {
        // フルパワーボーナス。
        BroadcastMessage("Bonused");
        BroadcastMessage("InvokeEffect", "Bonus");
        GameObject.FindWithTag("GameController").BroadcastMessage("AddScore", "Bonus");
    } else {
        AddSubPower(1);
    }
}

// パワー減少
function DecrementPower() {
    if (power == 0) {
        // 死亡処理。
        Instantiate(explosionPrefab, transform.position, transform.rotation);
        GameObject.FindWithTag("GameController").BroadcastMessage("OnGameEnd");
        Destroy(gameObject);
    } else {
        AddSubPower(-1);
    }
}

private function AddSubPower(delta : int) {
    power = Mathf.Clamp(power + delta, 0, 3);
    // スケールに反映する。
    targetScale = 1.0 + (power - 1) * 0.3;
    BroadcastMessage(delta > 0 ? "Enlarge" : "Shrink", targetScale);
    BroadcastMessage("InvokeEffect", delta > 0 ? "PowerUp" : "PowerDown");
    // Game controller に伝える。
    var gameController = GameObject.FindWithTag("GameController");
    gameController.BroadcastMessage("ChangeYamaState", power);
    if (delta > 0) gameController.BroadcastMessage("AddScore", "Yama");
}
