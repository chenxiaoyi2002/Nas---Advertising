document.querySelector(".One_page_content_title_center").classList.add("open");
const draggableElement = document.getElementById("draggableElement");
const draggableElementMain = document.getElementById("draggableElementMain");
let originalPosition = { x: 0, y: 0 };
let offsetX, offsetY;
let isDragging = false;

// 记录初始位置
originalPosition.x = draggableElement.offsetLeft;
originalPosition.y = draggableElement.offsetTop;

// 监听触摸开始事件
draggableElement.addEventListener("touchstart", (e) => {
  const touch = e.touches[0];
  offsetX = touch.clientX - draggableElement.offsetLeft;
  offsetY = touch.clientY - draggableElement.offsetTop;
  isDragging = true;
});

// 监听触摸移动事件
draggableElement.addEventListener("touchmove", (e) => {
  if (isDragging) {
    e.preventDefault();
    const touch = e.touches[0];
    draggableElement.style.left = touch.clientX - offsetX + "px";
    draggableElement.style.top = touch.clientY - offsetY + "px";
  }
});

// 监听触摸结束事件
draggableElement.addEventListener("touchend", () => {
  isDragging = false;

  const draggableRect = draggableElement.getBoundingClientRect();
  const mainRect = draggableElementMain.getBoundingClientRect();

  if (
    draggableRect.left < mainRect.right &&
    draggableRect.right > mainRect.left &&
    draggableRect.top < mainRect.bottom &&
    draggableRect.bottom > mainRect.top
  ) {
    // 拖拽到指定位置的处理逻辑
    draggableElement.style.display = "none";
    draggableElementMain.querySelector("img").src = "./images/slicesTwo/船.png";
    draggableElementMain.style.transition = "left 2s, top 2s";
    draggableElementMain.style.left = "60%";
    setTimeout(() => {
      draggableElementMain.style.top = "-100%";
      draggableElementMain.style.left = "30%"; // 向右移动到 80%
      draggableElementMain.style.animation = "shrinkAndFadeOut 5s forwards";
      draggableElementMain.style.animationTimingFunction = "ease-out";
      setTimeout(() => {
        onePage.classList.add("hidden");

        // 五秒后隐藏 one_page
        setTimeout(() => {
          onePage.style.display = "none";
          twoPage.style.display = "block"; // 显示 id="two_page"
          // 两秒后显示 tipOne
          setTimeout(() => {
            const img = document.querySelector(".ship img");
            img.src = "./images/slicesTwo/冷牙巴.png";
            const shipTip = document.querySelector(".ship_tip");
            shipTip.style.display = "block";
            // 三秒后更新图片地址
            setTimeout(() => {
              tipOne.style.display = "block";
              // 显示新的图片提示
            }, 1000);
          }, 500);
        }, 5000);
      }, 1000);
    }, 1000);
  } else {
    // 未拖拽到指定位置则回到原始位置
    draggableElement.style.left = originalPosition.x + "px";
    draggableElement.style.top = originalPosition.y + "px";
  }
});

// 第二页显示
const onePage = document.getElementById("one_page");
const twoPage = document.getElementById("two_page");
const tipOne = document.getElementById("tipOne");
// 图片替换

const img = document.querySelector("#tipOne img");
const ship = document.querySelector("#ship img");
const shipTip = document.querySelector(".ship_tip");
const Two_page_content_tip = document.querySelector("#Two_page_content_tip");
// 添加点击事件监听器
// 移动躲避冰块
// 获取船元素
const ships = document.getElementById("ship");
// 获取成功和失败提示元素
const successMessage = document.getElementById("success");
const failMessage = document.getElementById("fail");

let shipX = 0; //获取横轴
let shipY = 0; //获取纵轴

