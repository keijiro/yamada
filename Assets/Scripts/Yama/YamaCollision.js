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

// 拡大・縮小メッセージの処理
function Enlarge(scale : float) {
    Shrink(scale);
}
function Shrink(scale : float) {
    GetComponent.<SphereCollider>().radius = originalColliderRadius * scale;
}

function OnTriggerEnter(other : Collider) {
    if (other.gameObject.tag == "Yama") {
        // 山ゲット。
        GetComponent.<YamaStatus>().IncrementPower();
        // タグの書き換えによる再衝突防止。
        other.gameObject.tag = "Untagged";
        // スルー化を開始する。
        BroadcastMessage("OnEnableThru", true);
        thruFlag = true;
    } else if (other.gameObject.tag == "Da" && !thruFlag) {
        // 田に衝突。
        GetComponent.<YamaStatus>().DecrementPower();
        // タグの書き換えによる再衝突防止。
        other.gameObject.tag = "Untagged";
        // スルー化を開始する。
        BroadcastMessage("OnEnableThru", false);
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
        BroadcastMessage("OnDisableThru");
        thruFlag = false;
    }
}
