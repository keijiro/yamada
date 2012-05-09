#pragma strict

var skin : GUISkin;
var bgTexture : Texture2D;

private var param : float;
private var screenText : String;
private var shareText : String;

function InitializeTexts() {
    var score = (FindObjectOfType(Scorekeeper) as Scorekeeper).GetScore();
    // Make text.
    if (Application.systemLanguage == SystemLanguage.Japanese) {
        screenText =
            "ゲームオーバー\n\n\n" +
            score.ToString("#,##0") + " てん\n\n\n" +
            GetRankName(rankNamesJapanese, score);
        shareText =
            "#YamadaGame 評価「" + GetRankName(rankNamesJapanese, score) + "」";
    } else {
        screenText =
            "GAME OVER\n\n\n" +
            "SCORE: " + score.ToString("#,##0") + "\n\n\n\n" +
            "RANK\n\n" + GetRankName(rankNamesEnglish, score);
        shareText =
            "#YamadaGame Rank:'" + GetRankName(rankNamesEnglish, score) + "'";
    }
    // Update the high score and send it to the leaderboard.
    var highScore = PlayerPrefs.GetInt("highScore", 0);
    if (score > highScore) {
        highScore = score;
        PlayerPrefs.SetInt("highScore", score);
    }
    Social.ReportScore(highScore, "jp.radiumsoftware.yamada.leaderboard.normalscore", function(result : boolean){});
}

function OnGameEnd() {
    enabled = true;

    yield WaitForSeconds(1.0);

    InitializeTexts();

    while (param < 1.0) {
        param = Mathf.Min(param + Timekeeper.delta * 6.0, 1.0);
        yield;
    }

    while (!Input.GetMouseButtonDown(0) || Input.mousePosition.y < 0.15 * Screen.height) yield;

    while (param < 2.0) {
        param = Mathf.Min(param + Timekeeper.delta * 6.0, 2.0);
        yield;
    }

    Application.LoadLevel(1);
}

function OnGUI() {
    if (param == 0.0) return;
    
    var sw = Screen.width;
    var sh = Screen.height;
    var scale = Config.GetUIScale();
    // Black overlay.
    GUI.color = Color(1, 1, 1, Mathf.Min(param * 0.75, 1.0));
    GUI.DrawTexture(Rect(0, 0, sw, sh), bgTexture);

    GUI.skin = skin;
    GUI.color = Color(1, 1, 1, param > 1.0 ? 2.0 - param : param);
    // Tweet button.
    if (TwitterPlugin.IsAvailable()) {
        if (GUI.Button(Rect(0.45 * sw, 0.9 * sh, 0.1 * sw, 0.1 * sw), "", "tweet")) {
            TwitterPlugin.ComposeTweetWithScreenshot(shareText, "http://keijiro.github.com/yamada");
        }
    }
    // Text display.
    GUIUtility.ScaleAroundPivot(Vector2(1.0 / scale, 1.0 / scale), Vector2.zero);
    GUI.Label(Rect(0, sh * scale * 0.1, sw * scale, sh * scale * 0.8), screenText);
}

private static function GetRankName(rankNameArray : String[], score : float) : String {
    var minimum = 40.0;
    var maximum = 10000.0;
    var rank : int =  Mathf.Sqrt(score - minimum) / Mathf.Sqrt(maximum - minimum) * rankNameArray.Length;
    return rankNameArray[Mathf.Clamp(rank, 0, rankNameArray.Length - 1)];
}

