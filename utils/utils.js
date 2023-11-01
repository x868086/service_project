import { regConfig } from '../configs/reg-config.js'
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
    if (!str) {
        return {
            regTitle: null,
            regContent: null
        }
    }
    let regFilter = regconfig[0]
    for (let [regKey, regExp] of Object.entries(regFilter)) {
        let result = str.match(regExp)
        if (!!result) {
            return {
                regTitle: regKey,
                regContent: result[0]
            }
        }

    }
    return {
        regTitle: null,
        regContent: null
    }
}

/**
 * 根据指定的正则字典内容匹配内容
 * @param {string} str 
 * @param {string} key 
 * @returns {string}
 */

function stringRegCont(str, key) {
    let result = str.match(key)
    let resultClear = stringClearn(result[0])
    return resultClear
}



//读取当前目录下后缀名为'.xlsx','.xls','.csv'的文件
function readExcel() {
    const files = fs.readdirSync('./excel-file/');

    const reg = /((\.xls)$|(\.csv)$|(\.xlsx))$/g;

    // const result = files.filter((file) => {
    //     console.log(file)
    //     reg.test(file)
    // })

    const result = files.filter((file) => {
        // console.log(file)
        // return reg.test(file)
        if (file.search(reg) > 1) {
            return file.search(reg)
        }
    })

    console.log(result)


    // console.log(result);
}

//写一段正则表达式规则，匹配.xls, .xlsx, .csv文件 
// const reg = /((\.xls)$|(\.xlsx)$|(\.csv)$)/g;



export {
    stringRegSummary, stringRegCont, readExcel
}