var Baidu = require('../lib/index.js');


const APIKEY = "BG2gBo7mED2MIBuKL9FIVlyO";
const SECRETKEY = "Ihp8XYybpz4ZGEFsB7sxIED1o6Sl6sbi";


var push = new Baidu({
    apiKey: APIKEY,
    secretKey: SECRETKEY
});


var userId = '773050392649073364';
var channelId = '3748092266370017686';


push.pushSingle({
    channel_id: '3748092266370017686',
    msg_type: 1,
    msg: JSON.stringify({title: 'hello pana wang'})
}).then(function (data) {
    console.log('Hello', data);
}).catch(function (err) {
    // console.log(err);
    console.log(err.stack);
});

