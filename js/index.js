document.querySelector(".One_page_content_title_center").classList.add("open");
var draggableElement = document.getElementById("draggableElement");
var draggableElementMain = document.getElementById("draggableElementMain");
let originalPosition = { x: 0, y: 0 };
let offsetX, offsetY;
const bgMusic = document.getElementById("bgMusic");
const react_root = document.getElementById("music");
const music_top = document.getElementById("music_img_page_stop");
// 切换音乐播放状态
function toggleMusic() {
  if (bgMusic.paused) {
    playBackgroundMusic();
  } else {
    pauseBackgroundMusic();
  }
}

// 播放音乐
function playBackgroundMusic() {
  bgMusic.play();
  react_root.classList.add("musicRotate");
  music_top.style.display = "none";
}

// 暂停音乐
function pauseBackgroundMusic() {
  bgMusic.pause();
  react_root.classList.remove("musicRotate");
  music_top.style.display = "block";
}
// 跳过
let skip = document.getElementById("skip");
let skips = document.getElementById("skips");
let Skip = document.getElementById("Skip");

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
    draggableElementMain.style.width = "25%";
    draggableElementMain.style.height = "55%";
    bgMusic.play();
    react_root.classList.add("musicRotate");
    music_top.style.display = "none";

    draggableElementMain.querySelector("img").src =
      "./images/slicesTwo/ship.png";
    draggableElementMain.style.transition = "left 2s, top 2s";
    draggableElementMain.style.left = "67%";
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
            img.src = "./images/slicesTwo/ColdTeeth.png";
            const shipTip = document.querySelector(".ship_tip");
            shipTip.style.display = "block";
            // 三秒后更新图片地址
            setTimeout(() => {
              tipOne.style.display = "block";
              // 显示新的图片提示
            }, 1000);
          }, 500);
        }, 3000);
      }, 1000);
    }, 1000);
  } else {
    // 未拖拽到指定位置则回到原始位置
    draggableElement.style.left = originalPosition.x + "px";
    draggableElement.style.top = originalPosition.y + "px";
  }
});

// 第二页显示
var onePage = document.getElementById("one_page");
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
  img.src = "./images/slicesTwo/hide.png";
  ship.src = "./images/slicesTwo/escape.png";
  setTimeout(() => {
    Two_page_content_tip.style.display = "none";
    shipTip.style.display = "none";
    setTimeout(() => {
      // 增加canMove 防止撞冰后鼠标移动事件继续触发
      // let canMove = true;

      // 添加触摸事件监听器
      ships.addEventListener("touchstart", function (event) {
        // 记录触摸开始时的初始位置
        shipX = event.touches[0].clientX - ships.offsetLeft;
        shipY = event.touches[0].clientY - ships.offsetTop;
      });

      ships.addEventListener(
        "touchmove",
        function (event) {
          // 计算船应该移动到的位置
          const x = event.touches[0].clientX - shipX;
          const y = event.touches[0].clientY - shipY;

          // 更新船的位置
          ships.style.left = x + "px";
          ships.style.top = y + "px";

          requestAnimationFrame(checkCollision);
        },
        { passive: true }
      );

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

      function animate() {
        // 检查碰撞并显示失败消息
        if (checkCollision()) {
          failMessage.style.display = "block";
          successMessage.style.display = "none";
          twoPage.style.display = "none";
        }

        // 继续循环
        requestAnimationFrame(animate);
      }

      // 开始动画循环
      animate();

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
        } else if (touchingIce) {
          // 船碰到冰块，显示失败消息
          failMessage.style.display = "block";
          successMessage.style.display = "none";
          twoPage.style.display = "none";
        }
      });
    }, 800);
  }, 800);
});
// 修改，牙在冰的上下左右100px内才算碰上，可修改betweenNum

