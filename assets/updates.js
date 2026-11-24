// ==================================================
// 更新情報
//   1件 = { date: "年-月-日", ja: "日本語の文", en: "英語の文" }
//   順番はどこに足しても構いません（日付の新しい順に自動で並べ替えます）。
//   文の中には <a href="...">リンク</a> や <i>学名</i> などの HTML が使えます。
//   文に " を含めたいときは、外側を ' ' で囲むか、` ` で囲んでください。
// ==================================================
const UPDATES = [
  {
    date: "2026-11-24",
    ja: "ホームページを公開しました。",
    en: "Launched this website.",
  },
];


// ==================================================
// ここから下は表示のための処理です（書き換え不要）。
//   <ul data-updates></ul>               → 全件を表示
//   <ul data-updates data-limit="5"></ul> → 新しい順に5件だけ表示
// ==================================================
(function () {
  var lang = (document.documentElement.lang || "ja").slice(0, 2) === "en" ? "en" : "ja";
  var sorted = UPDATES.slice().sort(function (a, b) {
    return a.date < b.date ? 1 : a.date > b.date ? -1 : 0;   // "2026-11-23" は文字列のまま比較できる
  });

  document.querySelectorAll("[data-updates]").forEach(function (list) {
    var limit = parseInt(list.dataset.limit, 10) || sorted.length;
    list.innerHTML = sorted.slice(0, limit).map(function (u) {
      var text = u[lang] || u.ja;                     // 英語が空なら日本語を表示
      var shown = u.date.replace(/-/g, ".");          // 2026-11-23 → 2026.11.23
      return '<li><time datetime="' + u.date + '">' + shown + "</time><span>" + text + "</span></li>";
    }).join("");
  });
})();