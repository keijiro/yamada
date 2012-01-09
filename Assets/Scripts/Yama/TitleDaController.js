#pragma strict

// タイトル画面の「田」の制御

function OnGameStart() {
    transform.parent = null;
    BroadcastMessage("InvokeEffect", "GameStart");
    yield WaitForSeconds(2.0);
    Destroy(gameObject);
}
