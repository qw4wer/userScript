// ==UserScript==
// @name           exhentai_login
// @author         qw4wer
// @description    exhentai login
// @include https://exhentai.org
// @clean-include       (true || false)
// if it's > true < , USI will not change any of your @includes
// @info                exhentai login
// @run-at              document-ready
// @require https://code.jquery.com/jquery-1.12.4.min.js
// @grant GM_xmlhttpRequest
// @use-greasemonkey    (true || false)
// @version             0.0.3
// ==/UserScript==

// WARNING: If you save this Userscript, it will be immediately active

var script = heredoc(function () {
    /*

     function t(){
     var username = encodeURIComponent($('#username').val());
     var password = encodeURIComponent($('#password').val());

     window.postMessage({userName:username,userPwd:password,type:'login'},location.href);
     }




     function setCookie(name,value)
     {

     var Days = 30;
     var exp = new Date();
     exp.setTime(exp.getTime() + Days*24*60*60*1000);
     document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
     }


     window.addEventListener('message', function (event) {
     if (event.data.type === "addCookies"){
     debugger;
     for(var i in event.data.cookies){
     setCookie(i.event.data.cookies[i]);
     }
     }
     }, false);

     */

});

var form = heredoc(function () {
    /*

     <form >
     <input type="text" id="username"/>
     <input type="text" id="password"/>
     </form>
     <input type="button" onclick="t()"/>

     */
});
$ = $ || unsafeWindow.$;
document = document || unsafeWindow.document;

(function () {
    var isOther = location.href.indexOf('https://exhentai.org') == -1;

    if (!isOther) {
        init();

    } else {

    }

})();
function init() {
    $(document.body).html("");
    $(document.body).append(form);
    loadScript("https://cdn.bootcss.com/jquery/1.12.4/jquery.js");
    loadJs(script);

    window.addEventListener('message', function (event) {
        if (event.data.type === "login")
            login(event.data.userName, event.data.userPwd);
    }, false);
}

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


function login(username, password) {
    var cookies = {};
    GM_xmlhttpRequest({
        method: "POST",
        url: "https://forums.e-hentai.org/index.php?act=Login&CODE=01",
        data: "referer=https://forums.e-hentai.org/index.php&UserName=" + username + "&PassWord=" + password + "&CookieDate=1",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        onload: function (response) {
            if (response.responseText.indexOf("You are now logged in as:") > -1) {
                var cookieArr = response.responseHeaders.trim().split("\n");
                for (var i = 0, length = cookieArr.length, t = ""; t = cookieArr[i]; i++) {
                    if (t.indexOf("=") !== -1) {
                        t = t.replace("Set-Cookie: ", "");
                        cookies[t.split("=")[0]] = t.split("=")[1];

                    }
                }

                window.postMessage({type:'addCookies',cookies:cookies},location.href);
            }
        }
    });

}