ship.addEventListener("click", function () {
  // 更换图片地址
  img.src = "./images/slicesTwo/躲.png";
  ship.src = "./images/slicesTwo/逃.png";
  setTimeout(() => {
    Two_page_content_tip.style.display = "none";
    shipTip.style.display = "none";
    setTimeout(() => {
      // 添加触摸事件监听器
      ships.addEventListener("touchstart", function (event) {
        // 记录触摸开始时的初始位置
        shipX = event.touches[0].clientX - ships.offsetLeft;
        shipY = event.touches[0].clientY - ships.offsetTop;
      });

      ships.addEventListener("touchmove", function (event) {
        // 阻止默认滚动行为
        event.preventDefault();

        // 计算船应该移动到的位置
        const x = event.touches[0].clientX - shipX;
        const y = event.touches[0].clientY - shipY;

        // 更新船的位置
        ships.style.left = x + "px";
        ships.style.top = y + "px";
      });

      ships.addEventListener("touchend", function () {
        // 检查船是否达到 Two_page_content_title 元素位置
        const shipRect = ships.getBoundingClientRect();
        const titlePosition = document
          .querySelector("#Two_page_content_title")
          .getBoundingClientRect();
        const touchingIce = checkCollision(); // 检查是否碰到冰块

        if (
          shipRect.left < titlePosition.right &&
          shipRect.right > titlePosition.left &&
          shipRect.top < titlePosition.bottom &&
          shipRect.bottom > titlePosition.top
        ) {
          // 船移动到指定位置，显示成功消息
          successMessage.style.display = "block";
          failMessage.style.display = "none";
          twoPage.style.display = "none";
        } else if (!touchingIce) {
          // 船既没有到达指定位置，也没有碰到冰块，返回原位置
          ships.style.left = "0px";
          ships.style.top = "0px";
          successMessage.style.display = "none";
          failMessage.style.display = "none";
        } else {
          // 船碰到冰块，显示失败消息
          failMessage.style.display = "block";
          successMessage.style.display = "none";
          twoPage.style.display = "none";
        }
      });
      // 隐藏成功和失败提示元素初始状态
      successMessage.style.display = "none";
      failMessage.style.display = "none";

      function checkCollision() {
        const ice = document.querySelectorAll(".ice");
        const shipsRect = ships.getBoundingClientRect();

        for (let iceBlock of ice) {
          const iceRect = iceBlock.getBoundingClientRect();

          if (
            shipsRect.left < iceRect.right &&
            shipsRect.right > iceRect.left &&
            shipsRect.top < iceRect.bottom &&
            shipsRect.bottom > iceRect.top
          ) {
            return true; // 碰撞发生
          }
        }

        return false; // 未发生碰撞
      }
    }, 1000);
  }, 1000);
});

// 获取所有的冰块元素
const iceBlocks = document.querySelectorAll(".ice-block");

// 为每个冰块设置随机的动画持续时间、延迟时间和滚动方向
iceBlocks.forEach((iceBlock) => {
  const duration = Math.random() * 10 + 5; // 随机持续时间（5到15秒）
  const delay = Math.random() * 5; // 随机延迟时间（0到5秒）
  const direction = Math.random() < 0.5 ? -1 : 1; // 随机方向：-1表示向左，1表示向右
  iceBlock.style.animationDuration = `${duration}s`;
  iceBlock.style.animationDelay = `${delay}s`;
  iceBlock.style.animationDirection = direction > 0 ? "normal" : "reverse"; // 根据方向设置动画方向
});

// 成功
const light = document.querySelector(".Success_content_one_page_light img");
const prize = document.querySelector(".Success_content_one_page_prize  img");
const Success_content_two_page = document.querySelector(
  ".Success_content_two_page img"
);
const yellow = document.getElementById("yellow");
const synthesis_progress = document.getElementById("synthesis_progress");
const Synthesis_progress_page = document.getElementById(
  "synthesis_progress_page"
);
Success_content_two_page.addEventListener("click", function () {
  // 更换图片地址
  light.src = "./images/slicesFour/条状背景光.png";
  prize.src = "./images/slicesFour/-h-图层 87.png";
  Success_content_two_page.src = "./images/slicesFour/-h-恭喜获得.png";
  yellow.style.display = "block";
  synthesis_progress.style.display = "block";

  synthesis_progress.classList.add("move-up-animation"); // 添加移动到顶部的动画类
  setTimeout(() => {
    Synthesis_progress_page.classList.add("fade-out-animation");
    // 添加背景色逐渐消失的动画类
    craft.style.display = "block";
  }, 3500);
});
// 失败
const fail_left = document.querySelector("#fail_left");
const fail_right = document.querySelector("#fail_right");
// 再来一次
fail_left.addEventListener("click", function () {
  // 更换图片地址
  ships.style.left = "0px";
  ships.style.top = "0px";

  twoPage.style.display = "block";
  failMessage.style.display = "none";
});
// 退出游戏
fail_right.addEventListener("click", function () {
  window.close();
});

// 合成进度
const craft = document.getElementById("craft");
const craft_span = document.getElementById("craft_span");
const Synthetic_toothpaste = document.getElementById("Synthetic_toothpaste");
craft_span.addEventListener("click", function () {
  successMessage.style.display = "none";
  Synthetic_toothpaste.style.display = "block";
  setTimeout(() => {
    // 触发向左移动
    element.classList.add("move-left");

    setTimeout(() => {
      Synthetic_toothpaste_content_three_Tips.classList.add("show");
      setTimeout(() => {
        Synthetic_toothpaste_content_one_page.style.display = "block";
        setInterval(() => {
          Synthetic_toothpaste_content_one_page_img.src =
            "./images/slicesSix/请选择正确的选项 通过森林.png";
          setTimeout(() => {
            Synthetic_toothpaste_content_one.style.display = "none";
            setTimeout(() => {
              Synthetic_toothpaste_content_two.style.display = "block";
            }, 1000);
          }, 1000);
        }, 2000);
      }, 2000);
    }, 2000);
  }, 1000);
});

