const themeInput = document.getElementById("themeInput");
const addButton = document.getElementById("addButton");
const themeList = document.getElementById("themeList");
const categorySelect = document.getElementById("categorySelect");
const categoryTabs = document.querySelectorAll(".category-tab");

let currentCategory = "fashion";

const selectAllButton = document.getElementById("selectAllButton");
const deselectAllButton = document.getElementById("deselectAllButton");
const sortSelect = document.getElementById("sortSelect");
const searchInput = document.getElementById("searchInput");
const subcategorySelect = document.getElementById("subcategorySelect");
const newSubcategoryInput = document.getElementById("newSubcategoryInput");
const subcategories = {
  fashion: [
    "ドレス・華やか系",
    "サブカル系",
    "民族・文化系",
    "現代・カジュアル系",
    "ファンタジー系",
    "SF・特殊系",
    "時代系"
  ],

  world: [
    "自然・風景",
    "ファンタジー",
    "ダーク",
    "SF・未来",
    "時代・場所",
    "イベント・特殊"
  ],

  motif: [
    "自然・天体",
    "植物",
    "生き物",
    "食べ物・飲み物",
    "アイテム",
    "宝石・装飾",
    "幻想・魔法",
    "記号・図形"
  ],

  rule: [
    "色",
    "シルエット",
    "素材",
    "装飾",
    "パーツ",
    "デザインルール"
  ]
};

function updateSubcategoryOptions() {

  const category = categorySelect.value;

  // 一度、中身を空にする
  subcategorySelect.innerHTML = "";

  // 最初の選択肢
  const firstOption = document.createElement("option");
  firstOption.value = "";
  firstOption.textContent = "小分類を選択";

  subcategorySelect.appendChild(firstOption);

  // 選択された大分類の小分類を追加
  subcategories[category].forEach(function (subcategory) {

    const option = document.createElement("option");

    option.value = subcategory;
    option.textContent = subcategory;

    subcategorySelect.appendChild(option);
  });

  // 自分で作った小分類を取得
  const customSubcategories = themes
    .filter(function (theme) {
      return theme.category === category && theme.subcategory;
    })
    .map(function (theme) {
      return theme.subcategory;
    })
    .filter(function (subcategory, index, array) {
      return array.indexOf(subcategory) === index;
    })
    .filter(function (subcategory) {
      return !subcategories[category].includes(subcategory);
    });


  // 自分で作った小分類を選択肢に追加
  customSubcategories.forEach(function (subcategory) {

    const option = document.createElement("option");

    option.value = subcategory;
    option.textContent = subcategory;

    subcategorySelect.appendChild(option);
  });


  // 「新しい小分類を追加」を最後に追加
  const newOption = document.createElement("option");

  newOption.value = "__new__";
  newOption.textContent = "＋ 新しい小分類を追加";

  subcategorySelect.appendChild(newOption);
}

categorySelect.addEventListener("change", function () {
  updateSubcategoryOptions();
});

subcategorySelect.addEventListener("change", function () {

  if (subcategorySelect.value === "__new__") {
    newSubcategoryInput.style.display = "block";
  } else {
    newSubcategoryInput.style.display = "none";
    newSubcategoryInput.value = "";
  }

});


