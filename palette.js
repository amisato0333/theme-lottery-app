const paletteButton = document.getElementById("paletteButton");
const paletteType = document.getElementById("paletteType");
const colorPreviews = document.querySelectorAll(".color-preview");
const colorCodes = document.querySelectorAll(".palette-color span");
const paletteLockButtons = document.querySelectorAll(".palette-lock-button");

// 5色それぞれの固定状態
const lockedColors = [false, false, false, false, false];


// ランダムな整数を作る
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


// HSLをHEXカラーコードに変換
function hslToHex(h, s, l) {

    s /= 100;
    l /= 100;

    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs((h / 60) % 2 - 1));
    const m = l - c / 2;

    let r = 0;
    let g = 0;
    let b = 0;

    if (h < 60) {
        r = c;
        g = x;
    } else if (h < 120) {
        r = x;
        g = c;
    } else if (h < 180) {
        g = c;
        b = x;
    } else if (h < 240) {
        g = x;
        b = c;
    } else if (h < 300) {
        r = x;
        b = c;
    } else {
        r = c;
        b = x;
    }

    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);

    return "#" +
        r.toString(16).padStart(2, "0") +
        g.toString(16).padStart(2, "0") +
        b.toString(16).padStart(2, "0");
}

// パレットを作る
paletteButton.addEventListener("click", function () {

    const type = paletteType.value;

    // 配色系で使う基準色
    const baseHue = randomNumber(0, 359);

    for (let i = 0; i < 5; i++) {

        // 固定されている色は引き直さない
        if (lockedColors[i]) {
            continue;
        }

        let hue;
        let saturation;
        let lightness;


        // 完全ランダム
        if (type === "random") {

            hue = randomNumber(0, 359);
            saturation = randomNumber(40, 90);
            lightness = randomNumber(35, 80);

        }


        // パステル
        else if (type === "pastel") {

            hue = randomNumber(0, 359);
            saturation = randomNumber(45, 70);
            lightness = randomNumber(75, 88);

        }


        // ビビッド
        else if (type === "vivid") {

            hue = randomNumber(0, 359);
            saturation = randomNumber(80, 100);
            lightness = randomNumber(45, 60);

        }


        // ダーク
        else if (type === "dark") {

            hue = randomNumber(0, 359);
            saturation = randomNumber(35, 75);
            lightness = randomNumber(15, 35);

        }


        // くすみカラー
        else if (type === "muted") {

            hue = randomNumber(0, 359);
            saturation = randomNumber(20, 45);
            lightness = randomNumber(45, 70);

        }


        // 類似色
        else if (type === "analogous") {

            const offsets = [-40, -20, 0, 20, 40];

            hue = (baseHue + offsets[i] + 360) % 360;
            saturation = randomNumber(50, 75);
            lightness = randomNumber(45, 70);

        }


        // 補色
        else if (type === "complementary") {

            const offsets = [0, 15, 180, 195, 210];

            hue = (baseHue + offsets[i]) % 360;
            saturation = randomNumber(55, 80);
            lightness = randomNumber(45, 70);

        }


        // トライアド
        else if (type === "triadic") {

            const offsets = [0, 120, 240, 120, 0];

            hue = (baseHue + offsets[i]) % 360;

            saturation = randomNumber(50, 80);

            // 同じ色相でも明るさを変えて5色にする
            if (i === 3 || i === 4) {
                lightness = randomNumber(65, 80);
            } else {
                lightness = randomNumber(40, 60);
            }

        }


        const color = hslToHex(
            hue,
            saturation,
            lightness
        );

        colorPreviews[i].style.backgroundColor = color;
        colorCodes[i].textContent = color.toUpperCase();

    }

});

// カラーコードをクリックしてコピー
colorCodes.forEach(function (code) {

    code.style.cursor = "pointer";

    code.addEventListener("click", function () {

        const color = code.textContent;

        // まだ色が生成されていない場合は何もしない
        if (color === "#------") {
            return;
        }

        navigator.clipboard.writeText(color).then(function () {

            const originalText = color;

            code.textContent = "コピーしました！";

            setTimeout(function () {
                code.textContent = originalText;
            }, 1000);

        });

    });

});

// 色を固定・固定解除
paletteLockButtons.forEach(function (button, index) {

    button.addEventListener("click", function () {

        // まだ色を生成していない場合は固定しない
        if (colorCodes[index].textContent === "#------") {
            return;
        }

        lockedColors[index] = !lockedColors[index];

        if (lockedColors[index]) {
            button.textContent = "🔒";
            button.classList.add("locked");
            colorPreviews[index].classList.add("locked");
        } else {
            button.textContent = "🔓";
            button.classList.remove("locked");
            colorPreviews[index].classList.remove("locked");
        }

    });

});