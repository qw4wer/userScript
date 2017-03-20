// ==UserScript==
// @name 			12306验证码
// @author			qw4wer
// @version			0.0.1
// @description		12306
// @include			/kyfw.12306.cn\/otn\/login\/init/
// @icon			https://kyfw.12306.cn/otn/resources/images/ots/favicon.ico
// @run-at			document-ready
// @grant           GM_xmlhttpRequest
// @grant           GM_openInTab
// @grant           GM_log
// ==/UserScript==

(function () {
    $(".touclick-reload-normal").hide();
    $(".touclick-wrapper").append("<div style='width: 20px;height: 20px;background-color: red;' onclick='window.event? window.event.cancelBubble = true : e.stopPropagation();reload()'>刷新</div>");
    loadJs(reload.toString());
})();


function reload() {
    var ss = $(".touclick-image").attr("src");
    $(".touclick-image").attr("src", ss + "&tt=" + Math.random());
}

function loadJs(jsStr) {
    var oHead = document.getElementsByTagName('HEAD')[0],
        oScript = document.createElement('script');
    oScript.type = 'text/javascript';
    oScript.text = jsStr;
    oHead.appendChild(oScript);
}