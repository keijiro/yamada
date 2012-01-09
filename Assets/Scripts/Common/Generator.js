#pragma strict
#pragma downcast

// オブジェクトを生成するスクリプト

var prefabYama : GameObject;    // 山
var prefabDa : GameObject;      // 田

var width : float = 2.0;        // 生成位置の幅

// アニメーションで制御するパラメーター
@HideInInspector var interval : float;  // 生成インターバル
@HideInInspector var phase : float;     // 生成フェーズ（動きを決定する）
@HideInInspector var yamaRate : float;  // 「山」を出す確率

private var scroller : ScrollController;    // ScrollController への参照
private var leftToSpawn : float;            // 次の生成までの残りスクロール量

function Awake() {
    scroller = FindObjectOfType(ScrollController);
}

// ゲーム開始メッセージの処理
function OnGameStart() {
    enabled = true;
    animation.PlayQueued("GeneratorCurve1");
    animation.PlayQueued("GeneratorCurve2");
    animation.PlayQueued("GeneratorCurve3");
}

function Update() {
    // アニメーションの速度をスクロール速度と対応させる。
    for (var state : AnimationState in animation) {
        state.speed = scroller.GetSpeed();
    }
    // 生成タイマー。
    leftToSpawn -= scroller.GetSpeed() * Timekeeper.delta;
    if (leftToSpawn < 0.0) {
        // 山か田か生成。
        if (Random.value < yamaRate) {
            Instantiate(prefabYama, NewPosition(), Quaternion.identity);
        } else {
            CreateDa(NewPosition());
        }
        // 次の生成までの時間を設定。
        leftToSpawn = interval;
    }
}

// 「田」の生成
function CreateDa(position : Vector3) : GameObject {
    // ランダムな角度を生成する。
    var rotation =
        Quaternion.AngleAxis(Random.Range(-30.0, 30.0), Vector3.up) *
        Quaternion.AngleAxis(Random.Range(-20.0, 20.0), Vector3.forward);
    // 「田」をインスタンス化。
    var da = Instantiate(prefabDa, position, rotation) as GameObject;
    // フェーズから動きを決定。
    var move = (phase < 4.0) ? Mathf.FloorToInt(phase) : Random.Range(0, 4);
    // 決定した動きに対応するコンポーネントを有効にする。
    if (move == 1) {
        da.GetComponent.<VerticalMove>().enabled = true;
    } else if (move == 2) {
        da.GetComponent.<HorizontalMove>().enabled = true;
    } else if (move == 3) {
        da.GetComponent.<SpinnerMove>().enabled = true;
    }
    return da;
}

// 生成位置の算出
function NewPosition() : Vector3 {
    return transform.position + Vector3.right * Random.Range(-width, width);
}
