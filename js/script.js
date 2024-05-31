const Browser_Type = {
  EDGE: "EDGE",
  FIREFOX: "FIREFOX",
  CHROME: "CHROME",
  SAFARI: "SAFARI",
  IE: "IE",
  OTHER: "OTHER",
};

function setScale(fn = () => {}) {
  const isPC = isPcBrowser();
  if (!isPC) {
    return;
  }
  var tid = null;
  var frameWidth = 1300;
  // 调整缩放阈值为1220
  var scaleThreshold = 640;
  var deviceWidth = window.innerWidth;
  let scaleX = deviceWidth / frameWidth;
  let height = "100%";
  scaleX = scaleX.toFixed(3);
  document.documentElement.style = "";
  if (deviceWidth < scaleThreshold) {
    document.documentElement.style.width = frameWidth + "px";
    document.documentElement.style.transform = "scale(" + scaleX + ")";
    document.documentElement.style.height = height;
    document.documentElement.style.transformOrigin = "0 0";
    document.documentElement.style.overflowX = "hidden";
    document.documentElement.style.margin = "0 auto";
    fn();
  }
  // 横竖屏切换后重新计算
  window.addEventListener(
    "resize",
    function () {
      if (tid) {
        clearTimeout(tid);
      } else {
        tid = setTimeout(setScale(fn), 300);
      }
    },
    false
  );
}

function getBrowserType(userAgent) {
  // 缓存浏览器类型，默认为OTHER
  let _browser = Browser_Type.OTHER;
  if (userAgent.match(/edge\/([\d.]+)/)) {
    _browser = Browser_Type.EDGE;
  } else if (userAgent.match(/firefox\/([\d.]+)/)) {
    _browser = Browser_Type.FIREFOX;
  } else if (userAgent.match(/chrome\/([\d.]+)/)) {
    _browser = Browser_Type.CHROME;
  } else if (userAgent.match(/version\/([\d.]+).*safari/)) {
    _browser = Browser_Type.SAFARI;
  } else {
    _browser = Browser_Type.OTHER;
  }
  return _browser;
}

/**
 * 根据传入的url，获取对应参数的query值
 *
 * @param url url链接
 * @param name 需要query的名称
 * @returns 对应query名称的值
 */
function getUrlQueryStr(url, name) {
  let result;
  if (url) {
    result = url.match(new RegExp("[?&]" + name + "=([^&]+)", "i"));
  }
  if (result == null || result.length < 1) {
    return "";
  }
  return decodeURIComponent(result[1]);
}

// 是否是我的偏好页，不支持PC
function isPerferencePage() {
  const targetRoute = getUrlQueryStr(window?.location?.href, "targetRoute");
  const pathname = window?.location?.pathname || "";
  const isActivityPage = pathname.indexOf("/portal/activity/") > -1;

  return isActivityPage && targetRoute === "myPreference";
}

function isBlackList() {
  return isPerferencePage();
}

function isPcBrowser() {
  const userAgent =
    typeof navigator !== "undefined" ? navigator.userAgent.toLowerCase() : "";
  const browser = getBrowserType(userAgent);
  // 浏览器白名单
  const isPcUA = [
    Browser_Type.CHROME,
    Browser_Type.EDGE,
    Browser_Type.SAFARI,
    Browser_Type.FIREFOX,
  ].includes(browser);
  const isWindow = /windows|macintosh/.test(userAgent);
  const isNotIframe = window.self === window.top;
  const isInBlackList = isBlackList();
  const isPC = isWindow && isPcUA && isNotIframe && !isInBlackList;
  return isPC;
}
