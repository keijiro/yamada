#pragma strict

var explosionPrefab : GameObject;

function OnTriggerEnter(other : Collider) {
    // Die after collision.
    if (other.gameObject.tag == "Da") {
        Instantiate(explosionPrefab, transform.position, transform.rotation);
        GameObject.FindWithTag("GameController").BroadcastMessage("OnGameEnd");
        Destroy(gameObject);
    }
}

function OnTriggerStay(other : Collider) {
    // Grinding FX.
    if (other.gameObject.tag == "Untagged") {
        BroadcastMessage("OnGrinding", other.gameObject);
    }
}
