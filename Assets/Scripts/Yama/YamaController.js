#pragma strict

// 「山」の操作系

var maxVelocity = 6.0;      // 最大横移動速度
var sensibility = 15.0;     // 操作の感度
var inputTrim = 0.6;        // 入力値（加速度）のトリム
var xRange = 1.5;           // 横移動幅

private var normalizedVelocity : float;     // 正規化された速度値
private var downFlag : boolean;

// 指数関数を使ったフレームレート非依存イーズアウト関数
static private function EaseOut(current : float, target : float, coeff : float) : float {
    return target - (target - current) * Mathf.Exp(coeff * Timekeeper.delta); 
}

// ゲーム開始メッセージの処理
function OnGameStart() {
    downFlag = true;
}

function Update() {
    // 傾きをトリムしつつ取得する。
#if UNITY_IPHONE
    var input = Input.acceleration.x;
#else
    var input = -Input.acceleration.y;
#endif
    input = Mathf.Clamp(input / inputTrim, -1.0, 1.0);
    // 傾き値をターゲットとして速度をイーズアウトで近づける。
    // 左右のリミットを越えた入力の場合は減速する。
    if (transform.localPosition.x < -xRange && input < 0.0) {
        normalizedVelocity = EaseOut(normalizedVelocity, 0.0, -20);
    } else if (transform.localPosition.x >  xRange && input > 0.0) {
        normalizedVelocity = EaseOut(normalizedVelocity, 0.0, -20);
    } else {
        normalizedVelocity = EaseOut(normalizedVelocity, input, -sensibility);
    }
    // 速度に応じて左右方向に移動する。
    transform.localPosition.x += normalizedVelocity * maxVelocity * Timekeeper.delta;
    // ゲーム開始後は画面下方向に移動する。
    if (downFlag) transform.localPosition.y = EaseOut(transform.localPosition.y, -2.0, -0.4);
    // 速度に応じて回転する（首を振る）。 
    transform.localRotation =
        Quaternion.AngleAxis(-13.0 * normalizedVelocity, Vector3.forward) *
        Quaternion.AngleAxis(-50.0 * normalizedVelocity, Vector3.up);
}
