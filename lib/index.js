'use strict';
var request = require('request');
let signKey = require('./sign.js');
let promiseify = require('promiseify');


/*
    统一使用 POST 方法
    {
        uri: className/action
        params: {}
    }
*/
function _invokeBaidu (opt, cbk) {
    // check required parameters
    if (!opt || !opt.uri || !opt.params)
        throw new Error ('Lack required parameters');
    //
    let uri = `http://api.tuisong.baidu.com/rest/3.0/${opt.uri}`;
    let headers = {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        'User-Agent':  'BCCS_SDK/3.0 (Darwin; Darwin Kernel Version 14.0.0: Fri Sep 19 00:26:44 PDT 2014; root:xnu-2782.1.97~2/RELEASE_X86_64; x86_64) PHP/5.6.3 (Baidu Push Server SDK V3.0.0 and so on..) cli/Unknown ZEND/2.6.0'
    };
    // build post params
    let params = opt.params;
    params.timestamp = Math.round(Date.now()/1000);
    params.apikey = APIKEY;
    let httpInfo = {
        href: uri,
        method: 'POST'
    };
    params.sign = signKey(httpInfo, params, SECRETKEY);
    // build post options
    let opts = {
        uri: uri,
        headers: headers,
        method: 'POST',
        form: params
    };
    // do request
    request(opts, function (err, response, body) {
        if (err)
            cbk(err);
        else {
            try {
                let tmp = JSON.parse(body);
                cbk(null, tmp);
            } catch(e) {
                cbk(e);
            }
        }
    });
}

// turn callback version to promise
let invokeBaidu = promiseify(_invokeBaidu);



module.exports = {
    invokeBaidu: invokeBaidu,

    pushSingle: function (opts) {
        opts.uri = 'push/single_device';
        return invokeBaidu(opts);
    },

    pushAll: function (opts) {
        opts.uri = 'push/all';
        return invokeBaidu(opts);
    },

    pushTags: function (opts) {
        opts.uri = 'push/all';
        return invokeBaidu(opts);
    },

    pushBatch_device: function (opts) {
        opts.uri = 'push/batch_device';
        return invokeBaidu(opts);
    }
}


/*
    common params:
        apikey
        timestamp
        sign
        [expires]
        [device_type]: 3：android  4：iOS

    Available APIS:

        POST /push/single_device    推送消息到单台设备
        POST /push/all              推送广播消息
        POST /push/tags             推送组播消息
        POST /push/batch_device     推送消息到给定的一组设备(批量单播)

        GET /report/query_msg_status   查询消息的发送状态
        GET /report/query_timer_records   查询定时消息的发送记录
        GET /report/query_topic_records    查询指定分类主题的发送记录
        GET /app/query_tags                查询标签组列表
        GET /app/create_tag             创建标签组
        GET /app/del_tag                删除标签组


        POST /tag/add_devices           添加设备到标签组
        POST /tag/del_devices           将设备从标签组中移除
        GET /tag/device_num             查询标签组设备数量
        GET /timer/query_list           查询定时任务列表
        POST /timer/cancel              取消定时任务
        GET /topic/query_list           查询分类主题列表
        GET /report/statistic_device    当前应用的设备统计信息
        GET /report/statistic_topic     查询分类主题统计信息

    百度推送文档: http://push.baidu.com/doc/restapi/restapi
*/
