#pragma strict

// グラインディングの処理

private var timer : float;

function OnGrinding(other : GameObject) {
    // ポーズ中は処理しない。
    if (PauseHandler.paused) return;
    // 中間地点に自分自身を再配置する。
    transform.position = (transform.parent.position + other.transform.position) * 0.5;
    // 以下はタイマー切れした瞬間のみ行う処理。
    if (timer <= 0.0) {
        // 得点。
        GameObject.FindWithTag("GameController").BroadcastMessage("AddScore", "Grinding");
        // 効果音。
        audio.Play();
        // 音と同時に火花を出す。副作用で enableEmission が true になる。
        particleSystem.Emit(2);
        // 次のタイミングをランダムに決める。
        timer = Random.Range(0.04, 0.2);
    }
}

function Update() {
    // タイマー処理。連動してエフェクトを切る。
    if (timer > 0.0) {
        // ここでは敢えて Timekeeper を使わない。
        // ポーズ中もタイムアウトさせたいため。
        timer -= Time.deltaTime;
        if (timer <= 0.0) {
            particleSystem.enableEmission = false;
        }
    }
}
