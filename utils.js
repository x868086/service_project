import { regConfig } from './reg-config.js'
import fs from 'fs';

/**
 * 清洗字符串，去除AA，空格，逗号
 * @param {string} str 
 * @returns {string}
 */
function stringClearn(str) {
    return str.replace(/AA|,|，|:|：|(\u0020)|(\u3000)/g, '')
}

/**
 * 匹配出文本内容
 * @param {string} str 
 * @param {Array} regconfig 
 * @returns {Object}
 */
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

/**
 * 根据指定的正则字典内容匹配内容
 * @param {string} str 
 * @param {number} level 
 * @param {string} key 
 * @returns {string}
 */
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
    const files = fs.readdirSync('./excel-file/');

    const reg = /((\.xls)$|(\.csv)$|(\.xlsx))$/;

    // const result = files.filter((file) => {
    //     console.log(file)
    //     reg.test(file)
    // })

    const result = files.filter((file) => {
        return reg.test(file)
    })

    console.log(result)


    // console.log(result);
}

//写一段正则表达式规则，匹配.xls, .xlsx, .csv文件 
// const reg = /((\.xls)$|(\.xlsx)$|(\.csv)$)/g;



export {
    stringRegSummary, stringRegCont, readExcel
}