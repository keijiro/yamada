#pragma strict

// オブジェクトを生成するスクリプト

var prefabYama : GameObject;        // 山
var prefabDa : GameObject;          // 田

var minInterval : float = 0.65;     // 最小インターバル
var maxInterval : float = 1.5;      // 最大インターバル
var yamaRate : float = 0.14;        // 「山」を出す確率
var width : float = 2.0;            // 生成位置の幅
var levelUpRate : float = 0.006;    // 難易度向上の速度

private var scroller : ScrollController; // ScrollController への参照

private var leftToSpawn : float;    // 次の生成までの残りスクロール量
private var level : float;          // 難易度パラメーター

// ゲーム開始メッセージの処理
function OnGameStart() {
    enabled = true;
}

function Start() {
    scroller = FindObjectOfType(ScrollController);
}

function Update() {
    // レベルタイマー。
    level += scroller.GetSpeed() * Timekeeper.delta * levelUpRate;
    // 生成タイマー。
    leftToSpawn -= scroller.GetSpeed() * Timekeeper.delta;
    if (leftToSpawn < 0.0) {
        // 山か田か生成。
        if (Random.value < yamaRate * (1.0 - 0.07 * level)) {
            Instantiate(prefabYama, NewPosition(), Quaternion.identity);
        } else {
            CreateDa(NewPosition());
        }
        // 次の生成までの時間を算出。
        leftToSpawn = Mathf.Lerp(maxInterval, minInterval, level - Mathf.Floor(level) + 0.1 * level);
    }
}

// 「田」の生成
function CreateDa(position : Vector3) : GameObject {
    var da = Instantiate(prefabDa, position, Quaternion.AngleAxis(Random.Range(-30.0, 30.0), Vector3.up) * Quaternion.AngleAxis(Random.Range(-20.0, 20.0), Vector3.forward)) as GameObject;
    // 動きを決定（レベル4以降はランダムに分布）。
    var move = (level < 4.0) ? Mathf.FloorToInt(level) : Random.Range(0, 4);
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