function betweenNum(num, num1 = -100, num2 = 100) {
  if (num1 < num2) {
    return num > num1 && num < num2;
  } else return num < num1 && num > num2;
}

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
let shake = document.getElementById("shake");
let OpenBag = document.getElementById("OpenBag");
Success_content_two_page.addEventListener("click", function () {
  // 更换图片地址
  light.src = "./images/slicesFour/strip.png";
  prize.src = "./images/slicesFour/87.png";
  OpenBag.style.width = "80%";
  OpenBag.style.height = "80%";
  shake.style.height = "80%";
  Success_content_two_page.src = "./images/slicesFour/congratulations.png";
  yellow.style.display = "block";
  synthesis_progress.style.display = "block";

  synthesis_progress.classList.add("move-up-animation"); // 添加移动到顶部的动画类
  setTimeout(() => {
    Synthesis_progress_page.classList.add("fade-out-animation");
    // 添加背景色逐渐消失的动画类
    // craft.style.display = "block";
    // 修改
    setTimeout(() => {
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
                "./images/slicesSix/PleaseSelect.png";
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
    }, 1800);
  }, 3500);
});
// 失败
const fail_left = document.querySelector("#fail_left");
// const fail_right = document.querySelector("#fail_right");
// 再来一次
fail_left.addEventListener("click", function () {
  // 更换图片地址
  ships.style.left = "0px";
  ships.style.top = "0px";

  twoPage.style.display = "block";
  failMessage.style.display = "none";
});
// 退出游戏
// fail_right.addEventListener("click", function () {
//   location.reload();
// });

