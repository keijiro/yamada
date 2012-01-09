#pragma strict

var effectName : String;
var particleEmission : int;

function InvokeEffect(name : String) {
    if (name == effectName) {
        if (particleEmission > 0) {
            particleSystem.Emit(particleEmission);
        }
        if (audio) audio.Play();
    }
}
