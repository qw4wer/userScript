// ==UserScript==
// @name 			百度网页搜索 加速
// @author			qw4wer
// @version			0.0.1
// @description		百度网页搜索 加速 跳过中转页
// @include			/www\.baidu\.com\/((s|baidu)\?|#wd|(index.*)?$)/
// @icon			http://www.baidu.com/favicon.ico
// @run-at			document-ready
// @grant           GM_xmlhttpRequest
// @grant           GM_openInTab
// ==/UserScript==


(function () {
    var regx = "(https?|ftp|file)://[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]";

    $(document).on("click", "#content_left .t a", function (event) {

        var url = "";
        if (url = $(event.target).data('url')) {
            GM_openInTab(url);
        } else {
            GM_xmlhttpRequest({
                method: "get",
                url: event.target.href,
                onload: function (data) {
                    url = data.responseText.match(regx)[0];
                    $(event.target).data({url: url}).css("color", 'black');
                    setTimeout(function () {
                        GM_openInTab(url);
                    }, 1);
                }

            });
        }

        event.preventDefault();
    });

})();


function heredoc(fn) {

    return fn.toString().replace(/^[^\/]+\/\*!?\s?/, '').replace(/\*\/[^\/]+$/, '').trim().replace(/>\s*</g, '><');
}

function loadJs(jsStr) {
    var oHead = document.getElementsByTagName('HEAD')[0],
        oScript = document.createElement('script');
    oScript.type = 'text/javascript';
    oScript.text = jsStr;
    oHead.appendChild(oScript);
}