// 合成进度
const craft = document.getElementById("craft");
const craft_span = document.getElementById("craft_span");
const Synthetic_toothpaste = document.getElementById("Synthetic_toothpaste");
skip.addEventListener("click", function () {
  successMessage.style.display = "none";
  failMessage.style.display = "none";
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
            "./images/slicesSix/PleaseSelect.png";
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
// 火山成功
const Synthetic_toothpaste_success = document.getElementById(
  "Synthetic_toothpaste_success"
);
// 火山错误
const Synthetic_toothpaste_fail = document.getElementById(
  "Synthetic_toothpaste_fail"
);
const Synthetic_fail_left = document.getElementById("Synthetic_fail_left");
// const Synthetic_fail_right = document.getElementById("Synthetic_fail_right");
Synthetic_fail_left.addEventListener("click", function () {
  Synthetic_toothpaste_fail.style.display = "none";
  Synthetic_toothpaste.style.display = "block";
});
// Synthetic_fail_right.addEventListener("click", function () {
//   location.reload();
// });
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
  lights.src = "./images/slicesSeven/145.png";
  prizes.src = "./images/slicesSeven/PN-SC.png";
  shake.style.height = "80%";
  Synthetic_success_content_img.style.width = "80%";
  Synthetic_success_content_img.style.height = "80%";
  Synthetic_success_content_img.src =
    "./images/slicesSeven/congratulations.png";
  yellows.style.display = "block";
  synthesis_progresss.style.display = "block";

  synthesis_progresss.classList.add("move-up-animation"); // 添加移动到顶部的动画类
  setTimeout(() => {
    Synthesis_progress_pages.classList.add("fade-out-animation");
    // 添加背景色逐渐消失的动画类
    // crafts.style.display = "block";
    setTimeout(() => {
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
                "./images/slicesNine/EatFlowers.png";
              setTimeout(() => {
                Peony_garden_content_one_page.style.display = "none";
                Peony_cake.style.display = "block";
                setTimeout(() => {
                  Peony_tips.style.display = "none";
                  setTimeout(() => {
                    cakes.forEach((cake) => {
                      const duration = Math.random() * 10 + 5; // 随机持续时间（5到15秒）
                      const delay = Math.random() * 5; // 随机延迟时间（0到5秒）

                      cake.style.animationDuration = `${duration}s`;
                      cake.style.animationDelay = `${delay}s`;
                      cake.style.animationDirection = "normal"; // 设置动画方向为从上往下
                      setTimeout(() => {
                        tooth.addEventListener("touchstart", function (event) {
                          // 记录触摸开始时的初始位置
                          toothX = event.touches[0].clientX - tooth.offsetLeft;
                          toothY = event.touches[0].clientY - tooth.offsetTop;
                        });

                        tooth.addEventListener("touchmove", function (event) {
                          // 阻止默认滚动行为
                          event.preventDefault();

                          // 计算船应该移动到的位置
                          const x = event.touches[0].clientX - toothX;
                          const y = event.touches[0].clientY - toothY;

                          // 更新船的位置
                          tooth.style.left = x + "px";
                          tooth.style.top = y + "px";

                          // 获取具有特定类名的元素数量
                          function getNumberOfElementsWithClass(className) {
                            return document.getElementsByClassName(
                              className
                            ).length;
                          }

                          // 调用函数获取Cake-block的数量
                          const numberOfCakeBlocks =
                            getNumberOfElementsWithClass("cake-block");
                          console.log(
                            "Cake-block的数量为：" + numberOfCakeBlocks
                          );
                          if (numberOfCakeBlocks <= 2) {
                            // 成功吃掉三个蛋糕
                            Peony_garden.style.display = "none";
                            Peony_garden_success.style.display = "block";
                            // 重置

                            return; // 结束事件处理程序
                          } else if (isColliding(tooth, specificCake)) {
                            Peony_garden.style.display = "none";
                            Peony_garden_success.style.display = "block";
                            return;
                          }

                          // 检查是否与蛋糕碰撞
                          cakes.forEach((cake) => {
                            if (isColliding(tooth, cake)) {
                              // 如果碰撞，则吃掉蛋糕
                              cake.remove();
                            }
                          });

                          // 检测两个元素是否碰撞
                          function isColliding(element1, element2) {
                            const rect1 = element1.getBoundingClientRect();
                            const rect2 = element2.getBoundingClientRect();
                            return !(
                              rect1.right < rect2.left ||
                              rect1.left > rect2.right ||
                              rect1.bottom < rect2.top ||
                              rect1.top > rect2.bottom
                            );
                          }
                        });
                      }, 1000);
                    });
                  }, 1000);
                }, 1000);
              }, 1000);
            }, 2000);
          }, 2000);
        }, 2000);
      }, 1000);
    }, 2000);
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
const Peony_cake = document.getElementById("Peony_cake");
const Peony_tips = document.getElementById("Peony_tips");
skips.addEventListener("click", function () {
  Synthetic_toothpaste_success.style.display = "none";
  Synthetic_toothpaste_fail.style.display = "none";
  Peony_garden.style.display = "block";
  setTimeout(() => {
    Peony_garden_content_two_page_img.classList.add("move-right");
    setTimeout(() => {
      Peony_garden_content_two_page_tips.style.display = "block";
      setTimeout(() => {
        Peony_garden_content_one_page.style.display = "block";
        setTimeout(() => {
          Peony_garden_content_one_page_img.src =
            "./images/slicesNine/EatFlowers.png";
          setTimeout(() => {
            Peony_garden_content_one_page_img.src =
              "./images/slicesNine/Don'teat.png";
            setTimeout(() => {
              Peony_garden_content_one_page_img.src =
                "./images/slicesNine/ReceivingFlowers.png";
              setTimeout(() => {
                Peony_garden_content_one_page.style.display = "none";
                Peony_cake.style.display = "block";
                setTimeout(() => {
                  Peony_tips.style.display = "none";
                  setTimeout(() => {
                    cakes.forEach((cake) => {
                      const duration = Math.random() * 10 + 5; // 随机持续时间（5到15秒）
                      const delay = Math.random() * 5; // 随机延迟时间（0到5秒）

                      cake.style.animationDuration = `${duration}s`;
                      cake.style.animationDelay = `${delay}s`;
                      cake.style.animationDirection = "normal"; // 设置动画方向为从上往下
                      setTimeout(() => {
                        tooth.addEventListener("touchstart", function (event) {
                          // 记录触摸开始时的初始位置
                          toothX = event.touches[0].clientX - tooth.offsetLeft;
                          toothY = event.touches[0].clientY - tooth.offsetTop;
                        });

                        tooth.addEventListener("touchmove", function (event) {
                          // 阻止默认滚动行为
                          event.preventDefault();

                          // 计算船应该移动到的位置
                          const x = event.touches[0].clientX - toothX;
                          const y = event.touches[0].clientY - toothY;

                          // 更新船的位置
                          tooth.style.left = x + "px";
                          tooth.style.top = y + "px";

                          // 获取具有特定类名的元素数量
                          function getNumberOfElementsWithClass(className) {
                            return document.getElementsByClassName(
                              className
                            ).length;
                          }

                          // 调用函数获取Cake-block的数量
                          const numberOfCakeBlocks =
                            getNumberOfElementsWithClass("cake-block");
                          console.log(
                            "Cake-block的数量为：" + numberOfCakeBlocks
                          );
                          if (numberOfCakeBlocks <= 2) {
                            // 成功吃掉三个蛋糕
                            Peony_garden.style.display = "none";
                            Peony_garden_fail.style.display = "block";
                            // 重置

                            return; // 结束事件处理程序
                          } else if (isColliding(tooth, specificCake)) {
                            Peony_garden.style.display = "none";
                            Peony_garden_success.style.display = "block";
                            return;
                          }

                          // 检查是否与蛋糕碰撞
                          cakes.forEach((cake) => {
                            if (isColliding(tooth, cake)) {
                              // 如果碰撞，则吃掉蛋糕
                              cake.remove();
                            }
                          });

                          // 检测两个元素是否碰撞
                          function isColliding(element1, element2) {
                            const rect1 = element1.getBoundingClientRect();
                            const rect2 = element2.getBoundingClientRect();
                            return !(
                              rect1.right < rect2.left ||
                              rect1.left > rect2.right ||
                              rect1.bottom < rect2.top ||
                              rect1.top > rect2.bottom
                            );
                          }
                        });
                      });
                    });
                  }, 1000);
                }, 1000);
              }, 1000);
            }, 2000);
          }, 2000);
        }, 2000);
      }, 2000);
    }, 2000);
  }, 1000);
});

