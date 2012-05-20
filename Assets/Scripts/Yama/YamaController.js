#pragma strict

var maxVelocity = 6.0;
var sensibility = 15.0;
var inputTrim = 0.4;
var xRange = 1.5;
var xLimit = 1.85;

private var normalizedVelocity : float;
private var gameStarted : boolean;

// Exponential easing-out function.
static private function EaseOut(current : float, target : float, coeff : float) : float {
    return target - (target - current) * Mathf.Exp(coeff * Timekeeper.delta); 
}

function OnGameStart() {
    gameStarted = true;
}

function Update() {
    // Get an input and trim it.
#if UNITY_IPHONE
    var input = Input.acceleration.x;
#else
    var input = -Input.acceleration.y;
#endif
    input = Mathf.Clamp(input / inputTrim, -1.0, 1.0);
    // Update the velocity toward the input value.
    if (transform.localPosition.x < -xRange && input < 0.0) {
        normalizedVelocity = EaseOut(normalizedVelocity, 0.0, -20);
    } else if (transform.localPosition.x >  xRange && input > 0.0) {
        normalizedVelocity = EaseOut(normalizedVelocity, 0.0, -20);
    } else {
        normalizedVelocity = EaseOut(normalizedVelocity, input, -sensibility);
    }
    // Update the position with the velocity.
    var x = transform.localPosition.x + normalizedVelocity * maxVelocity * Timekeeper.delta;
    transform.localPosition.x = Mathf.Clamp(x, -xLimit, xLimit);
    // Going down to the bottom of the screen while playing the game.
    if (gameStarted) transform.localPosition.y = EaseOut(transform.localPosition.y, -2.0, -0.4);
    // Yaw the body with the velocity.
    transform.localRotation =
        Quaternion.AngleAxis(-13.0 * normalizedVelocity, Vector3.forward) *
        Quaternion.AngleAxis(-50.0 * normalizedVelocity, Vector3.up);
}
