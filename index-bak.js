import { regInfo, regConfig } from './reg-config.js'


let a = 'Q23： 枝江市铭沃合作营业厅 ，1000M宽带提速包（30元）（湖北）AA，经核查属营业厅2023-05-31 10:10:52赠送1000M宽带提速包（30元）（湖北）和399组网套包得180元分6个月（组网优惠）（湖北）业务，免费6个月，赠费合约内未产生扣费，现已为客户解释处理，已取消提速包业务，用户满意'

let level = 0
let regContentResult = []


//清洗字符串，去除AA，空格，逗号
function stringClearn(str) {
    return str.replace(/AA|,|，|:|：|(\u0020)|(\u3000)/g, '')
}

function stringRegSummary(str, regconfig) {
    let regFilter = regconfig[0]
    for (let key in regFilter) {
        let result = str.match(regFilter[key])
        if (!!result) {
            return {
                regTitle: key,
                regContent: result[0]
            }
        }
    }
}

let { regTitle, regContent } = stringRegSummary(a, regConfig)



function stringRegCont(str, level, key) {
    if (level > regConfig.length) {
        return false
    }
    let result = str.match(regConfig[level][key])
    let resultClear = stringClearn(result[0])
    return resultClear
}




for (let i = 1; i < regConfig.length; i++) {
    if (i === regConfig.length) {
        break
    }
    level += 1
    regContentResult[i - 1] = stringRegCont(regContent, level, regTitle)
    console.log(regContentResult)
}



// function stringFilter(str, config) {
//     let currentLevel = config.length
//     let currentFilter = config[currentLevel]
//     currentLevel -= 1
//     if (currentLevel < 0) {
//         return false
//     }
//     for (let key in currentFilter) {
//         console.log(currentFilter[key])
//         let result = str.match(currentFilter[key])
//         if (result) {
//             console.log(result[0])
//         }
//     }
// }
// stringFilter(a, regConfig)




//读取当前目录下后缀名为'.xlsx'的文件
/*
const fs = require('fs');

const files = fs.readdirSync('./');

const reg = /\.xlsx$/g;

const result = files.filter(file => reg.test(file));

// console.log(result);
*/


// 能匹配出冒号和逗号之间的部分
// const levelSecondReg = {
//     commaEnd: /((\uFF1A)|(:)).*(\uFF0C|,)/g
// }

// 能匹配出逗号和AA之间的部分
// const levelThirdReg = {
//     aaEnd: /(\uFF0C|,).+AA$/g
// }


// let a = 'Q22： 五峰渔关粤客隆营业厅，10元300M宽带（湖北）-低消融合（300M）AA，经核查属营业厅2023-01-15 14:07:04  办理10元300M宽带（湖北）-低消融合（300M）业务，现已为客户解释注销处理，用户满意'
// function stringClearn(str) {
//     return str.replace(/AA|,|，|:|：/g, '')
// }

// let b = stringClearn(a)
// console.log(b)

// let regStr = /(^Q21|Q22|Q23)((\uFF1A)|(:)).+AA/g
// function stringSplite(str, reg) {
//     let result = str.match(reg)
//     if (result) {
//         // return result[0]
//         console.log(result[0])
//     } else {
//         return null
//     }
// }

// stringSplite(a, regStr)






