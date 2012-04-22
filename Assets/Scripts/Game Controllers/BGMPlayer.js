#pragma strict

var volume = 0.75;
var fadeSpeed = 1.2;

private var sources : AudioSource[];
private var mixMode = 0;
private var terminated = false;

function OnGameStart() {
    for (var source in sources) source.Play();
}

function OnGameEnd() {
    terminated = true;
}

function SetMixMode(mode : int) {
    mixMode = mode;
}

function Start() {
    sources = GetComponents.<AudioSource>();

    for (var source in sources) {
        source.volume = 0.0;
    }
}

function Update() {
    var delta = fadeSpeed * Timekeeper.delta;

    for (var i = 0; i < sources.Length; ++i) {
        if (i <= mixMode && !terminated) {
            sources[i].volume = Mathf.Min(sources[i].volume + delta, volume);
        } else {
            sources[i].volume = Mathf.Max(sources[i].volume - delta, 0.0);
        }
    }
}
