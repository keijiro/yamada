#pragma strict

var quadMesh : Mesh;

private var meshes : Mesh[];
private var numbers : MeshFilter[];

function Awake() {
    meshes = new Mesh[11];
    
    for (var i = 0; i < meshes.Length; i++) {
        var mesh = Instantiate(quadMesh);
        
        var uv = mesh.uv;
        
        for (var j = 0; j < 4; j++) {
            uv[j].x += i % 4;
            uv[j].y -= i / 4;
        }
        
        mesh.uv = uv;
        
        meshes[i] = mesh;
    }
    
    numbers = new MeshFilter[8];
    for (i = 0; i < numbers.Length; i++) {
        numbers[i] = transform.Find(i.ToString()).GetComponent.<MeshFilter>();
    }
}

function Start() {
    SetValue(0);
}

function SetValue(value : int) {
    if (value == 0) {
        numbers[0].mesh = meshes[0];
        for (var i = 1; i < numbers.Length; i++) {
            numbers[i].mesh = null;
        }
        return;
    }

    for (i = 0; i < numbers.Length; i++) {
        if (value == 0) break;
        if (i % 4 == 3) {
            // comma
            numbers[i].mesh = meshes[10];
        } else {
            numbers[i].mesh = meshes[value % 10];
            value /= 10;
        }
    }

    for (; i < numbers.Length; i++) {
        numbers[i].mesh = null;
    }
}
