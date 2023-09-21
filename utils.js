import { regConfig } from './reg-config.js'
import fs from 'fs';
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

function stringRegCont(str, level, key) {
    if (level > regConfig.length) {
        return false
    }
    let result = str.match(regConfig[level][key])
    let resultClear = stringClearn(result[0])
    return resultClear
}

//读取当前目录下后缀名为'.xlsx','.xls','.csv'的文件
function readExcel() {



    const files = fs.readdirSync('./');

    const reg = /((\.xls)$|(\.csv)$|(\.xlsx))$/g;

    const result = files.filter(file => reg.test(file))

    console.log(result);
}

export {
    stringRegSummary, stringRegCont, readExcel
}