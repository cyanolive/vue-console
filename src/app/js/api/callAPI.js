import Vue from 'vue'
// const DEV_HOST = 'admin.10rub.net';//正式线上服务器--法兰克福
// const DEV_HOST = 'jp.admin.10rub.net';//日本测试服务器
// const DEV_HOST = '172.16.7.71';//本地开发服务器
// const DEV_HOST = '52.192.79.154';//日本测试服务器
const DEV_HOST = '127.0.0.1:8100';//本机开发服务器
export function get(context, apiUrl, params, cb) {
    params = params || {};
    var str = joinQueryUrl(params),
        url;
    apiUrl = 'http://' + DEV_HOST + apiUrl;
    if (str) {
        url = apiUrl.indexOf('?') != -1 ? (apiUrl + '&' + str) : (apiUrl + '?' + str);
    } else {
        url = apiUrl;
    }

    context.$http.get(url, function (data) {
        if (data.tips == 'Unsigned in user!') {
            router.go('/login');
        }
        if (typeof cb == 'function') {
            cb(context, data);
        }
    });
}

export function post(context, apiUrl, data, cb) {
    apiUrl = 'http://' + DEV_HOST + apiUrl;
    context.$http.post(apiUrl, data, function (data, status, request) {
        console.log('status' + status + 'request' + JSON.stringify(request));
        cb(data, status, request);
    });

}

function joinQueryUrl(obj) {
    var queryArray = [],
        temp;
    for (var i in obj) {
        temp = obj[i];
        if (temp || temp === 0) {
            queryArray.push(i + '=' + obj[i]);
        } else {
            queryArray.push(i); 
        }
    }

    var queryStr = queryArray.join('&');
    return queryStr;
}


export function callAPI(params, callback) {
    params.method = params.method || 'GET';
    params.url += 'http://' + DEV_HOST + params.url;

    Vue.http(params).then(function (response) {
        callback(response);
    });
}
