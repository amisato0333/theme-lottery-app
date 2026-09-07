const drawButton = document.getElementById("drawButton");
const result = document.getElementById("result");
const unlockAllButton = document.getElementById("unlockAllButton");
// カテゴリのチェックボックスを全部取得
const categoryCheckboxes = document.querySelectorAll(".draw-category");

// 保存されているお題を読み込む
let themes = JSON.parse(localStorage.getItem("themes")) || [];

const lockedResults = {};

// お題を引く
drawButton.addEventListener("click", function () {

  // 今回使うカテゴリを取得
  const selectedCategories = [];

  categoryCheckboxes.forEach(function (checkbox) {
    if (checkbox.checked) {
      selectedCategories.push(checkbox.value);
    }
  });

  // 何も選ばれていない場合
  if (selectedCategories.length === 0) {
    result.textContent = "カテゴリを1つ以上選んでね";
    return;
  }

  const results = [];

  // 選択されたカテゴリごとに1つずつ抽選
  selectedCategories.forEach(function (category) {

    // 固定されている場合は再抽選しない
    if (lockedResults[category]) {
      results.push({
        category: category,
        text: lockedResults[category]
      });

      return;
    }

    const drawThemes = themes.filter(function (theme) {
      return theme.category === category && theme.enabled === true;
    });

    if (drawThemes.length > 0) {
      const randomIndex = Math.floor(Math.random() * drawThemes.length);

      results.push({
        category: category,
        text: drawThemes[randomIndex].text
      });
    }
  });

  // 1つも抽選できなかった場合
  if (results.length === 0) {
    result.textContent = "抽選できるお題がありません";
    return;
  }

  result.innerHTML = "";

  result.classList.toggle("four-results", results.length === 4);

  results.forEach(function (item) {

    const card = document.createElement("div");
    card.classList.add("result-card");

    const categoryName = document.createElement("div");
    categoryName.classList.add("result-category");

    if (item.category === "fashion") {
      categoryName.textContent = "服ジャンル";
    } else if (item.category === "world") {
      categoryName.textContent = "世界観";
    } else if (item.category === "motif") {
      categoryName.textContent = "モチーフ";
    } else if (item.category === "rule") {
      categoryName.textContent = "追加縛り";
    }

    const themeText = document.createElement("div");
    themeText.classList.add("result-theme");
    themeText.textContent = item.text;

    const lockButton = document.createElement("button");
    lockButton.classList.add("lock-button");

    if (lockedResults[item.category]) {
      lockButton.textContent = "🔒 固定中";
      card.classList.add("locked");
    } else {
      lockButton.textContent = "🔓 固定する";
    }

    lockButton.addEventListener("click", function () {

      if (lockedResults[item.category]) {

        // 固定解除
        delete lockedResults[item.category];

        lockButton.textContent = "🔓 固定する";
        card.classList.remove("locked");

      } else {

        // 固定
        lockedResults[item.category] = item.text;

        lockButton.textContent = "🔒 固定中";
        card.classList.add("locked");
      }
    });

    card.appendChild(categoryName);
    card.appendChild(themeText);
    card.appendChild(lockButton);

    result.appendChild(card);
  });
});

unlockAllButton.addEventListener("click", function () {

  Object.keys(lockedResults).forEach(function (category) {
    delete lockedResults[category];
  });

  const lockedCards =
    document.querySelectorAll(".result-card.locked");

  lockedCards.forEach(function (card) {
    card.classList.remove("locked");

    const button = card.querySelector(".lock-button");

    if (button) {
      button.textContent = "🔓 固定する";
    }
  });
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {

    navigator.serviceWorker
      .register("./sw.js")
      .then(function () {
        console.log("Service Workerを登録しました");
      })
      .catch(function (error) {
        console.log("Service Workerの登録に失敗しました", error);
      });

  });
}