// 移动牙牙
const cakes = document.querySelectorAll(
  ".Peony_cake_page_img_one, .Peony_cake_page_img_two, .Peony_cake_page_img_three, .Peony_cake_page_img_four"
);

const tooth = document.getElementById("tooth");
const specificCake = document.getElementById("Peony_cake_page_img_two");
let toothX = 0; // 获取横轴
let toothY = 0; // 获取纵轴

//牡丹花成功
const Peony_garden_success = document.getElementById("Peony_garden_success");
// 牡丹花失败
const Peony_garden_fail = document.getElementById("Peony_garden_fail");
const Synthetic_toothpaste_fail_left = document.getElementById(
  "Synthetic_fail_lefts"
);
function getNumberOfCakeElements() {
  const cakeElements = document.querySelectorAll(".cake-block");
  return cakeElements.length;
}
const initialCakeCount = 1; // 定义页面初始蛋糕数量为3个
let currentCakeCount = getNumberOfCakeElements();
const peonyCakePage = document.querySelector(".Peony_cake_page");
Synthetic_toothpaste_fail_left.addEventListener("click", function () {
  Peony_garden_fail.style.display = "none";
  Peony_garden.style.display = "block";
  tooth.style.left = "initial";
  tooth.style.top = "initial";
  specificCake.style.left = "initial";
  specificCake.style.top = "initial";

  function isColliding(element1, element2) {
    const rect1 = element1.getBoundingClientRect();
    const rect2 = element2.getBoundingClientRect();
    return !(
      rect1.right < rect2.left ||
      rect1.left > rect2.right ||
      rect1.bottom < rect2.top ||
      rect1.top > rect2.bottom
    );
  }

  currentCakeCount = getNumberOfCakeElements(); // 更新当前蛋糕数量
  if (currentCakeCount < initialCakeCount) {
    const cakesToAdd = initialCakeCount - currentCakeCount;
    for (let i = 0; i < cakesToAdd; i++) {
      const cakeOne = document.createElement("div");
      cakeOne.classList.add("Peony_cake_page_img_one", "Cake-block");
      const imgOne = document.createElement("img");
      imgOne.src = "./images/slicesNine/cooky.png";
      imgOne.alt = "";
      imgOne.classList.add("cake-block");
      cakeOne.appendChild(imgOne);
      peonyCakePage.appendChild(cakeOne);

      const cakeThree = document.createElement("div");
      cakeThree.classList.add("Peony_cake_page_img_three", "Cake-block");
      const imgThree = document.createElement("img");
      imgThree.src = "./images/slicesNine/Mediumcake.png";
      imgThree.alt = "";
      imgThree.classList.add("cake-block");
      cakeThree.appendChild(imgThree);
      peonyCakePage.appendChild(cakeThree);

      const cakeFour = document.createElement("div");
      cakeFour.classList.add("Peony_cake_page_img_four", "Cake-block");
      const imgFour = document.createElement("img");
      imgFour.src = "./images/slicesNine/flatbread.png";
      imgFour.alt = "";
      imgFour.classList.add("cake-block");
      cakeFour.appendChild(imgFour);
      peonyCakePage.appendChild(cakeFour);
      setTimeout(() => {
        const cakeFive = document.querySelectorAll(".Peony_cake_page div");
        cakeFive.forEach((cake) => {
          const duration = Math.random() * 10 + 5; // 随机持续时间（5到15秒）
          const delay = Math.random() * 5; // 随机延迟时间（0到5秒）
          cake.style.animationDuration = `${duration}s`;
          cake.style.animationDelay = `${delay}s`;
          cake.style.animationDirection = "normal"; // 设置动画方向为从上往下
        });
        cakes.forEach((cake) => {
          if (isColliding(tooth, cake)) {
            cake.remove();
          }
        });
      }, 1000);
    }
  }
});
// const Synthetic_toothpaste_fail_right = document.getElementById(
//   "Synthetic_fail_rights"
// );
// Synthetic_toothpaste_fail_right.addEventListener("click", function () {
//   location.reload();
// });

