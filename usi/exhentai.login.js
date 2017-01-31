// ==UserScript==
// @name           exhentai_login
// @namespace      {e.g. your website}
// @author         qw4wer
// @description    login exhentai
// @include https://exhentai.org/*
// @info           login exhentai

// @run-at        document-end
// @include-jquery      true
// @grant         GM_xmlhttpRequest
// @grant         GM_addStyle
// @use-greasemonkey    (true || false)
// @version             0.0.3
// ==/UserScript==

var css = heredoc(function() {
    /*
        body{
            text-align: center;
            background-image: url("https://exhentai.org") ;
            background-repeat:no-repeat;
            background-position: 50% 0%;
        }
        div {
            left: 50%;
            position: absolute;
            margin: 30px 0 0 -80px;
            width: 150px;
            top: 40%;
        }
        input[type='text'], input[type='password'] {
            width: 150px;
            height: 22px;
            border: 1px solid #A79090;
            margin-bottom: 8px;
        }
      */
});

var script = heredoc(function() {
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
            for(var i in event.data.cookies){
                setCookie(i,event.data.cookies[i]);
            }
            debugger;
            location.reload(true);
         }
     }, false);
     */

});

var html = heredoc(function() {
/*
<div >
    <form>
        <table>
            <tr>
                <td colspan="2">
                    <input type="text" id="username"/>
                </td>
            </tr>
            <tr>
                <td colspan="2">
                    <input type="password" id="password"/>
                </td>
            </tr>
            <tr>
                <td>
                    <input type="button" onclick="t()" value="login"/>
                </td>
                <td>
                    <input type="checkbox" onclick="t()" />remeber
                </td>
            </tr>
        </table>
    </form>

</div>
*/
});
$ = $ || unsafeWindow.$;
document = document || unsafeWindow.document;

(function() {
	var isOther = location.href.indexOf('exhentai.org') === -1;

	if (!isOther) {
		init();

	} else {

}

})();
function init() {

	if (document.cookie.trim().indexOf("ipb") === -1) {
        GM_addStyle(css);
		$(document.body).html("");
        
		$(document.body).append(html);

		loadScript("https://cdn.bootcss.com/jquery/1.12.4/jquery.js");
		loadJs(script);

		window.addEventListener('message',
		function(event) {
			if (event.data.type === "login") login(event.data.userName, event.data.userPwd);
		},
		false);
	}
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
    debugger;
	var cookies = {};
	GM_xmlhttpRequest({
		method: "POST",
		url: "https://forums.e-hentai.org/index.php?act=Login&CODE=01",
		data: "referer=https://forums.e-hentai.org/index.php&UserName=" + username + "&PassWord=" + password + "&CookieDate=1",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		},
		onload: function(response) {
			if (response.responseText.indexOf("You are now logged in as:") > -1) {
				var cookieArr = response.responseHeaders.trim().split("\n");
				for (var i = 0,
				length = cookieArr.length,
				t = ""; t = cookieArr[i]; i++) {
					if (t.indexOf("ipb") !== -1) {
						t = t.replace("Set-Cookie: ", "");
						cookies[t.split("=")[0]] = t.split("=")[1].split(";")[0];

					}
				}

				window.postMessage({
					type: 'addCookies',
					cookies: cookies
				},
				location.href);
			}
		}
	});

}
