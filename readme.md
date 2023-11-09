# 博物百科

基于科大讯飞大模型开发的博物百科小程序，因为现在小程序发布需要备案。而且大模型相关不能个人备案。因此产品流产了。现在将一部分功能开源出来供大家玩赏。

星火大模型在中文AIGC这块还是很拉垮的，生成效果个人觉得不如百川和文心一言。更不用说GPT4了。但是GPT4过于生搬硬套。百川和文心一言相对来说会更生动一些。但是因为没有免费接口，所以只能使用星火大模型。

![](/assists/home.png)
![](/WechatIMG56.jpg)
![](/WechatIMG57.jpg)
![](/WechatIMG58.jpg)

## 使用

需要自己去科大讯飞星火大模型申请appid，appkey，appsercet，科大讯飞提供10w免费tokens。注册领取即可。[链接](https://xinghuo.xfyun.cn/)

使用注册好的id修改以下文件：
```js
  // utils/xfsdk/index.js
  const API_KEY = '';
  const API_SECRET = '';
  const APP_ID = '';
```

## 备注
选择科大讯飞大模型是因为免费使用。接口文档比较详细，而且有简单的接入demo。文心一言和百川目前不支持个人调接口。gpt4在中文AIGC方面内容有点过于生搬硬套。不过这些都是一些主观看法。还是看自己吧。仅供娱乐。