private static var rankNamesJapanese : String[] = [
    "やまだ? じょうだんでしょ?",
    "まったく やまだ ではない",
    "やまだと なのるには およばず",
    "やまだのことは あきらめろ",
    "やまだと なのる など おこがましい",
    "わかものの しんこくな やまだ ばなれ",
    "どうにも やまだって かんじ ではない",
    "やまだ？ あきらめたほうが いいとおもうなあ...",
    "やれやれ やまだも ここまで おちたか...",
    "やまだに なるには さいのうが たりない",
    "やまだの なにかが ちめいてきに たりない",
    "あんた ほんとに やまだ?",
    "ニワカな やまだ ファン",
    "やまだというより たなか",
    "むかし やまだの パシリだった",
    "やまだファンクラブ かいいん",
    "しょうらいの ゆめは やまだ",
    "きみに やまだの なにが わかる",
    "やまだの ともだちに いそうなタイプ",
    "そんなに やまだに なりたいか...?",
    "やまだっつってもなー いろいろあるでしょ?",
    "やまだと よばれたことも かつてあった",
    "やまだに なかなか おぼえて もらえない",
    "フフフ... やまだの すごさが わかってきた ようだな",
    "あこがれ だけじゃ やまだに なれない",
    "やまだに なったら もっとたいへん だぞ",
    "ニックネームは やまだ",
    "らいねん こそは やまだを めざす",
    "やまだなら もうちょっと なんとかなるだろう",
    "おーい やまだー! いや おまえじゃねえよ!",
    "どちらかと いえば やまだかも しれないが...",
    "つうしんこうざで やまだを めざしたクチ",
    "やまだで ごはん3ばいは いける",
    "やまだを ゆめみる としごろ",
    "かなり やまだに ちかづいた",
    "やまだに なるには まだはやい",
    "おまえの やまだは そんなものか",
    "やまだと なのっていた ことも あった",
    "フフフ... そのていど では やまだには なれんよ",
    "やまだの ことを しんじている",
    "やまだの すごさを しるがよい",
    "がんばれば やまだに なれると しんじている",
    "このまえ やまだと まちがえられた",
    "やまだの きんじょに すんでいる",
    "やまだの ものまねが うまい",
    "やまだの ライバル",
    "やまだの うわさを いろいろ しっている",
    "いっぽうてきに やまだを しっている",
    "やまだに かたおもい",
    "たいていの ことは やまだが かいけつ",
    "かんがえるな (やまだを) かんじろ",
    "わたしと やまだ どっちを えらぶの...?",
    "やまだに きいたぜ おまえのこと...",
    "かおつきは やまだっぽいな",
    "こえの かんじが やまだっぽい",
    "ほどばしる やまだ",
    "ねても さめても やまだ",
    "あらぶる やまだ だましい",
    "こんやが やまだ",
    "あといっぽで やまだ",
    "やーまっだ! やーまっだ!",
    "やまだパンチ! やまだキック!",
    "やまだ, それは すべて...",
    "やまだ みならい",
    "かけだしの やまだ",
    "やまだとしては まだまだみじゅく",
    "ごく ありふれた やまだ",
    "クラスに よくいる やまだ",
    "やまだとして どりょくが ひつよう",
    "やまだとしては レベルひくいほう",
    "やまだのことが わかってきた ような きがする",
    "やまだとして がんばっている",
    "やまだとして みとめられた",
    "あんた かなりの やまだ だな",
    "せんご さいだいの やまだ",
    "どこからみても やまだ",
    "こんせいき さいだいの やまだ",
    "やまだを こえた やまだ",
    "やまだとして きわまった",
    "さいきょうの やまだ",
    "やまだの なかの やまだ"
];

private static var rankNamesEnglish : String[] = [
    "NOT YAMADA",
    "PRE-YAMADA",
    "WORTHLESS YAMADA",
    "SINGLE-CELLED YAMADA",
    "YAMADA THE FOOL",
    "YAMADA AS A MICROORGANISM",
    "YAMADA FOUND IN A DUMPSTER",
    "PRIMITIVE YAMADA",
    "YAMADA IN THE STONE AGE",
    "SURPRISINGLY DISCOUNTED YAMADA",
    "PRIVATE YAMADA",
    "BORING YAMADA",
    "PART-TIME YAMADA",
    "HALF-POUND PIECE OF YAMADA",
    "ONE OF YAMADA",
    "GENERIC YAMADA",
    "UNKNOWN YAMADA",
    "TYPICAL YAMADA",
    "NOVICE YAMADA",
    "NORMAL YAMADA",
    "DEFAULT YAMADA",
    "GOOD YAMADA",
    "SERGEANT YAMADA",
    "MADDEN YAMADA",
    "COOL YAMADA",
    "BETTER YAMADA",
    "LEADER YAMADA",
    "FAMOUS YAMADA",
    "MASTER YAMADA",
    "IRON YAMADA",
    "GENIUS YAMADA",
    "CAPTAIN YAMADA",
    "HANDSOME YAMADA",
    "MAN OF YAMADA",
    "MAJOR YAMADA",
    "TOP YAMADA",
    "PLATINUM YAMADA",
    "YAMADA OF THE YEAR",
    "CELEBRATED YAMADA",
    "A YAMADA WORTH $10 MILLION",
    "GENERAL YAMADA",
    "THE YAMADA"
];
