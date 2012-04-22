#pragma strict

function Update() {
    if (transform.position.y < -5.0) {
        Destroy(gameObject);
    }
}