const defaultThemes = [

  // =========================
  // 服ジャンル
  // =========================

  // ドレス・華やか系
  { text: "ドレス", category: "fashion", subcategory: "ドレス・華やか系", enabled: true, isDefault: true },
  { text: "プリンセスドレス", category: "fashion", subcategory: "ドレス・華やか系", enabled: true, isDefault: true },
  { text: "王子様風", category: "fashion", subcategory: "ドレス・華やか系", enabled: true, isDefault: true },
  { text: "舞踏会ドレス", category: "fashion", subcategory: "ドレス・華やか系", enabled: true, isDefault: true },
  { text: "カクテルドレス", category: "fashion", subcategory: "ドレス・華やか系", enabled: true, isDefault: true },
  { text: "イブニングドレス", category: "fashion", subcategory: "ドレス・華やか系", enabled: true, isDefault: true },
  { text: "ウェディングドレス", category: "fashion", subcategory: "ドレス・華やか系", enabled: true, isDefault: true },
  { text: "マーメイドドレス", category: "fashion", subcategory: "ドレス・華やか系", enabled: true, isDefault: true },

  // サブカル系
  { text: "ゴシック", category: "fashion", subcategory: "サブカル系", enabled: true, isDefault: true },
  { text: "ゴシックロリータ", category: "fashion", subcategory: "サブカル系", enabled: true, isDefault: true },
  { text: "クラシカルロリータ", category: "fashion", subcategory: "サブカル系", enabled: true, isDefault: true },
  { text: "甘ロリ", category: "fashion", subcategory: "サブカル系", enabled: true, isDefault: true },
  { text: "姫ロリ", category: "fashion", subcategory: "サブカル系", enabled: true, isDefault: true },
  { text: "パンク", category: "fashion", subcategory: "サブカル系", enabled: true, isDefault: true },
  { text: "ゴスパンク", category: "fashion", subcategory: "サブカル系", enabled: true, isDefault: true },
  { text: "ロック", category: "fashion", subcategory: "サブカル系", enabled: true, isDefault: true },
  { text: "グランジ", category: "fashion", subcategory: "サブカル系", enabled: true, isDefault: true },
  { text: "ヴィジュアル系", category: "fashion", subcategory: "サブカル系", enabled: true, isDefault: true },
  { text: "地雷系", category: "fashion", subcategory: "サブカル系", enabled: true, isDefault: true },
  { text: "量産型", category: "fashion", subcategory: "サブカル系", enabled: true, isDefault: true },
  { text: "病みかわ", category: "fashion", subcategory: "サブカル系", enabled: true, isDefault: true },
  { text: "ゆめかわ", category: "fashion", subcategory: "サブカル系", enabled: true, isDefault: true },
  { text: "原宿系", category: "fashion", subcategory: "サブカル系", enabled: true, isDefault: true },
  { text: "デコラ", category: "fashion", subcategory: "サブカル系", enabled: true, isDefault: true },
  { text: "天使界隈", category: "fashion", subcategory: "サブカル系", enabled: true, isDefault: true },
  { text: "Y2K", category: "fashion", subcategory: "サブカル系", enabled: true, isDefault: true },
  { text: "ギャル", category: "fashion", subcategory: "サブカル系", enabled: true, isDefault: true },
  { text: "姫ギャル", category: "fashion", subcategory: "サブカル系", enabled: true, isDefault: true },
  { text: "ガーリー", category: "fashion", subcategory: "サブカル系", enabled: true, isDefault: true },
  { text: "フレンチガーリー", category: "fashion", subcategory: "サブカル系", enabled: true, isDefault: true },
  { text: "バレエコア", category: "fashion", subcategory: "サブカル系", enabled: true, isDefault: true },
  { text: "コケット", category: "fashion", subcategory: "サブカル系", enabled: true, isDefault: true },
  { text: "モード系", category: "fashion", subcategory: "サブカル系", enabled: true, isDefault: true },

  // 民族・文化系
  { text: "中華風", category: "fashion", subcategory: "民族・文化系", enabled: true, isDefault: true },
  { text: "チャイナドレス", category: "fashion", subcategory: "民族・文化系", enabled: true, isDefault: true },
  { text: "漢服風", category: "fashion", subcategory: "民族・文化系", enabled: true, isDefault: true },
  { text: "武侠風", category: "fashion", subcategory: "民族・文化系", enabled: true, isDefault: true },
  { text: "和風", category: "fashion", subcategory: "民族・文化系", enabled: true, isDefault: true },
  { text: "着物", category: "fashion", subcategory: "民族・文化系", enabled: true, isDefault: true },
  { text: "浴衣", category: "fashion", subcategory: "民族・文化系", enabled: true, isDefault: true },
  { text: "袴", category: "fashion", subcategory: "民族・文化系", enabled: true, isDefault: true },
  { text: "巫女服", category: "fashion", subcategory: "民族・文化系", enabled: true, isDefault: true },
  { text: "和洋折衷", category: "fashion", subcategory: "民族・文化系", enabled: true, isDefault: true },
  { text: "大正浪漫", category: "fashion", subcategory: "民族・文化系", enabled: true, isDefault: true },
  { text: "忍者風", category: "fashion", subcategory: "民族・文化系", enabled: true, isDefault: true },
  { text: "侍風", category: "fashion", subcategory: "民族・文化系", enabled: true, isDefault: true },
  { text: "韓服風", category: "fashion", subcategory: "民族・文化系", enabled: true, isDefault: true },
  { text: "インド風", category: "fashion", subcategory: "民族・文化系", enabled: true, isDefault: true },
  { text: "アラビアン", category: "fashion", subcategory: "民族・文化系", enabled: true, isDefault: true },
  { text: "古代エジプト風", category: "fashion", subcategory: "民族・文化系", enabled: true, isDefault: true },
  { text: "古代ギリシャ風", category: "fashion", subcategory: "民族・文化系", enabled: true, isDefault: true },
  { text: "古代ローマ風", category: "fashion", subcategory: "民族・文化系", enabled: true, isDefault: true },
  { text: "ケルト風", category: "fashion", subcategory: "民族・文化系", enabled: true, isDefault: true },
  { text: "北欧民族衣装風", category: "fashion", subcategory: "民族・文化系", enabled: true, isDefault: true },
  { text: "東欧民族衣装風", category: "fashion", subcategory: "民族・文化系", enabled: true, isDefault: true },
  { text: "ウェスタン", category: "fashion", subcategory: "民族・文化系", enabled: true, isDefault: true },

  // 現代・カジュアル系
  { text: "スポーティ", category: "fashion", subcategory: "現代・カジュアル系", enabled: true, isDefault: true },
  { text: "スポーツMIX", category: "fashion", subcategory: "現代・カジュアル系", enabled: true, isDefault: true },
  { text: "ストリート", category: "fashion", subcategory: "現代・カジュアル系", enabled: true, isDefault: true },
  { text: "スケーター", category: "fashion", subcategory: "現代・カジュアル系", enabled: true, isDefault: true },
  { text: "ヒップホップ", category: "fashion", subcategory: "現代・カジュアル系", enabled: true, isDefault: true },
  { text: "アメカジ", category: "fashion", subcategory: "現代・カジュアル系", enabled: true, isDefault: true },
  { text: "カレッジスタイル", category: "fashion", subcategory: "現代・カジュアル系", enabled: true, isDefault: true },
  { text: "プレッピー", category: "fashion", subcategory: "現代・カジュアル系", enabled: true, isDefault: true },
  { text: "スクール風", category: "fashion", subcategory: "現代・カジュアル系", enabled: true, isDefault: true },
  { text: "セーラー服アレンジ", category: "fashion", subcategory: "現代・カジュアル系", enabled: true, isDefault: true },
  { text: "ブレザーアレンジ", category: "fashion", subcategory: "現代・カジュアル系", enabled: true, isDefault: true },
  { text: "オーバーサイズ", category: "fashion", subcategory: "現代・カジュアル系", enabled: true, isDefault: true },
  { text: "デニムスタイル", category: "fashion", subcategory: "現代・カジュアル系", enabled: true, isDefault: true },
  { text: "ワークウェア", category: "fashion", subcategory: "現代・カジュアル系", enabled: true, isDefault: true },
  { text: "アウトドア", category: "fashion", subcategory: "現代・カジュアル系", enabled: true, isDefault: true },
  { text: "マリンルック", category: "fashion", subcategory: "現代・カジュアル系", enabled: true, isDefault: true },
  { text: "リゾート", category: "fashion", subcategory: "現代・カジュアル系", enabled: true, isDefault: true },

  // ファンタジー系
  { text: "勇者風", category: "fashion", subcategory: "ファンタジー系", enabled: true, isDefault: true },
  { text: "剣士風", category: "fashion", subcategory: "ファンタジー系", enabled: true, isDefault: true },
  { text: "騎士風", category: "fashion", subcategory: "ファンタジー系", enabled: true, isDefault: true },
  { text: "暗黒騎士風", category: "fashion", subcategory: "ファンタジー系", enabled: true, isDefault: true },
  { text: "魔法使い風", category: "fashion", subcategory: "ファンタジー系", enabled: true, isDefault: true },
  { text: "魔女風", category: "fashion", subcategory: "ファンタジー系", enabled: true, isDefault: true },
  { text: "魔法少女風", category: "fashion", subcategory: "ファンタジー系", enabled: true, isDefault: true },
  { text: "僧侶風", category: "fashion", subcategory: "ファンタジー系", enabled: true, isDefault: true },
  { text: "神官風", category: "fashion", subcategory: "ファンタジー系", enabled: true, isDefault: true },
  { text: "錬金術師風", category: "fashion", subcategory: "ファンタジー系", enabled: true, isDefault: true },
  { text: "占い師風", category: "fashion", subcategory: "ファンタジー系", enabled: true, isDefault: true },
  { text: "吟遊詩人風", category: "fashion", subcategory: "ファンタジー系", enabled: true, isDefault: true },
  { text: "踊り子風", category: "fashion", subcategory: "ファンタジー系", enabled: true, isDefault: true },
  { text: "海賊風", category: "fashion", subcategory: "ファンタジー系", enabled: true, isDefault: true },
  { text: "王族風", category: "fashion", subcategory: "ファンタジー系", enabled: true, isDefault: true },
  { text: "貴族風", category: "fashion", subcategory: "ファンタジー系", enabled: true, isDefault: true },
  { text: "メイド", category: "fashion", subcategory: "ファンタジー系", enabled: true, isDefault: true },
  { text: "執事", category: "fashion", subcategory: "ファンタジー系", enabled: true, isDefault: true },
  { text: "天使風", category: "fashion", subcategory: "ファンタジー系", enabled: true, isDefault: true },
  { text: "堕天使風", category: "fashion", subcategory: "ファンタジー系", enabled: true, isDefault: true },
  { text: "悪魔風", category: "fashion", subcategory: "ファンタジー系", enabled: true, isDefault: true },
  { text: "吸血鬼風", category: "fashion", subcategory: "ファンタジー系", enabled: true, isDefault: true },

  // SF・特殊系
  { text: "サイバーパンク", category: "fashion", subcategory: "SF・特殊系", enabled: true, isDefault: true },
  { text: "テックウェア", category: "fashion", subcategory: "SF・特殊系", enabled: true, isDefault: true },
  { text: "スチームパンク", category: "fashion", subcategory: "SF・特殊系", enabled: true, isDefault: true },
  { text: "レトロフューチャー", category: "fashion", subcategory: "SF・特殊系", enabled: true, isDefault: true },
  { text: "アンドロイド風", category: "fashion", subcategory: "SF・特殊系", enabled: true, isDefault: true },
  { text: "宇宙服アレンジ", category: "fashion", subcategory: "SF・特殊系", enabled: true, isDefault: true },
  { text: "ポストアポカリプス", category: "fashion", subcategory: "SF・特殊系", enabled: true, isDefault: true },

  // 時代系
  { text: "中世ヨーロッパ風", category: "fashion", subcategory: "時代系", enabled: true, isDefault: true },
  { text: "ルネサンス風", category: "fashion", subcategory: "時代系", enabled: true, isDefault: true },
  { text: "ロココ", category: "fashion", subcategory: "時代系", enabled: true, isDefault: true },
  { text: "ヴィクトリアン", category: "fashion", subcategory: "時代系", enabled: true, isDefault: true },
  { text: "1920年代風", category: "fashion", subcategory: "時代系", enabled: true, isDefault: true },
  { text: "1950年代風", category: "fashion", subcategory: "時代系", enabled: true, isDefault: true },
  { text: "1980年代風", category: "fashion", subcategory: "時代系", enabled: true, isDefault: true },
  { text: "昭和レトロ", category: "fashion", subcategory: "時代系", enabled: true, isDefault: true },
  { text: "平成レトロ", category: "fashion", subcategory: "時代系", enabled: true, isDefault: true },

  // =========================
  // 世界観
  // =========================

  // 自然・風景
  { text: "深海", category: "world", subcategory: "自然・風景", enabled: true, isDefault: true },
  { text: "海辺", category: "world", subcategory: "自然・風景", enabled: true, isDefault: true },
  { text: "南国", category: "world", subcategory: "自然・風景", enabled: true, isDefault: true },
  { text: "雪国", category: "world", subcategory: "自然・風景", enabled: true, isDefault: true },
  { text: "氷の世界", category: "world", subcategory: "自然・風景", enabled: true, isDefault: true },
  { text: "砂漠", category: "world", subcategory: "自然・風景", enabled: true, isDefault: true },
  { text: "森林", category: "world", subcategory: "自然・風景", enabled: true, isDefault: true },
  { text: "花畑", category: "world", subcategory: "自然・風景", enabled: true, isDefault: true },
  { text: "天空", category: "world", subcategory: "自然・風景", enabled: true, isDefault: true },
  { text: "雲の上", category: "world", subcategory: "自然・風景", enabled: true, isDefault: true },
  { text: "星空", category: "world", subcategory: "自然・風景", enabled: true, isDefault: true },
  { text: "月夜", category: "world", subcategory: "自然・風景", enabled: true, isDefault: true },
  { text: "オーロラ", category: "world", subcategory: "自然・風景", enabled: true, isDefault: true },

  // ファンタジー
  { text: "剣と魔法の世界", category: "world", subcategory: "ファンタジー", enabled: true, isDefault: true },
  { text: "魔法王国", category: "world", subcategory: "ファンタジー", enabled: true, isDefault: true },
  { text: "妖精の国", category: "world", subcategory: "ファンタジー", enabled: true, isDefault: true },
  { text: "精霊の世界", category: "world", subcategory: "ファンタジー", enabled: true, isDefault: true },
  { text: "天空都市", category: "world", subcategory: "ファンタジー", enabled: true, isDefault: true },
  { text: "海底都市", category: "world", subcategory: "ファンタジー", enabled: true, isDefault: true },
  { text: "魔界", category: "world", subcategory: "ファンタジー", enabled: true, isDefault: true },
  { text: "天界", category: "world", subcategory: "ファンタジー", enabled: true, isDefault: true },
  { text: "異世界", category: "world", subcategory: "ファンタジー", enabled: true, isDefault: true },
  { text: "おとぎ話の世界", category: "world", subcategory: "ファンタジー", enabled: true, isDefault: true },
  { text: "夢の世界", category: "world", subcategory: "ファンタジー", enabled: true, isDefault: true },
  { text: "鏡の世界", category: "world", subcategory: "ファンタジー", enabled: true, isDefault: true },

  // ダーク
  { text: "廃墟", category: "world", subcategory: "ダーク", enabled: true, isDefault: true },
  { text: "荒廃した世界", category: "world", subcategory: "ダーク", enabled: true, isDefault: true },
  { text: "終末世界", category: "world", subcategory: "ダーク", enabled: true, isDefault: true },
  { text: "呪われた王国", category: "world", subcategory: "ダーク", enabled: true, isDefault: true },
  { text: "ゴーストタウン", category: "world", subcategory: "ダーク", enabled: true, isDefault: true },
  { text: "永遠の夜", category: "world", subcategory: "ダーク", enabled: true, isDefault: true },
  { text: "ダークファンタジー", category: "world", subcategory: "ダーク", enabled: true, isDefault: true },
  { text: "吸血鬼の世界", category: "world", subcategory: "ダーク", enabled: true, isDefault: true },

  // SF・未来
  { text: "近未来", category: "world", subcategory: "SF・未来", enabled: true, isDefault: true },
  { text: "サイバー都市", category: "world", subcategory: "SF・未来", enabled: true, isDefault: true },
  { text: "電脳世界", category: "world", subcategory: "SF・未来", enabled: true, isDefault: true },
  { text: "宇宙", category: "world", subcategory: "SF・未来", enabled: true, isDefault: true },
  { text: "宇宙都市", category: "world", subcategory: "SF・未来", enabled: true, isDefault: true },
  { text: "宇宙船", category: "world", subcategory: "SF・未来", enabled: true, isDefault: true },
  { text: "機械都市", category: "world", subcategory: "SF・未来", enabled: true, isDefault: true },
  { text: "アンドロイド社会", category: "world", subcategory: "SF・未来", enabled: true, isDefault: true },
  { text: "ディストピア", category: "world", subcategory: "SF・未来", enabled: true, isDefault: true },
  { text: "ユートピア", category: "world", subcategory: "SF・未来", enabled: true, isDefault: true },

  // 時代・場所
  { text: "中世", category: "world", subcategory: "時代・場所", enabled: true, isDefault: true },
  { text: "古代文明", category: "world", subcategory: "時代・場所", enabled: true, isDefault: true },
  { text: "王宮", category: "world", subcategory: "時代・場所", enabled: true, isDefault: true },
  { text: "魔法学園", category: "world", subcategory: "時代・場所", enabled: true, isDefault: true },
  { text: "時計塔の街", category: "world", subcategory: "時代・場所", enabled: true, isDefault: true },
  { text: "港町", category: "world", subcategory: "時代・場所", enabled: true, isDefault: true },
  { text: "水上都市", category: "world", subcategory: "時代・場所", enabled: true, isDefault: true },
  { text: "地下都市", category: "world", subcategory: "時代・場所", enabled: true, isDefault: true },
  { text: "遊園地", category: "world", subcategory: "時代・場所", enabled: true, isDefault: true },
  { text: "サーカス", category: "world", subcategory: "時代・場所", enabled: true, isDefault: true },
  { text: "図書館", category: "world", subcategory: "時代・場所", enabled: true, isDefault: true },
  { text: "美術館", category: "world", subcategory: "時代・場所", enabled: true, isDefault: true },

  // イベント・特殊
  { text: "ハロウィン", category: "world", subcategory: "イベント・特殊", enabled: true, isDefault: true },
  { text: "クリスマス", category: "world", subcategory: "イベント・特殊", enabled: true, isDefault: true },
  { text: "お祭り", category: "world", subcategory: "イベント・特殊", enabled: true, isDefault: true },
  { text: "仮面舞踏会", category: "world", subcategory: "イベント・特殊", enabled: true, isDefault: true },
  { text: "夜のカーニバル", category: "world", subcategory: "イベント・特殊", enabled: true, isDefault: true },
  { text: "お菓子の国", category: "world", subcategory: "イベント・特殊", enabled: true, isDefault: true },
  { text: "人形の国", category: "world", subcategory: "イベント・特殊", enabled: true, isDefault: true },
  { text: "絵本の世界", category: "world", subcategory: "イベント・特殊", enabled: true, isDefault: true },
  { text: "白昼夢", category: "world", subcategory: "イベント・特殊", enabled: true, isDefault: true },

  // =========================
  // モチーフ
  // =========================

  // 自然・天体
  { text: "月", category: "motif", subcategory: "自然・天体", enabled: true, isDefault: true },
  { text: "太陽", category: "motif", subcategory: "自然・天体", enabled: true, isDefault: true },
  { text: "星", category: "motif", subcategory: "自然・天体", enabled: true, isDefault: true },
  { text: "星座", category: "motif", subcategory: "自然・天体", enabled: true, isDefault: true },
  { text: "流れ星", category: "motif", subcategory: "自然・天体", enabled: true, isDefault: true },
  { text: "銀河", category: "motif", subcategory: "自然・天体", enabled: true, isDefault: true },
  { text: "虹", category: "motif", subcategory: "自然・天体", enabled: true, isDefault: true },
  { text: "雲", category: "motif", subcategory: "自然・天体", enabled: true, isDefault: true },
  { text: "雨", category: "motif", subcategory: "自然・天体", enabled: true, isDefault: true },
  { text: "雪", category: "motif", subcategory: "自然・天体", enabled: true, isDefault: true },
  { text: "氷", category: "motif", subcategory: "自然・天体", enabled: true, isDefault: true },
  { text: "雷", category: "motif", subcategory: "自然・天体", enabled: true, isDefault: true },
  { text: "炎", category: "motif", subcategory: "自然・天体", enabled: true, isDefault: true },
  { text: "水", category: "motif", subcategory: "自然・天体", enabled: true, isDefault: true },
  { text: "海", category: "motif", subcategory: "自然・天体", enabled: true, isDefault: true },
  { text: "波", category: "motif", subcategory: "自然・天体", enabled: true, isDefault: true },
  { text: "泡", category: "motif", subcategory: "自然・天体", enabled: true, isDefault: true },
  { text: "風", category: "motif", subcategory: "自然・天体", enabled: true, isDefault: true },

  // 植物
  { text: "花", category: "motif", subcategory: "植物", enabled: true, isDefault: true },
  { text: "バラ", category: "motif", subcategory: "植物", enabled: true, isDefault: true },
  { text: "桜", category: "motif", subcategory: "植物", enabled: true, isDefault: true },
  { text: "梅", category: "motif", subcategory: "植物", enabled: true, isDefault: true },
  { text: "藤", category: "motif", subcategory: "植物", enabled: true, isDefault: true },
  { text: "百合", category: "motif", subcategory: "植物", enabled: true, isDefault: true },
  { text: "蓮", category: "motif", subcategory: "植物", enabled: true, isDefault: true },
  { text: "彼岸花", category: "motif", subcategory: "植物", enabled: true, isDefault: true },
  { text: "椿", category: "motif", subcategory: "植物", enabled: true, isDefault: true },
  { text: "向日葵", category: "motif", subcategory: "植物", enabled: true, isDefault: true },
  { text: "鈴蘭", category: "motif", subcategory: "植物", enabled: true, isDefault: true },
  { text: "ラベンダー", category: "motif", subcategory: "植物", enabled: true, isDefault: true },
  { text: "蔦", category: "motif", subcategory: "植物", enabled: true, isDefault: true },
  { text: "葉", category: "motif", subcategory: "植物", enabled: true, isDefault: true },
  { text: "キノコ", category: "motif", subcategory: "植物", enabled: true, isDefault: true },

  // 生き物
  { text: "猫", category: "motif", subcategory: "生き物", enabled: true, isDefault: true },
  { text: "犬", category: "motif", subcategory: "生き物", enabled: true, isDefault: true },
  { text: "狼", category: "motif", subcategory: "生き物", enabled: true, isDefault: true },
  { text: "狐", category: "motif", subcategory: "生き物", enabled: true, isDefault: true },
  { text: "兎", category: "motif", subcategory: "生き物", enabled: true, isDefault: true },
  { text: "鹿", category: "motif", subcategory: "生き物", enabled: true, isDefault: true },
  { text: "羊", category: "motif", subcategory: "生き物", enabled: true, isDefault: true },
  { text: "蝶", category: "motif", subcategory: "生き物", enabled: true, isDefault: true },
  { text: "蛾", category: "motif", subcategory: "生き物", enabled: true, isDefault: true },
  { text: "蜂", category: "motif", subcategory: "生き物", enabled: true, isDefault: true },
  { text: "蜘蛛", category: "motif", subcategory: "生き物", enabled: true, isDefault: true },
  { text: "蛇", category: "motif", subcategory: "生き物", enabled: true, isDefault: true },
  { text: "龍", category: "motif", subcategory: "生き物", enabled: true, isDefault: true },
  { text: "鳥", category: "motif", subcategory: "生き物", enabled: true, isDefault: true },
  { text: "白鳥", category: "motif", subcategory: "生き物", enabled: true, isDefault: true },
  { text: "孔雀", category: "motif", subcategory: "生き物", enabled: true, isDefault: true },
  { text: "烏", category: "motif", subcategory: "生き物", enabled: true, isDefault: true },
  { text: "魚", category: "motif", subcategory: "生き物", enabled: true, isDefault: true },
  { text: "金魚", category: "motif", subcategory: "生き物", enabled: true, isDefault: true },
  { text: "クラゲ", category: "motif", subcategory: "生き物", enabled: true, isDefault: true },

  // 食べ物・飲み物
  { text: "苺", category: "motif", subcategory: "食べ物・飲み物", enabled: true, isDefault: true },
  { text: "チェリー", category: "motif", subcategory: "食べ物・飲み物", enabled: true, isDefault: true },
  { text: "林檎", category: "motif", subcategory: "食べ物・飲み物", enabled: true, isDefault: true },
  { text: "レモン", category: "motif", subcategory: "食べ物・飲み物", enabled: true, isDefault: true },
  { text: "葡萄", category: "motif", subcategory: "食べ物・飲み物", enabled: true, isDefault: true },
  { text: "桃", category: "motif", subcategory: "食べ物・飲み物", enabled: true, isDefault: true },
  { text: "キャンディ", category: "motif", subcategory: "食べ物・飲み物", enabled: true, isDefault: true },
  { text: "チョコレート", category: "motif", subcategory: "食べ物・飲み物", enabled: true, isDefault: true },
  { text: "ケーキ", category: "motif", subcategory: "食べ物・飲み物", enabled: true, isDefault: true },
  { text: "マカロン", category: "motif", subcategory: "食べ物・飲み物", enabled: true, isDefault: true },
  { text: "紅茶", category: "motif", subcategory: "食べ物・飲み物", enabled: true, isDefault: true },
  { text: "コーヒー", category: "motif", subcategory: "食べ物・飲み物", enabled: true, isDefault: true },

  // アイテム
  { text: "鍵", category: "motif", subcategory: "アイテム", enabled: true, isDefault: true },
  { text: "時計", category: "motif", subcategory: "アイテム", enabled: true, isDefault: true },
  { text: "鏡", category: "motif", subcategory: "アイテム", enabled: true, isDefault: true },
  { text: "本", category: "motif", subcategory: "アイテム", enabled: true, isDefault: true },
  { text: "手紙", category: "motif", subcategory: "アイテム", enabled: true, isDefault: true },
  { text: "傘", category: "motif", subcategory: "アイテム", enabled: true, isDefault: true },
  { text: "ランタン", category: "motif", subcategory: "アイテム", enabled: true, isDefault: true },
  { text: "蝋燭", category: "motif", subcategory: "アイテム", enabled: true, isDefault: true },
  { text: "剣", category: "motif", subcategory: "アイテム", enabled: true, isDefault: true },
  { text: "盾", category: "motif", subcategory: "アイテム", enabled: true, isDefault: true },
  { text: "弓矢", category: "motif", subcategory: "アイテム", enabled: true, isDefault: true },
  { text: "トランプ", category: "motif", subcategory: "アイテム", enabled: true, isDefault: true },
  { text: "チェス", category: "motif", subcategory: "アイテム", enabled: true, isDefault: true },
  { text: "音符", category: "motif", subcategory: "アイテム", enabled: true, isDefault: true },

  // 宝石・装飾
  { text: "宝石", category: "motif", subcategory: "宝石・装飾", enabled: true, isDefault: true },
  { text: "ダイヤモンド", category: "motif", subcategory: "宝石・装飾", enabled: true, isDefault: true },
  { text: "ルビー", category: "motif", subcategory: "宝石・装飾", enabled: true, isDefault: true },
  { text: "サファイア", category: "motif", subcategory: "宝石・装飾", enabled: true, isDefault: true },
  { text: "エメラルド", category: "motif", subcategory: "宝石・装飾", enabled: true, isDefault: true },
  { text: "アメジスト", category: "motif", subcategory: "宝石・装飾", enabled: true, isDefault: true },
  { text: "真珠", category: "motif", subcategory: "宝石・装飾", enabled: true, isDefault: true },
  { text: "水晶", category: "motif", subcategory: "宝石・装飾", enabled: true, isDefault: true },
  { text: "王冠", category: "motif", subcategory: "宝石・装飾", enabled: true, isDefault: true },
  { text: "ティアラ", category: "motif", subcategory: "宝石・装飾", enabled: true, isDefault: true },
  { text: "リボン", category: "motif", subcategory: "宝石・装飾", enabled: true, isDefault: true },
  { text: "レース", category: "motif", subcategory: "宝石・装飾", enabled: true, isDefault: true },
  { text: "鎖", category: "motif", subcategory: "宝石・装飾", enabled: true, isDefault: true },

  // 幻想・魔法
  { text: "天使の羽", category: "motif", subcategory: "幻想・魔法", enabled: true, isDefault: true },
  { text: "悪魔の羽", category: "motif", subcategory: "幻想・魔法", enabled: true, isDefault: true },
  { text: "妖精", category: "motif", subcategory: "幻想・魔法", enabled: true, isDefault: true },
  { text: "精霊", category: "motif", subcategory: "幻想・魔法", enabled: true, isDefault: true },
  { text: "魔法陣", category: "motif", subcategory: "幻想・魔法", enabled: true, isDefault: true },
  { text: "魔法の杖", category: "motif", subcategory: "幻想・魔法", enabled: true, isDefault: true },
  { text: "タロット", category: "motif", subcategory: "幻想・魔法", enabled: true, isDefault: true },
  { text: "魔導書", category: "motif", subcategory: "幻想・魔法", enabled: true, isDefault: true },
  { text: "錬金術", category: "motif", subcategory: "幻想・魔法", enabled: true, isDefault: true },
  { text: "人魚", category: "motif", subcategory: "幻想・魔法", enabled: true, isDefault: true },

  // 記号・図形
  { text: "ハート", category: "motif", subcategory: "記号・図形", enabled: true, isDefault: true },
  { text: "スペード", category: "motif", subcategory: "記号・図形", enabled: true, isDefault: true },
  { text: "クローバー", category: "motif", subcategory: "記号・図形", enabled: true, isDefault: true },
  { text: "十字架", category: "motif", subcategory: "記号・図形", enabled: true, isDefault: true },
  { text: "歯車", category: "motif", subcategory: "記号・図形", enabled: true, isDefault: true },
  { text: "鎖模様", category: "motif", subcategory: "記号・図形", enabled: true, isDefault: true },
  { text: "市松模様", category: "motif", subcategory: "記号・図形", enabled: true, isDefault: true },
  { text: "ストライプ", category: "motif", subcategory: "記号・図形", enabled: true, isDefault: true },
  { text: "チェック", category: "motif", subcategory: "記号・図形", enabled: true, isDefault: true },
  { text: "水玉", category: "motif", subcategory: "記号・図形", enabled: true, isDefault: true },

  // =========================
  // 追加縛り
  // =========================

  // 色
  { text: "2色だけでまとめる", category: "rule", subcategory: "色", enabled: true, isDefault: true },
  { text: "3色以内でまとめる", category: "rule", subcategory: "色", enabled: true, isDefault: true },
  { text: "モノクロでまとめる", category: "rule", subcategory: "色", enabled: true, isDefault: true },
  { text: "差し色を1色だけ使う", category: "rule", subcategory: "色", enabled: true, isDefault: true },
  { text: "暖色中心にする", category: "rule", subcategory: "色", enabled: true, isDefault: true },
  { text: "寒色中心にする", category: "rule", subcategory: "色", enabled: true, isDefault: true },
  { text: "パステルカラー中心にする", category: "rule", subcategory: "色", enabled: true, isDefault: true },
  { text: "くすみカラー中心にする", category: "rule", subcategory: "色", enabled: true, isDefault: true },
  { text: "ビビッドカラー中心にする", category: "rule", subcategory: "色", enabled: true, isDefault: true },
  { text: "白をメインカラーにする", category: "rule", subcategory: "色", enabled: true, isDefault: true },
  { text: "黒をメインカラーにする", category: "rule", subcategory: "色", enabled: true, isDefault: true },
  { text: "元キャラのメインカラーを使わない", category: "rule", subcategory: "色", enabled: true, isDefault: true },

  // シルエット
  { text: "左右非対称にする", category: "rule", subcategory: "シルエット", enabled: true, isDefault: true },
  { text: "左右対称にする", category: "rule", subcategory: "シルエット", enabled: true, isDefault: true },
  { text: "上半身にボリュームを出す", category: "rule", subcategory: "シルエット", enabled: true, isDefault: true },
  { text: "下半身にボリュームを出す", category: "rule", subcategory: "シルエット", enabled: true, isDefault: true },
  { text: "オーバーサイズにする", category: "rule", subcategory: "シルエット", enabled: true, isDefault: true },
  { text: "タイトなシルエットにする", category: "rule", subcategory: "シルエット", enabled: true, isDefault: true },
  { text: "ロング丈を取り入れる", category: "rule", subcategory: "シルエット", enabled: true, isDefault: true },
  { text: "ショート丈を取り入れる", category: "rule", subcategory: "シルエット", enabled: true, isDefault: true },
  { text: "大きな袖を取り入れる", category: "rule", subcategory: "シルエット", enabled: true, isDefault: true },
  { text: "腰まわりを強調する", category: "rule", subcategory: "シルエット", enabled: true, isDefault: true },

  // 素材
  { text: "透明素材を取り入れる", category: "rule", subcategory: "素材", enabled: true, isDefault: true },
  { text: "金属素材を取り入れる", category: "rule", subcategory: "素材", enabled: true, isDefault: true },
  { text: "レザーを取り入れる", category: "rule", subcategory: "素材", enabled: true, isDefault: true },
  { text: "ファーを取り入れる", category: "rule", subcategory: "素材", enabled: true, isDefault: true },
  { text: "レース素材を取り入れる", category: "rule", subcategory: "素材", enabled: true, isDefault: true },
  { text: "光沢のある素材を取り入れる", category: "rule", subcategory: "素材", enabled: true, isDefault: true },
  { text: "マットな素材を中心にする", category: "rule", subcategory: "素材", enabled: true, isDefault: true },
  { text: "異なる素材を3種類以上組み合わせる", category: "rule", subcategory: "素材", enabled: true, isDefault: true },

  // 装飾
  { text: "リボンを必ず入れる", category: "rule", subcategory: "装飾", enabled: true, isDefault: true },
  { text: "フリルを必ず入れる", category: "rule", subcategory: "装飾", enabled: true, isDefault: true },
  { text: "刺繍を入れる", category: "rule", subcategory: "装飾", enabled: true, isDefault: true },
  { text: "チェーンを取り入れる", category: "rule", subcategory: "装飾", enabled: true, isDefault: true },
  { text: "ベルトを複数使う", category: "rule", subcategory: "装飾", enabled: true, isDefault: true },
  { text: "宝石を取り入れる", category: "rule", subcategory: "装飾", enabled: true, isDefault: true },
  { text: "花飾りを取り入れる", category: "rule", subcategory: "装飾", enabled: true, isDefault: true },
  { text: "タッセルを取り入れる", category: "rule", subcategory: "装飾", enabled: true, isDefault: true },
  { text: "装飾を極力減らす", category: "rule", subcategory: "装飾", enabled: true, isDefault: true },

  // パーツ
  { text: "帽子を必ず入れる", category: "rule", subcategory: "パーツ", enabled: true, isDefault: true },
  { text: "手袋を必ず入れる", category: "rule", subcategory: "パーツ", enabled: true, isDefault: true },
  { text: "ブーツを必ず入れる", category: "rule", subcategory: "パーツ", enabled: true, isDefault: true },
  { text: "ベルトを必ず入れる", category: "rule", subcategory: "パーツ", enabled: true, isDefault: true },
  { text: "ケープを必ず入れる", category: "rule", subcategory: "パーツ", enabled: true, isDefault: true },
  { text: "フードを必ず入れる", category: "rule", subcategory: "パーツ", enabled: true, isDefault: true },
  { text: "マントを必ず入れる", category: "rule", subcategory: "パーツ", enabled: true, isDefault: true },
  { text: "コルセットを取り入れる", category: "rule", subcategory: "パーツ", enabled: true, isDefault: true },
  { text: "ネクタイまたはリボンタイを入れる", category: "rule", subcategory: "パーツ", enabled: true, isDefault: true },
  { text: "大きなアクセサリーを1つ入れる", category: "rule", subcategory: "パーツ", enabled: true, isDefault: true },

  // デザインルール
  { text: "肌見せを極力なくす", category: "rule", subcategory: "デザインルール", enabled: true, isDefault: true },
  { text: "肌見せを多めにする", category: "rule", subcategory: "デザインルール", enabled: true, isDefault: true },
  { text: "現代で実際に着られる服にする", category: "rule", subcategory: "デザインルール", enabled: true, isDefault: true },
  { text: "舞台衣装のように派手にする", category: "rule", subcategory: "デザインルール", enabled: true, isDefault: true },
  { text: "普段着として成立させる", category: "rule", subcategory: "デザインルール", enabled: true, isDefault: true },
  { text: "元キャラの服装を直接参考にしない", category: "rule", subcategory: "デザインルール", enabled: true, isDefault: true },
  { text: "元キャラの特徴を3つ以上残す", category: "rule", subcategory: "デザインルール", enabled: true, isDefault: true },
  { text: "モチーフを直接描かない", category: "rule", subcategory: "デザインルール", enabled: true, isDefault: true },
  { text: "モチーフをシルエットだけで表現する", category: "rule", subcategory: "デザインルール", enabled: true, isDefault: true },
  { text: "柄を使わない", category: "rule", subcategory: "デザインルール", enabled: true, isDefault: true },
  { text: "直線を中心にデザインする", category: "rule", subcategory: "デザインルール", enabled: true, isDefault: true },
  { text: "曲線を中心にデザインする", category: "rule", subcategory: "デザインルール", enabled: true, isDefault: true },
  { text: "性別を限定しないデザインにする", category: "rule", subcategory: "デザインルール", enabled: true, isDefault: true },
  { text: "季節を夏に設定する", category: "rule", subcategory: "デザインルール", enabled: true, isDefault: true },
  { text: "季節を冬に設定する", category: "rule", subcategory: "デザインルール", enabled: true, isDefault: true },
  { text: "戦闘できそうな服にする", category: "rule", subcategory: "デザインルール", enabled: true, isDefault: true },
  { text: "動きやすさを重視する", category: "rule", subcategory: "デザインルール", enabled: true, isDefault: true },
  { text: "高級感を重視する", category: "rule", subcategory: "デザインルール", enabled: true, isDefault: true },
  { text: "かわいさより格好良さを重視する", category: "rule", subcategory: "デザインルール", enabled: true, isDefault: true },
  { text: "格好良さよりかわいさを重視する", category: "rule", subcategory: "デザインルール", enabled: true, isDefault: true },
];

