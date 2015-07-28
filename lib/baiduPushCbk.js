'use strict';
/*
*   BaiduPush -- A traditional callback version Baidu push service Node.js SDK
*/
var request = require('request');
var signKey = require('./sign.js');
var util = require('util');
var apiConfigs = require('./apiConfig.json');

/*
*   百度Push对象
*/
function BaiduPush (options) {
    if (!options || !options.apiKey || !options.secretKey)
        throw new Error ('apiKey and secretKey is required !');
    this.options = options;
    return this;
}
// default settings
var defaultHeaders = {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    'User-Agent':  'BCCS_SDK/3.0 (Darwin; Darwin Kernel Version 14.0.0: Fri Sep 19 00:26:44 PDT 2014; root:xnu-2782.1.97~2/RELEASE_X86_64; x86_64) PHP/5.6.3 (Baidu Push Server SDK V3.0.0 and so on..) cli/Unknown ZEND/2.6.0'
};
var defaultMethod = 'POST';

/*
    {
        uri: className/action
        params: {}
    }
*/
function invokeBaidu (opt, cbk) {
    // check required parameters
    if (!opt || !opt.uri || !opt.params)
        cbk(new Error ('Lack required parameters'));
    //
    var uri = util.format("http://api.tuisong.baidu.com/rest/3.0/%s", opt.uri);
    // build post params
    var params = opt.params;
    params.timestamp = Math.round(Date.now()/1000);
    params.apikey = opt.apiKey;
    var httpInfo = {
        href: uri,
        method: defaultMethod
    };
    params.sign = signKey(httpInfo, params, opt.secretKey);
    // build post options
    var opts = {
        uri: uri,
        headers: defaultHeaders,
        method: defaultMethod,
        form: params
    };
    // do request
    request(opts, function (err, response, body) {
        if (err)
            cbk(err);
        else {
            try {
                var tmp = JSON.parse(body);
                cbk(null, tmp);
            } catch(e) {
                cbk(e);
            }
        }
    });
}

/*
* set prototype
*/
var proto = {};
// add apis according to config
for (var i in apiConfigs) {
    var config = apiConfigs[i];
    var uri = config.uri;
    proto[config.name] = function (config) { 
        return function (params, cbk) {
            // check required params
            for (var i in config.requiredParams) {
                var p = config.requiredParams[i];
                if (!params[p.name])
                    throw new Error(util.format('Required param "%s" is requied', p.name));
            }
            // build request options
            var opts = {
                uri: config.uri,
                params: params,
                apiKey: this.options.apiKey,
                secretKey: this.options.secretKey
            };
            return invokeBaidu(opts, cbk);
        };
    }(config);
}
BaiduPush.prototype = proto;

module.exports = BaiduPush;

