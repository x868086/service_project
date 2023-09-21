
export const regInfo = {
    salesDispute: '电话营销-开通争议：开通渠道，业务名称AA',
    salesExplanation: '电话营销-解释宣传：开通渠道，业务名称AA',
    salesAmiss: '电话营销-工作差错：开通渠道，业务名称AA',
    salesService: '电话营销-服务态度：受理渠道，业务名称AA',
    jobAmiss: '工作差错：营业厅系统全称（含括号里的）AA',
    explainationAmiss: '解释宣传：营业厅系统全称（含括号里的）AA',
    serviceAttitude: '服务态度：营业厅系统全称（含括号里的）AA',
    deliveryDispute: '配送争议：营服，配送人员姓名AA',
    serviceStop: '号码关停：系统中停机原因AA',
    mobileService: '网络质量：具体地址AA',
    broadbandService: '固网质量：具体地址AA',
    broadbandInstallation: '宽带安装/资源：具体地点AA',
    qEvent: 'Q21/22/23：营业厅系统全称（含括号里的），业务名称AA',
}


export const regConfig = [
    {
        salesDispute: /电话营销-开通争议((\uFF1A)|(:)).+AA/g,
        salesExplanation: /电话营销-解释宣传((\uFF1A)|(:)).+AA/g,
        salesAmiss: /电话营销-工作差错((\uFF1A)|(:)).+AA/g,
        salesService: /电话营销-服务态度((\uFF1A)|(:)).+AA/g,
        jobAmiss: /工作差错((\uFF1A)|(:)).+AA/g,
        explainationAmiss: /解释宣传((\uFF1A)|(:)).+AA/g,
        serviceAttitude: /服务态度((\uFF1A)|(:)).+AA/g,
        deliveryDispute: /配送争议((\uFF1A)|(:)).+AA/g,
        serviceStop: /号码关停((\uFF1A)|(:)).+AA/g,
        mobileService: /网络质量((\uFF1A)|(:)).+AA/g,
        broadbandService: /固网质量((\uFF1A)|(:)).+AA/g,
        broadbandInstallation: /(宽带安装|资源)((\uFF1A)|(:)).+AA/g,
        qEvent: /(^Q21|Q22|Q23)((\uFF1A)|(:)).+AA/g
    },
    {
        salesDispute: /^电话营销-开通争议/g,
        salesExplanation: /^电话营销-解释宣传/g,
        salesAmiss: /^电话营销-工作差错/g,
        salesService: /^电话营销-服务态度/g,
        jobAmiss: /^工作差错/g,
        explainationAmiss: /^解释宣传/g,
        serviceAttitude: /^服务态度/g,
        deliveryDispute: /^配送争议/g,
        serviceStop: /^号码关停/g,
        mobileService: /^网络质量/g,
        broadbandService: /^固网质量/g,
        broadbandInstallation: /(^宽带安装|^资源)/g,
        qEvent: /(^Q21|Q22|Q23)/g
    },
    {
        salesDispute: /((\uFF1A)|(:)).*(\uFF0C|,)/g,
        salesExplanation: /((\uFF1A)|(:)).*(\uFF0C|,)/g,
        salesAmiss: /((\uFF1A)|(:)).*(\uFF0C|,)/g,
        salesService: /((\uFF1A)|(:)).*(\uFF0C|,)/g,
        jobAmiss: /((\uFF1A)|(:)).+AA/g,
        explainationAmiss: /((\uFF1A)|(:)).+AA/g,
        serviceAttitude: /((\uFF1A)|(:)).+AA/g,
        deliveryDispute: /((\uFF1A)|(:)).*(\uFF0C|,)/g,
        serviceStop: /((\uFF1A)|(:)).+AA/g,
        mobileService: /((\uFF1A)|(:)).+AA/g,
        broadbandService: /((\uFF1A)|(:)).+AA/g,
        broadbandInstallation: /((\uFF1A)|(:)).+AA/g,
        qEvent: /((\uFF1A)|(:)).*(\uFF0C|,)/g
    },
    {
        salesDispute: /((\uFF0C)|(,)).+AA/g,
        salesExplanation: /((\uFF0C)|(,)).+AA/g,
        salesAmiss: /((\uFF0C)|(,)).+AA/g,
        salesService: /((\uFF0C)|(,)).+AA/g,
        jobAmiss: null,
        explainationAmiss: null,
        serviceAttitude: null,
        deliveryDispute: null,
        serviceStop: null,
        mobileService: null,
        broadbandService: null,
        broadbandInstallation: null,
        qEvent: /((\uFF0C)|(,)).+AA/g
    },
]




// 匹配中文全角逗号的正则表达式：
// ```javascript
// /，/g
// ```
// 这个正则表达式表示匹配中文全角逗号。

// 匹配中文全角冒号的正则表达式：
// ```javascript
// /：/g
// ```
// 这个正则表达式表示匹配中文全角冒号。

// 其中 `/g` 表示全局匹配，即匹配字符串中的所有符合条件的字符。



// 要匹配中文全角标点符号，可以使用Unicode范围来进行匹配。以下是一些常见中文全角标点符号的正则表达式匹配规则：

// 1. 匹配中文全角逗号、句号、叹号、问号：
// ```javascript
// /[\uFF0C\u3002\uFF01\uFF1F]/g
// ```

// 2. 匹配中文全角冒号、分号：
// ```javascript
// /[\uFF1A\uFF1B]/g
// ```

// 3. 匹配中文全角括号（包括圆括号、方括号、花括号）：
// ```javascript
// /[\uFF08\uFF09\u3010\u3011\uFF5B\uFF5D\uFF5F\uFF60]/g
// ```

// 4. 匹配中文全角引号（包括双引号、单引号）：
// ```javascript
// /[\u201C\u201D\u2018\u2019]/g
// ```

// 5. 匹配中文全角破折号、省略号：
// ```javascript
// /[\u2014\u2026]/g
// ```

// 其中 `\uXXXX` 表示Unicode字符的16进制编码，范围内的字符会被匹配。使用这些正则表达式，您可以在文本中匹配相应的中文全角标点符号。



//使用JS正则表达式提取中文全角标点符号

// var str = "哈哈哈，嘿嘿嘿，哈哈哈！";
// var reg = /[\uFF0C\u3002\uFF01\uFF1F]/g;

// var result = str.match(reg);

// console.log(result); // ["，", "：", "）", "）", "）", "）"]

//使用JS正则表�

// var str = "哈哈哈，嘿嘿嘿，哈哈哈！";

// var reg = /[\uFF0C\u3002\uFF01\uFF1F]/g;

// var result = str.replace(reg, ",");

// var result = str.replace(reg, function(match){
//     return match.replace(/./g, "￥");
// });





// 能匹配出冒号和逗号之间的部分
// const levelSecondReg = {
//     commaEnd: /((\uFF1A)|(:)).*(\uFF0C|,)/g
// }

// 能匹配出逗号和AA之间的部分
// const levelThirdReg = {
//     aaEnd: /(\uFF0C|,).+AA$/g
// }
