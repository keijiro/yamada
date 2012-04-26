#pragma strict
#pragma downcast

var prefabDa : GameObject;

var width : float = 2.0;

// Variables driven by the animations.
@HideInInspector var interval : float;
@HideInInspector var phase : float;

private var scroller : ScrollController;
private var bgmPlayer : BGMPlayer;

private var leftToSpawn : float;

function Awake() {
    scroller = FindObjectOfType(ScrollController);
    bgmPlayer = FindObjectOfType(BGMPlayer);
}

function OnGameStart() {
    enabled = true;
    animation.PlayQueued("GeneratorCurve1");
    animation.PlayQueued("GeneratorCurve2");
}

function Update() {
    // Synchronize the animations and the scroll controller.
    for (var state : AnimationState in animation) {
        state.speed = scroller.GetSpeed();
    }
    // Synchronize the BGM with the generation phase.
    bgmPlayer.SetMixMode(phase);
    // Spawn DAs on the intervals (which controlled with the animations).
    leftToSpawn -= scroller.GetSpeed() * Timekeeper.delta;
    if (leftToSpawn < 0.0) {
        SpawnDa();
        leftToSpawn = interval;
    }
}

function SpawnDa() : GameObject {
    var position = transform.position + Vector3.right * Random.Range(-width, width);

    var rotation =
        Quaternion.AngleAxis(Random.Range(-30.0, 30.0), Vector3.up) *
        Quaternion.AngleAxis(Random.Range(-20.0, 20.0), Vector3.forward);

    var da = Instantiate(prefabDa, position, rotation) as GameObject;
    
    var move = (phase < 4.0) ? Mathf.FloorToInt(phase) : Random.Range(0, 4);

    if (move == 1) {
        da.GetComponent.<VerticalMove>().enabled = true;
    } else if (move == 2) {
        da.GetComponent.<HorizontalMove>().enabled = true;
    } else if (move == 3) {
        da.GetComponent.<SpinnerMove>().enabled = true;
    }

    return da;
}
