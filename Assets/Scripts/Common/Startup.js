#pragma strict

// 起動処理

function Start() {
    Social.localUser.Authenticate(function(result : boolean){});
    Application.LoadLevel(1);
}
