#pragma strict

@script RequireComponent(YamaStatus)

// 「山」のコリジョン判定

private var originalColliderRadius : float; // 元のコリジョン半径
private var collCounter : int;              // 現在の接触 collider 数
private var thruFlag : boolean;             // スルー化フラグ

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
        // スルー化を開始する。
        thruFlag = true;
    } else if (other.gameObject.tag == "Da" && !thruFlag) {
        // 田に衝突。
        newScale = GetComponent.<YamaStatus>().DecrementPowerAndGetScale();
        // コリジョンのスケール変更
        GetComponent.<SphereCollider>().radius = originalColliderRadius * newScale;
        // タグの書き換えによる再衝突防止。
        other.gameObject.tag = "Untagged";
        // スルー化を開始する。
        thruFlag = true;
    }
    collCounter++;
}

function OnTriggerStay(other : Collider) {
    // グラインディング処理。
    if (other.gameObject.tag == "Untagged") {
        BroadcastMessage("OnGrinding", other.gameObject);
    }
}

function OnTriggerExit(other : Collider) {
    // 何も触れていない状態になったとき、スルー化を終了する。
    if (--collCounter == 0) {
        thruFlag = false;
    }
}
