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