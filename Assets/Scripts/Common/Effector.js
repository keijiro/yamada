#pragma strict

var effectName : String;
var particleEmission : int;
var animationName : String;

function InvokeEffect(name : String) {
    if (name == effectName) {
        if (particleEmission > 0) {
            particleSystem.Emit(particleEmission);
        }
        if (animationName) {
            animation.Play(animationName);
        }
        if (audio) audio.Play();
    }
}