// 火山
const Synthetic_toothpaste_content_one = document.getElementById(
  "Synthetic_toothpaste_content_one"
);
const Synthetic_toothpaste_content_two = document.getElementById(
  "Synthetic_toothpaste_content_two"
);
const element = document.getElementById(
  "Synthetic_toothpaste_content_three_page"
);
const Synthetic_toothpaste_content_three_Tips = document.getElementById(
  "Synthetic_toothpaste_content_three_Tips"
);
const Synthetic_toothpaste_content_one_page = document.getElementById(
  "Synthetic_toothpaste_content_one_page"
);
const Synthetic_toothpaste_content_one_page_img = document.querySelector(
  "#Synthetic_toothpaste_content_one_page img"
);
// 选择答案
const Select_A = document.getElementById("Select_A");
const Select_B = document.getElementById("Select_B");
const Select_C = document.getElementById("Select_C");
// 火车成功
const Synthetic_toothpaste_success = document.getElementById(
  "Synthetic_toothpaste_success"
);
// 火山错误
const Synthetic_toothpaste_fail = document.getElementById(
  "Synthetic_toothpaste_fail"
);
const Synthetic_fail_left = document.getElementById("Synthetic_fail_left");
const Synthetic_fail_right = document.getElementById("Synthetic_fail_right");
Synthetic_fail_left.addEventListener("click", function () {
  Synthetic_toothpaste_fail.style.display = "none";
  Synthetic_toothpaste.style.display = "block";
});
Synthetic_fail_right.addEventListener("click", function () {
  window.close();
});
Select_A.addEventListener("click", () => {
  Synthetic_toothpaste.style.display = "none";
  Synthetic_toothpaste_success.style.display = "block";
});
Select_B.addEventListener("click", () => {
  Synthetic_toothpaste.style.display = "none";
  Synthetic_toothpaste_fail.style.display = "block";
});
Select_C.addEventListener("click", () => {
  Synthetic_toothpaste.style.display = "none";
  Synthetic_toothpaste_fail.style.display = "block";
});
const Synthetic_success_content_img = document.getElementById(
  "Synthetic_success_content_img"
);
const lights = document.querySelector("#light img");
const prizes = document.querySelector("#prize  img");
const yellows = document.getElementById("yellows");
const synthesis_progresss = document.getElementById("synthesis_progresss");
const Synthesis_progress_pages = document.getElementById(
  "synthesis_progress_pages"
);
const crafts = document.getElementById("crafts");

Synthetic_success_content_img.addEventListener("click", function () {
  // 更换图片地址
  lights.src = "./images/slicesSeven/图层 145.png";
  prizes.src = "./images/slicesSeven/PN-SC抗敏因子.png";
  Synthetic_success_content_img.src = "./images/slicesSeven/恭喜获得.png";
  yellows.style.display = "block";
  synthesis_progresss.style.display = "block";

  synthesis_progresss.classList.add("move-up-animation"); // 添加移动到顶部的动画类
  setTimeout(() => {
    Synthesis_progress_pages.classList.add("fade-out-animation");
    // 添加背景色逐渐消失的动画类
    crafts.style.display = "block";
  }, 3500);
});
// 第三页
const craft_spans = document.querySelector(".craft_span");
const Peony_garden = document.getElementById("Peony_garden");
const Peony_garden_content_two_page_img = document.getElementById(
  "Peony_garden_content_two_page_img"
);
const Peony_garden_content_two_page_img_tooth = document.getElementById(
  "Peony_garden_content_two_page_img_tooth"
);
const Peony_garden_content_two_page_tips = document.getElementById(
  "Peony_garden_content_two_page_tips"
);
const Peony_garden_content_one_page = document.getElementById(
  "Peony_garden_content_one_page"
);
const Peony_garden_content_one_page_img = document.querySelector(
  ".Peony_garden_content_one_page_img"
);
craft_spans.addEventListener("click", function () {
  Synthetic_toothpaste_success.style.display = "none";
  Peony_garden.style.display = "block";
  setTimeout(() => {
    Peony_garden_content_two_page_img.classList.add("move-right");
    setTimeout(() => {
      Peony_garden_content_two_page_tips.style.display = "block";
      setTimeout(() => {
        Peony_garden_content_one_page.style.display = "block";
        setTimeout(() => {
          Peony_garden_content_one_page_img.src =
            "./images/slicesNine/拖动牙牙食用牡丹花饼.png";
          setTimeout(() => {
            Peony_garden_content_one_page_img.src =
              "./images/slicesNine/切记不可过多食用哟.png";
            setTimeout(() => {
              Peony_garden_content_one_page_img.src =
                "./images/slicesNine/如有牡丹花掉落拾取 会有意想不到的收获哦.png";
              setTimeout(() => {}, 2000);
            }, 1500);
          }, 1500);
        }, 1500);
      }, 1000);
    }, 1000);
  }, 1000);
});