// 保存済みのお題を読み込む
let themes = JSON.parse(localStorage.getItem("themes")) || [];

// defaultThemes にあって、まだ保存データに存在しないものを追加する
defaultThemes.forEach(function (defaultTheme) {

  const existingTheme = themes.find(function (theme) {
    return (
      theme.text === defaultTheme.text &&
      theme.category === defaultTheme.category
    );
  });

  if (existingTheme) {
    // すでにあるお題には小分類を追加・更新
    existingTheme.subcategory = defaultTheme.subcategory;
  } else {
    // まだ存在しないお題は新しく追加
    themes.push(defaultTheme);
  }
});

// 更新された内容を保存
localStorage.setItem("themes", JSON.stringify(themes));

// 最初に一覧表示
displayThemes();
updateCategoryCounts();

// お題追加
addButton.addEventListener("click", function () {
  const theme = themeInput.value.trim();

  if (theme === "") {
    alert("お題を入力してください");
    return;
  }

  if (subcategorySelect.value === "") {
    alert("小分類を選択してください");
    return;
  }

  if (
    subcategorySelect.value === "__new__" &&
    newSubcategoryInput.value.trim() === ""
  ) {
    alert("新しい小分類を入力してください");
    return;
  }

  let subcategory = subcategorySelect.value;

  if (subcategory === "__new__") {
    subcategory = newSubcategoryInput.value.trim();
  }

  themes.push({
    text: theme,
    category: categorySelect.value,
    subcategory: subcategory,
    enabled: true,
    isDefault: false
  });

  localStorage.setItem("themes", JSON.stringify(themes));

  themeInput.value = "";
  subcategorySelect.value = "";

  newSubcategoryInput.value = "";
  newSubcategoryInput.style.display = "none";

  displayThemes();
  updateCategoryCounts();
});

