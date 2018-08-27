var ipsbEl = document.getElementById('ipsb');
var ipsbGeoEl = document.getElementById('ipsb-geo');
var ippconlineEl = document.getElementById('ipcn');
var ippconlineGeoEl = document.getElementById('ipcn-geo');
var ldnsEl = document.getElementById('ldns');
var ldnsGeoEl = document.getElementById('ldns-geo');
var ldns2El = document.getElementById('ldns2');
var ldns2GeoEl = document.getElementById('ldns2-geo');

var osEl = document.getElementById('os');
var browserEl = document.getElementById('browser');
var uaEl = document.getElementById('useragent');
var flashEl = document.getElementById('flash');
var cookieEl = document.getElementById('cookie');
var lsEl = document.getElementById('ls');

var get = (function () {
    return function get(url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = ready.bind(xhr, callback);
        xhr.onerror = function () { alert('出错啦，请刷新重试'); };
        xhr.open('GET', url);
        xhr.send();
    }

    function ready(callback) {
        if (this.readyState === 4) {
            callback(this.responseText);
        }
    }
})();

function getipsb(json) {
    ipsbEl.innerHTML = json.ip;
    get('api/parseIp?ip=' + json.ip, function (res) {
        res = JSON.parse(res);
        ipsbGeoEl.innerHTML = [res.data.country, res.data.region, res.data.city, res.data.isp].join(' ');
    });
}

function getipPconline() {
    ippconlineEl.innerHTML = returnCitySN.cip;
    get('api/parseIp?ip=' + returnCitySN.cip, function (res) {
        res = JSON.parse(res);
        ippconlineGeoEl.innerHTML = [res.data.country, res.data.region, res.data.city, res.data.isp].join(' ');
    });
}

getipPconline();

var getLocalDNS = function () {
    var raw = new Date().getTime() + Math.random() + '.sngdia.imtmp.net';
    var url = 'http://' + raw + '/s';
    var img = new Image();

    img.onload = function () {
        get('api/ldns?d=' + raw, function (ip) {
            if (!ip) return ldnsEl.textContent = '获取失败，请刷新重试';
            ldnsEl.textContent = ip;
            get('api/parseIp?ip=' + ip, function (res) {
                res = JSON.parse(res);
                ldnsGeoEl.innerHTML = [res.data.country, res.data.region, res.data.city, res.data.isp].join(' ');
            });
        });
    }
    img.src = url;
}

var getAnotherLocalDNS = function () {
    var raw = new Date().getTime() + Math.random() + '.sngdia.imtmp.net';
    var url = 'http://' + raw + '/s';
    var img = new Image();

    img.onload = function () {
        get('api/ldns?d=' + raw, function (ip) {
            if (!ip) return ldnsEl.textContent = '获取失败，请刷新重试';
            ldns2El.textContent = ip;
            get('api/parseIp?ip=' + ip, function (res) {
                res = JSON.parse(res);
                ldns2GeoEl.innerHTML = [res.data.country, res.data.region, res.data.city, res.data.isp].join(' ');
            });
        });
    }
    img.src = url;
}

getLocalDNS();
getAnotherLocalDNS();


var getOsInfo = function () {
    var sUserAgent = navigator.userAgent;
    var isWin = (navigator.platform === "Win32") || (navigator.platform === "Windows");
    var isMac = (navigator.platform === "Mac68K") || (navigator.platform === "MacPPC") || (navigator.platform === "Macintosh") || (navigator.platform === "MacIntel");
    var bIsIpad = sUserAgent.match("iPad");
    var bIsIphoneOs = sUserAgent.match("iPhone");
    var isUnix = (navigator.platform === "X11") && !isWin && !isMac;
    var isLinux = (String(navigator.platform).indexOf("Linux") > -1);
    var bIsAndroid = sUserAgent.match("Android");
    var bIsCE = sUserAgent.match("Windows CE") || sUserAgent.match("WinCE") || sUserAgent.match("WindowsCE");
    var bIsWM = sUserAgent.match("Windows Mobile");
    var bIsWP = sUserAgent.match("Windows Phone OS");
    if (bIsIpad || bIsIphoneOs)
        return 'iOS';
    if (isMac)
        return "mac";
    if (isUnix)
        return "Unix";
    if (isLinux) {
        if (bIsAndroid) {
            return "Android";
        } else {
            return "Linux";
        }
    }
    if (bIsCE)
        return 'Windows CE';
    if (bIsWM)
        return 'Windows Mobile';
    if (bIsWP)
        return 'Windows Phone';

    if (sUserAgent.match("BlackBerry"))
        return "BlackBerry OS";
    if (sUserAgent.match("RIM Tablet OS"))
        return "BlackBerry Tablet OS";
    if (sUserAgent.match("(?:web|hpw)OS"))
        return "webOS";
    if (sUserAgent.match("SymbianOS/9.1") || sUserAgent.match("Series[ ]?60") || sUserAgent.match("S60"))
        return "Series60";

    if (isWin) {
        var isWin2K = sUserAgent.indexOf("Windows NT 5.0") > -1 || sUserAgent.indexOf("Windows 2000") > -1;
        if (isWin2K)
            return "Windows 2000";
        var isWinXP = sUserAgent.indexOf("Windows NT 5.1") > -1 ||
            sUserAgent.indexOf("Windows XP") > -1;
        if (isWinXP)
            return "Windows XP";
        var isWin2003 = sUserAgent.indexOf("Windows NT 5.2") > -1 || sUserAgent.indexOf("Windows 2003") > -1;
        if (isWin2003)
            return "Windows 2003";
        var isWinVista = sUserAgent.indexOf("Windows NT 6.0") > -1 || sUserAgent.indexOf("Windows Vista") > -1;
        if (isWinVista)
            return "Windows Vista";
        var isWin7 = sUserAgent.indexOf("Windows NT 6.1") > -1 || sUserAgent.indexOf("Windows 7") > -1;
        if (isWin7)
            return "Windows 7";
        var isWin8 = sUserAgent.indexOf("Windows NT 6.2") > -1 || sUserAgent.indexOf("Windows 8") > -1;
        if (isWin8)
            return "Windows 8";
    }

    return "其它（未检出）";
}

