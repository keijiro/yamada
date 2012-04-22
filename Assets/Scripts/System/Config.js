#pragma strict

static function GetUIScale() : float {
    if (Screen.width > 580) {
        return 1.0 / 6;
    } else if (Screen.width > 480) {
        return 1.0 / 4;
    } else {
        return 1.0 / 3;
    }
}

