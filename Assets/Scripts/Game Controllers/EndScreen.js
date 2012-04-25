#pragma strict

// 終了画面

var skin : GUISkin;
var bgTexture : Texture2D;

private var param : float;      // 表示遷移パラメーター
private var scoreText : String; // 点数表示の文字列
private var rankName : String;  // ランク文字列

// ゲーム終了メッセージの処理
function OnGameEnd() {
    enabled = true;
    // ちょっと間を空ける。
    yield WaitForSeconds(1.0);
    // 点数を取得し、表示用の文字列を決める。
    var score = (FindObjectOfType(Scorekeeper) as Scorekeeper).GetScore();
    scoreText = score.ToString("#,##0");
    rankName = GetRankName(score);
    // リーダーボードへ点数を送信。
    Social.ReportScore(score, "jp.radiumsoftware.yamada.leaderboard.normalscore", function(result : boolean){});
    // フェードイン。
    while (param < 1.0) {
        param = Mathf.Min(param + Timekeeper.delta * 6.0, 1.0);
        yield;
    }
    // タップ待ち。
    while (!Input.GetButtonUp("Fire1")) yield;
    // フェードアウト。
    while (param < 2.0) {
        param = Mathf.Min(param + Timekeeper.delta * 6.0, 2.0);
        yield;
    }
    // ロード発行。
    Application.LoadLevel(1);
}

function OnGUI() {
    if (scoreText == null) return;
    var sw = Screen.width;
    var sh = Screen.height;
    var scale = Config.GetUIScale();
    // 黒塗り。
    GUI.color = Color(1, 1, 1, Mathf.Min(param * 0.75, 1.0));
    GUI.DrawTexture(Rect(0, 0, sw, sh), bgTexture);
    // テキスト表示。
    GUI.skin = skin;
    GUI.color = Color(1, 1, 1, param > 1.0 ? 2.0 - param : param);
    GUIUtility.ScaleAroundPivot(Vector2(1.0 / scale, 1.0 / scale), Vector2.zero);
    GUI.Label(Rect(0, sh * scale * 0.25, sw * scale, sh * scale * 0.5), "ゲームオーバー\n\n\n" + scoreText + " てん\n\n\n" + rankName);
}

// ランク定義
private var rankNames : String[] = [
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

// 点数からランク文字列を得る
private function GetRankName(score : int) : String {
    var maximum = 4000;
    var rank = rankNames.Length * score / maximum;
    return rankNames[Mathf.Min(rank, rankNames.Length - 1)];
}