// お題一覧表示
function displayThemes() {
  themeList.innerHTML = "";

  const searchWord = searchInput.value.trim().toLowerCase();

  const filteredThemes = themes.filter(function (theme) {

    const sameCategory = theme.category === currentCategory;

    const matchesSearch =
      theme.text.toLowerCase().includes(searchWord);

    return sameCategory && matchesSearch;
  });

  let displayThemesList = [...filteredThemes];

  if (sortSelect.value === "name") {

    // 50音順
    displayThemesList.sort(function (a, b) {
      return a.text.localeCompare(b.text, "ja");
    });

  } else {

    // defaultThemes に書いてある順番に並べる
    displayThemesList.sort(function (a, b) {

      const indexA = defaultThemes.findIndex(function (defaultTheme) {
        return (
          defaultTheme.text === a.text &&
          defaultTheme.category === a.category
        );
      });

      const indexB = defaultThemes.findIndex(function (defaultTheme) {
        return (
          defaultTheme.text === b.text &&
          defaultTheme.category === b.category
        );
      });

      // 自分で追加したお題などは最後へ
      const orderA = indexA === -1 ? 99999 : indexA;
      const orderB = indexB === -1 ? 99999 : indexB;

      return orderA - orderB;
    });

  }

  let lastSubcategory = "";

  displayThemesList.forEach(function (theme) {

    if (theme.subcategory && theme.subcategory !== lastSubcategory) {
      const subcategoryTitle = document.createElement("li");

      subcategoryTitle.textContent = "【" + theme.subcategory + "】";
      subcategoryTitle.classList.add("subcategory-title");

      themeList.appendChild(subcategoryTitle);

      lastSubcategory = theme.subcategory;
    }

    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = theme.enabled;

    checkbox.addEventListener("change", function () {
      theme.enabled = checkbox.checked;

      localStorage.setItem("themes", JSON.stringify(themes));
    });

    const span = document.createElement("span");
    span.textContent = theme.text;

    li.appendChild(checkbox);
    li.appendChild(span);

    if (theme.isDefault === false) {
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "削除";

      deleteButton.addEventListener("click", function () {
        const index = themes.indexOf(theme);

        themes.splice(index, 1);

        localStorage.setItem("themes", JSON.stringify(themes));

        displayThemes();
      });

      li.appendChild(deleteButton);
    }

    themeList.appendChild(li);
  });
}

