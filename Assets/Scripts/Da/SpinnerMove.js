#pragma strict

private var spin : float;
private var vspin : float;

function Start() {
    vspin = Random.Range(200.0, 400.0) * (Random.value < 0.5 ? 1.0 : -1.0);
}

function Update() {
    spin += vspin * Timekeeper.delta;
    transform.localRotation = Quaternion.AngleAxis(spin, Vector3.forward);
    transform.localScale = Vector3.one * (Mathf.Sin(spin / 30.0) * 0.27 + 1.0);
}
