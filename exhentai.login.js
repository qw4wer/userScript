// ==UserScript==
// @name           exhentai_login
// @namespace      {e.g. your website}
// @author         qw4wer
// @description    {Userscript description}
// @include https://exhentai.org/*
// @clean-include       (true || false)
// if it's > true < , USI will not change any of your @includes
// @info                {more informations ...}
// @updateURL            https://raw.githubusercontent.com/qw4wer/userScript/master/exhentai.login.js
// @run-at              (document-end || document-start || document-ready)
// @include-jquery      true
// @grant GM_xmlhttpRequest
// @use-greasemonkey    (true || false)
// @version             0.0.2
// ==/UserScript==

// WARNING: If you save this Userscript, it will be immediately active

var script = heredoc(function () {
    /*
    
function t(){
    var username = encodeURIComponent($('#username').val());
	var password = encodeURIComponent($('#password').val());
adddd();
}
function login(username,password){
$.post('https://forums.e-hentai.org/index.php?act=Login&CODE=01', 
			{referer:'https://forums.e-hentai.org/index.php',UserName:username,PassWord:password,CookieDate:1}, function(x) {
			if(x.indexOf('Username or password incorrect') != -1) {
				alert('Login failure!');

			} else if(x.indexOf('You must already have registered for an account before you can log in') != -1) {
				alert('No account exists with name "' + username + '"');

			} else if(x.indexOf('You are now logged in as:') != -1) {
//				chrome.runtime.sendMessage('cookieDataSet', onReturnMessage);
alert('true');
			} else {
				alert('Error parsing login result page!');

			}
		}).error(function() {
			alert('Error sending POST request to forums.e-hentai.org!');

		});

}




*/

});

var form = heredoc(function(){
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
function init(){
    $(document.body).html("");
      $(document.body).append(form);
      loadScript("https://cdn.bootcss.com/jquery/1.12.4/jquery.js");
      loadJs(script);

window.addEventListener('message',function(event) {
	
	console.log('received response:  ',event.data);
},false);
}

function loadScript(src){
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
