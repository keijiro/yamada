#pragma strict

private var timer : float;

function OnGrinding(other : GameObject) {
    // Do nothing while paused.
    if (PauseHandler.paused) return;
    // Move itself at the midpoint.
    transform.position = (transform.parent.position + other.transform.position) * 0.5;

    if (timer <= 0.0) {
        // Emit particles.
        // And as a side effect, enabledEmission becomes true.
        particleSystem.Emit(2);
        // Sound FX.
        audio.Play();
        // Reset the timer.
        timer = Random.Range(0.04, 0.2);
        // Score.
        GameObject.FindWithTag("GameController").BroadcastMessage("AddScore", "Grinding");
    }
}

function Update() {
    if (timer > 0.0) {
        // To update even while paused, this doesn't use Timekeeper.
        timer -= Time.deltaTime;
        if (timer <= 0.0) {
            particleSystem.enableEmission = false;
        }
    }
}
