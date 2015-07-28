BaiduPush
=======

Node.js SDK for [baidu push service](http://push.baidu.com/), which is a free, simple, easy scale push service. It support IOS & Android platform. It is a good choice for China app developers. 

### Install

```
npm install baidu_push
```



### Configure

Baidu push [documentation](http://push.baidu.com/doc/restapi/restapi)

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


### TODO

* 提供设置 apikey, secretkey 的方式
* 提供所有的 REST API 调用方法
* 编写文档
* 测试用例
* publish to npm

    TODO:
        1. support url schema option
