var BaiduPush = require('../lib/index.js');

const APIKEY = "BG2gBo7mED2MIBuKL9FIVlyO";
const SECRETKEY = "Ihp8XYybpz4ZGEFsB7sxIED1o6Sl6sbi";


var userId = '773050392649073364';
var channelId = '3748092266370017686';

var baiduPush = new BaiduPush({
    apiKey: APIKEY,
    secretKey: SECRETKEY
});

// baiduPush.pushSingle({
//     channel_id: '3748092266370017686',
//     msg_type: 1,
//     msg: JSON.stringify({title: 'hellomsgssss'})
// }).then(function (data) {
//     console.log(data)
// }).catch(function (err) {
//     // console.log(err);
//     console.log(err.stack);
// })

baiduPush.pushSingle({
    channel_id: '3748092266370017686',
    msg_type: 1,
    msg: JSON.stringify({title: 'hellomsgssss'})
}, function (err, data) {
    console.log(err, data);
})