// 选择
const Lights = document.querySelector("#lights img");
const Prizes = document.querySelector("#prizes  img");
const Crafts = document.getElementById("Crafts");
const Peony_garden_success_img = document.getElementById(
  "Peony_garden_success_img"
);
const Peony_garden_success_progresss = document.getElementById(
  "Peony_garden_success_progresss"
);
const Peony_garden_progress_pages = document.getElementById(
  "Peony_garden_progress_pages"
);
const yellows_three = document.getElementById("yellowss");
Peony_garden_success_img.addEventListener("click", function () {
  // 更换图片地址
  Lights.src = "./images/slicesTen/157.png";
  Prizes.src = "./images/slicesTen/Withdraw.png";
  shake.style.height = "80%";

  Peony_garden_success_img.style.width = "80%";
  Peony_garden_success_img.style.height = "80%";
  Peony_garden_success_img.src = "./images/slicesTen/congratulations.png";
  yellows_three.style.display = "block";
  Peony_garden_success_progresss.style.display = "block";

  Peony_garden_success_progresss.classList.add("move-up-animation"); // 添加移动到顶部的动画类
  setTimeout(() => {
    Peony_garden_progress_pages.classList.add("fade-out-animation");
    // 添加背景色逐渐消失的动画类
    // Crafts.style.display = "block";
    setTimeout(() => {
      Toothpaste_Synthesis.style.display = "block";
      Peony_garden_success.style.display = "none";
      setTimeout(() => {
        Toothpaste_Synthesis_one.classList.add("scaleEffect");
        setTimeout(() => {
          Toothpaste_Synthesis_content_one_tips.style.display = "block";
          setTimeout(() => {
            Toothpaste_Synthesis_content_one_tips.src =
              "./images/slinesTwelve/3.png";
            setTimeout(() => {
              Toothpaste_Synthesis_content_two_page.style.display = "block";
              setTimeout(() => {
                Toothpaste_Synthesis_content_two_page.src =
                  "./images/slinesTwelve/5.png";
                Toothpaste_Synthesis_content_two_page.addEventListener(
                  "click",
                  () => {
                    Toothpaste_Synthesis_content_two.style.display = "none";
                    Toothpaste_Synthesis_content_three.style.display = "block";
                    Composite_button.addEventListener("click", () => {
                      Toothpaste_Synthesis_content_three_page_Around_page_img.classList.add(
                        "Toothpaste_Synthesis_content_three_page_Around_page_img"
                      );
                      setTimeout(() => {
                        Background_light.style.display = "block";
                        Toothpaste_Synthesis_yellow_white.src =
                          "./images/slinesTwelve/7.1.png";
                        Toothpaste_middle.src = "./images/slinesTwelve/7.3.png";
                        Toothpaste.style.width = "35%";
                        Toothpaste.style.height = "75%";
                        Toothpaste.style.zIndex = "2";
                        Composite_button.style.display = "none";
                        Toothpaste_Synthesis_content_two.style.zIndex = "9";
                        Toothpaste_Synthesis_content_two.style.position =
                          "absolute";
                        setTimeout(() => {
                          Toothpaste_Synthesis_content_two.style.display =
                            "block";
                          Toothpaste_Synthesis_content_two_page.src =
                            "./images/slinesTwelve/8.2.png";
                          setTimeout(() => {
                            Toothpaste_Synthesis_content_two.style.display =
                              "none";
                            setTimeout(() => {
                              Toothpaste.addEventListener(
                                "touchstart",
                                function (event) {
                                  // 记录触摸开始时的初始位置
                                  ToothpasteX =
                                    event.touches[0].clientX -
                                    Toothpaste.offsetLeft;
                                  ToothpasteY =
                                    event.touches[0].clientY -
                                    Toothpaste.offsetTop;
                                }
                              );
                              Toothpaste.addEventListener(
                                "touchmove",
                                function (event) {
                                  // 阻止默认滚动行为
                                  event.preventDefault();

                                  // 计算船应该移动到的位置
                                  const x =
                                    event.touches[0].clientX - ToothpasteX;
                                  const y =
                                    event.touches[0].clientY - ToothpasteY;

                                  // 更新船的位置
                                  Toothpaste.style.left = x + "px";
                                  Toothpaste.style.top = y + "px";

                                  // 检测是否碰到了障碍物
                                  if (
                                    isCollide(
                                      Toothpaste,
                                      Toothpaste_Synthesis_one
                                    )
                                  ) {
                                    var quit = document.getElementById("quit");
                                    Toothpaste_Synthesis.classList.add(
                                      "page-transition"
                                    );

                                    // 模拟页面切换
                                    setTimeout(function () {
                                      Toothpaste_Synthesis.style.display =
                                        "none";
                                      quit.style.display = "block";
                                    }, 1000);
                                  }
                                  if (
                                    isCollide(
                                      Toothpaste,
                                      Toothpaste_Synthesis_yellow_white
                                    )
                                  ) {
                                    Toothpaste_Synthesis_yellow_white.style.display =
                                      "none";
                                    Background_light.style.display = "none";
                                  }
                                  function isCollide(element1, element2) {
                                    const rect1 =
                                      element1.getBoundingClientRect();
                                    const rect2 =
                                      element2.getBoundingClientRect();

                                    return !(
                                      rect1.right < rect2.left ||
                                      rect1.left > rect2.right ||
                                      rect1.bottom < rect2.top ||
                                      rect1.top > rect2.bottom
                                    );
                                  }
                                }
                              );
                            }, 4000);
                          }, 2500);
                        }, 300);
                      }, 1500);
                    });
                  }
                );
              }, 1500);
            }, 1500);
          }, 1600);
        }, 3000);
      }, 1000);
    }, 2000);
  }, 3500);
});

