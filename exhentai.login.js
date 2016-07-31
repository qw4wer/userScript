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
// @use-greasemonkey    (true || false)
// @version             0.0.1
// ==/UserScript==

// WARNING: If you save this Userscript, it will be immediately active

var script = heredoc(function () {
    /*
    alert(11);
function t(){
    var username = encodeURIComponent($('#username').val());
	var password = encodeURIComponent($('#password').val());
    
    alert(username);
}
function init(){

    $(document.body).append("<p>dsadsad</p>");
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
      $(document.body).append(form);
      loadScript(" https://libs.baidu.com/jquery/1.11.1/jquery.min.js");
      loadJs(script);
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
