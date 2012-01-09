#pragma strict

// 画面外に出たら消す

function Update() {
    if (transform.position.y < -5.0) {
        Destroy(gameObject);
    }
}