// 关闭打开合成牙膏
const Toothpaste_Synthesis = document.getElementById("Toothpaste_Synthesis");
// 牙膏合成进度100%
const Toothpaste_Synthesis_one = document.getElementById(
  "Toothpaste_Synthesis_content_one_page"
);
const health = document.getElementById("health");
const Toothpaste_Synthesis_content_one_tips = document.getElementById(
  "Toothpaste_Synthesis_content_one_tips"
);
const Toothpaste_Synthesis_content_two_page = document.getElementById(
  "Toothpaste_Synthesis_content_two_page"
);
const Toothpaste_Synthesis_content_three = document.getElementById(
  "Toothpaste_Synthesis_content_three"
);
var Toothpaste_Synthesis_content_two = document.getElementById(
  "Toothpaste_Synthesis_content_two"
);
const Toothpaste_Synthesis_content_three_page_Around_page =
  document.querySelectorAll(
    ".Toothpaste_Synthesis_content_three_page_Around_page img"
  );
const Toothpaste_Synthesis_content_three_page_Around_page_img =
  document.getElementById(
    "Toothpaste_Synthesis_content_three_page_Around_page"
  );
const Toothpaste_middle = document.getElementById(
  "Toothpaste_Synthesis_content_three_page_middle"
);
const Composite_button = document.getElementById("Composite_button");
const Toothpaste = document.getElementById("Toothpaste");
const Toothpaste_Synthesis_yellow_white = document.getElementById(
  "Toothpaste_Synthesis_yellow_white"
);
const Background_light = document.getElementById("Background_light");
let ToothpasteX, ToothpasteY;
var quit_page_content_three = document.getElementById(
  "quit_page_content_three"
);
quit_page_content_three.addEventListener("click", function () {
  location.reload();
});