categoryTabs.forEach(function (tab) {
  tab.addEventListener("click", function () {

    currentCategory = tab.dataset.category;

    categoryTabs.forEach(function (otherTab) {
      otherTab.classList.remove("active");
    });

    tab.classList.add("active");

    displayThemes();
  });
});

function updateCategoryCounts() {

  categoryTabs.forEach(function (tab) {

    const category = tab.dataset.category;

    const count = themes.filter(function (theme) {
      return theme.category === category;
    }).length;

    let categoryName = "";

    if (category === "fashion") {
      categoryName = "服ジャンル";
    } else if (category === "world") {
      categoryName = "世界観";
    } else if (category === "motif") {
      categoryName = "モチーフ";
    } else if (category === "rule") {
      categoryName = "追加縛り";
    }

    tab.textContent = categoryName + "（" + count + "）";
  });
}

// 現在のカテゴリをすべて選択
selectAllButton.addEventListener("click", function () {

  themes.forEach(function (theme) {
    if (theme.category === currentCategory) {
      theme.enabled = true;
    }
  });

  localStorage.setItem("themes", JSON.stringify(themes));

  displayThemes();
});


// 現在のカテゴリをすべて解除
deselectAllButton.addEventListener("click", function () {

  themes.forEach(function (theme) {
    if (theme.category === currentCategory) {
      theme.enabled = false;
    }
  });

  localStorage.setItem("themes", JSON.stringify(themes));

  displayThemes();
});

sortSelect.addEventListener("change", function () {
  displayThemes();
});

searchInput.addEventListener("input", function () {
  displayThemes();
});

updateSubcategoryOptions();

const firstActiveTab = document.querySelector(
  '.category-tab[data-category="fashion"]'
);

if (firstActiveTab) {
  firstActiveTab.classList.add("active");
}