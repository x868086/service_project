import fs from 'fs';
import path from 'path';


import configs from './configs/config.js'
/**
 * 在 ES 模块中，__dirname 并不是一个预定义的变量。可以使用 import.meta.url 结合 Node.js 的 path 模块来获取当前模块的目录路径。
 * 使用 import.meta.url 获取当前模块的文件 URL，然后使用 fileURLToPath() 方法将其转换为文件路径。
 * 接下来，我们使用 dirname() 方法获取文件路径的目录路径，并将其赋值给 __dirname 变量。最后，我们在控制台输出 __dirname。
 */
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
console.log(__dirname);
const excelPath = path.join(__dirname, configs.excelFilePath)

import { readDirPath, readExcelStream, getHeaderCol, getEachCell } from './excel-utils/excel-methods.js'


import { regInfo, regConfig } from './configs/reg-config.js'
import { stringRegSummary, stringRegCont, readExcel } from './utils/utils.js'



let a = 'Q23： 枝江市铭沃合作营业厅 ，1000M宽带提速包（30元）（湖北）AA，经核查属营业厅2023-05-31 10:10:52赠送1000M宽带提速包（30元）（湖北）和399组网套包得180元分6个月（组网优惠）（湖北）业务，免费6个月，赠费合约内未产生扣费，现已为客户解释处理，已取消提速包业务，用户满意'
let b = 'Q23： 城区高新区东山花园自营厅   经核实2023-03-17 16:58:44 城区高新区东山花园自营厅 给客户办理融合宽带071703854185。现客户表示无需使用，客服部已操作取消，并转资畅越冰激凌5G套餐199元（极速）+ 网龄计划合约 ，次月生效，满意。'
let c = null


let { regTitle, regContent } = stringRegSummary(c, regConfig)


let regFilter = regConfig.map((element, index, arr) => {
    return Object.entries(element)
}).map((element, index, arr) => {
    return element.filter(e => {
        let [key, value] = e
        return key === regTitle
    })
}).flat()

let regContentResult = regFilter.map((e, i, a) => {
    let [key, value] = e
    return stringRegCont(regContent, value)
})

console.log(regContentResult)



async function rollup(excelPath) {
    // 手动指定表头列名称，需要改写？？？？？？？？？
    let cellName = '处理结果'
    // 只能读取文件夹下的某一个文件，需要改写？？？？？？？？？？
    let result = await readDirPath(excelPath)
    let filepath = path.join(excelPath, result[0])
    let worksheet = await readExcelStream(filepath);
    let colContent = await getHeaderCol(cellName, worksheet)
    await getEachCell(colContent)

}

// try {
//     rollup(excelPath)
// } catch (err) {
//     throw new Error(`读取excel文件目录出错${err}`)
// }





// readStreamFile(fileList[0])





