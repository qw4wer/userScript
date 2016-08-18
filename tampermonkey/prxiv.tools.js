// ==UserScript==
// @name 			p站用户工具
// @author			qw4wer
// @version			0.0.1
// @description		p站用户工具、各种杂七杂八的功能
// @include			/www\.pixiv\.net/(ranking_area|member_illust|ranking)/
// @icon			http://www.pixiv.net/favicon.ico
// @run-at			document-ready
// @namespace https://greasyfork.org/users/28141
// ==/UserScript==


var html = {
    script: {
        ranking_area: heredoc(function () {

        }),


    }

};


(function () {

    var href = location.href;

    if (href.indexOf("ranking_area") !== -1) {
        initRankingArea();
    } else if (href.indexOf("member_illust") !== -1) {


    } else if (href.indexOf("ranking") !== -1) {
        initRanking();
    }

})();

function initRanking() {

    var html = heredoc(function () {
        /*<div id="original_image" style="display: none; position: absolute; z-index: 1; left: 155px; top: 164px;"></div>*/
    });

    $(document.body).append(html);

    var timer = undefined;

    $(".ranking-items ._layout-thumbnail").mouseenter(function (event) {
        timer = setTimeout(function () {
            debugger;
            var img = $("<img>").attr("src", $("img", event.target).attr("src").replace("240x480", "600x600"));
            $("#original_image").empty().append(img).css({
                left: event.pageX,
                top: event.pageY
            }).show().mouseleave(function (event) {
                $("#original_image").empty().hide();
            });
        }, 500);
    }).mouseleave(function (event) {
        //$("#original_image").empty().hide();
        clearTimeout(timer);
    });


}
function initRankingArea() {
    var html = heredoc(function () {
        /*<div id="original_image" style="display: none; position: absolute; z-index: 1; left: 155px; top: 164px;"></div>*/
    });

    $(document.body).append(html);

    var timer = undefined;

    $(".layout-body ._layout-thumbnail").mouseenter(function (event) {


        timer = setTimeout(function () {
            var img = $("<img>").attr("src", $("img", event.target).attr("src").replace("150x150", "600x600"));
            $("#original_image").empty().append(img).css({
                left: event.pageX,
                top: event.pageY
            }).show().mouseleave(function (event) {
                $("#original_image").empty().hide();
            });
        }, 500);

    }).mouseleave(function (event) {
        //$("#original_image").empty().hide();
        clearTimeout(timer);
    });
}


//tools

function loadScript(src) {
    var oHead = document.getElementsByTagName('HEAD')[0],
        oScript = document.createElement('script');
    oScript.type = 'text/javascript';
    oScript.src = src;
    oHead.appendChild(oScript);
}

function loadJs(jsStr) {
    var oHead = document.getElementsByTagName('HEAD')[0],
        oScript = document.createElement('script');
    oScript.type = 'text/javascript';
    oScript.text = jsStr;
    oHead.appendChild(oScript);
}

function heredoc(fn) {

    return fn.toString().replace(/^[^\/]+\/\*!?\s?/, '').replace(/\*\/[^\/]+$/, '').trim().replace(/>\s*</g, '><');
}