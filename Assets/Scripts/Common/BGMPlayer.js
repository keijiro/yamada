#pragma strict

// コンテキスト連動 BGM 制御

var volume : float = 0.75;      // 基本ボリューム値
var fadeSpeed : float = 1.2;    // ボリュームのフェード速度

private var sources : AudioSource[];    // 同オブジェクト内にあるオーディオソース群への参照 
private var mixMode : int = 1;          // 現在のミックスモード

// ゲーム開始メッセージの受信
function OnGameStart() {
    for (var source in sources) source.enabled = true;
}

// ゲーム終了メッセージの受信
function OnGameEnd() {
    mixMode = -1;
}

// 山ステート変更メッセージの受信
function ChangeYamaState(level : int) {
    mixMode = level;
}

function Start() {
    sources = GetComponents.<AudioSource>();
    // とりあえず全トラックをミュートする。
    for (var source in sources) source.volume = 0.0;
}

function Update() {
    // 各トラックをミックスモードに合わせてフェードする。
    var delta = fadeSpeed * Timekeeper.delta;
    for (var i = 0; i < sources.Length; ++i) {
        if (i <= mixMode) {
            sources[i].volume = Mathf.Min(sources[i].volume + delta, volume);
        } else {
            sources[i].volume = Mathf.Max(sources[i].volume - delta, 0.0);
        }
    }
}
