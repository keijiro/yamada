#pragma strict

function OnGameStart() {
    // Breaks up.
    transform.parent = null;
    BroadcastMessage("InvokeEffect", "GameStart");
    // Wait and disappear.
    yield WaitForSeconds(2.0);
    Destroy(gameObject);
}