var getBrowser = function () {
    var ua = navigator.userAgent, tem,
        M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if (ua.match("MicroMessenger"))
        return "Weixin";

    if (/trident/i.test(M[1])) {
        tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
        return 'IE ' + (tem[1] || '');
    }
    if (M[1] === 'Chrome') {
        tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
        if (tem != null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
    }
    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
    if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);
    return M.join(':');
}

var getFlash = function () {
    var flashVersion = NaN;
    var ua = navigator.userAgent;

    if (window.ActiveXObject) {
        var swf = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
        if (swf) {
            flashVersion = Number(swf.GetVariable('$version').split(' ')[1].replace(/,/g, '.').replace(/^(d+.d+).*$/, "$1"));
        }
    } else {
        if (navigator.plugins && navigator.plugins.length > 0) {
            var swf = navigator.plugins['Shockwave Flash'];

            if (swf) {
                var arr = swf.description.split(' ');
                for (var i = 0, len = arr.length; i < len; i++) {
                    var version = Number(arr[i]);

                    if (!isNaN(version)) {
                        flashVersion = arr[i];
                        break;
                    }
                }
            }
        }
    }
    if (!isNaN(flashVersion)) {
        return flashVersion;
    } else {
        return '未安装';
    }
}

var getCookieInfo = function () {
    var date = new Date();
    date.setTime(date.getTime() + 10 * 1000);
    document.cookie = 'cookie_test=' + escape('1') + ";expires=" + date.toGMTString();
    var arr = document.cookie.match(new RegExp("(^| )cookie_test=([^;]*)(;|$)"));
    if (arr !== null && unescape(arr[2]) === '1') {
        return '开启';
    } else {
        return '关闭';
    }
}

var getLocalStorageInfo = function () {
    var store = 'pingtest';
    try {
        localStorage.setItem(store, store);
        localStorage.removeItem(store);
        return '开启';
    } catch (e) {
        return '关闭';
    }
}

osEl.textContent = getOsInfo();
browserEl.textContent = getBrowser();
flashEl.textContent = getFlash();
uaEl.textContent = navigator.userAgent;
cookieEl.textContent = getCookieInfo();
lsEl.textContent = getLocalStorageInfo();

var connectData = [];
var domainEl = document.getElementsByClassName('domain-list');
for (var i = 0; i < domainEl.length; i += 1) {
    connectData.push(domainEl[i].getAttribute('id'));
    domainEl[i].querySelector('.domain').innerHTML = domainEl[i].getAttribute('id');
}

var timeout = 6000;

var checkLoadTime = function (domain, protocol) {
    var img = document.createElement('img');
    var url = protocol + '://' + domain + '/favicon.icon';
    img.protocol = protocol;
    img.onload = setDeferTime;
    img.onerror = setDeferTime;
    img.domain = domain;
    img.src = url + '?' + String(Math.random());
    img.dt = new Date();
    document.getElementById('imgload').appendChild(img);

    setTimeout(function () {
        if (!img.loaded) {
            document.getElementById(img.domain).querySelector('.' + img.protocol).innerHTML = img.protocol.toUpperCase() + ': &nbsp;&gt;' + timeout;
        }
    }, timeout);
}

var setDeferTime = function () {
    this.loaded = true;
    var time = parseInt(new Date() - this.dt);
    var node = document.getElementById(this.domain);
    node.querySelector('.' + this.protocol).innerHTML = time;
}

for (var i = 0, len = connectData.length; i < len; i++) {
    checkLoadTime(connectData[i], 'http');
    checkLoadTime(connectData[i], 'https');
}
