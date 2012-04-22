#pragma strict

function Start() {
    Social.localUser.Authenticate(function(result : boolean){});
    Application.LoadLevel(1);
}
