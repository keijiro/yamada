#pragma strict

@script RequireComponent(YamaStatus)

// 「山」のコリジョン判定

var timeToReenter : float;                  // 無敵時間

private var originalColliderRadius : float; // 元のコリジョン半径
private var lastCollisionTime : float;      // 最近発生したコリジョンの時間

function Awake() {
    // 設定されているコリジョン半径を保存する。
    originalColliderRadius = GetComponent.<SphereCollider>().radius;
}

function OnTriggerEnter(other : Collider) {
    if (other.gameObject.tag == "Yama") {
        // 山ゲット。
        var newScale = GetComponent.<YamaStatus>().IncrementPowerAndGetScale();
        // コリジョンのスケール変更
        GetComponent.<SphereCollider>().radius = originalColliderRadius * newScale;
        // タグの書き換えによる再衝突防止。
        other.gameObject.tag = "Untagged";
        // 無敵期間を開始する。
        lastCollisionTime = Time.time;
    } else if (other.gameObject.tag == "Da" && Time.time > lastCollisionTime + timeToReenter) {
        // 田に衝突。
        newScale = GetComponent.<YamaStatus>().DecrementPowerAndGetScale();
        // コリジョンのスケール変更
        GetComponent.<SphereCollider>().radius = originalColliderRadius * newScale;
        // タグの書き換えによる再衝突防止。
        other.gameObject.tag = "Untagged";
        // 無敵期間を開始する。
        lastCollisionTime = Time.time;
    }
}

function OnTriggerStay(other : Collider) {
    // グラインディング処理。
    if (other.gameObject.tag == "Untagged") {
        BroadcastMessage("OnGrinding", other.gameObject);
    }
}
