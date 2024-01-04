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
const excelPath = path.join(__dirname, configs.excelUploadPath)
const outputPath = path.join(__dirname, configs.outputPath)

import { readDirPath, readExcelStream, getHeaderCol, getTargetCol, getEachCell, saveFileStream } from './excel-utils/excel-methods.js'
import { askQuestion } from './utils/read-line-methods.js'


// import { regInfo, regConfig } from './configs/reg-config.js'
// import { stringRegSummary, stringRegCont, readExcel } from './utils/utils.js'



// let a = 'Q23： 枝江市铭沃合作营业厅 ，1000M宽带提速包（30元）（湖北）AA，经核查属营业厅2023-05-31 10:10:52赠送1000M宽带提速包（30元）（湖北）和399组网套包得180元分6个月（组网优惠）（湖北）业务，免费6个月，赠费合约内未产生扣费，现已为客户解释处理，已取消提速包业务，用户满意'
// let b = 'Q23： 城区高新区东山花园自营厅   经核实2023-03-17 16:58:44 城区高新区东山花园自营厅 给客户办理融合宽带071703854185。现客户表示无需使用，客服部已操作取消，并转资畅越冰激凌5G套餐199元（极速）+ 网龄计划合约 ，次月生效，满意。'
// let c = null
// let d = '解释宣传：城区东山大道国贸自有营业厅AA，用户反馈办理低消宽带时解释宣传错误，核实营业厅开通宽带时勾选1年赠费，于23.6月到期，故7月起每月产生10元费用，考虑客户感知，现申请减免1年宽带费用合计120元，退至宽带私有账户，24小时内到账，此费用不可打印账单发票，回访满意'


// let { regTitle, regContent } = stringRegSummary(d, regConfig)


// let regFilter = regConfig.map((element, index, arr) => {
//     return Object.entries(element)
// }).map((element, index, arr) => {
//     return element.filter(e => {
//         let [key, value] = e
//         return key === regTitle
//     })
// }).flat()

// let regContentResult = regFilter.map((e, i, a) => {
//     let [key, value] = e
//     return stringRegCont(regContent, value)
// })

// console.log(regContentResult)



async function rollup(excelPath, cellName) {
    // 手动指定表头列名称，需要改写？？？？？？？？？
    // let cellName = '处理结果'
    // 只能读取文件夹下的某一个文件，需要改写？？？？？？？？？？
    let result = await readDirPath(excelPath)
    let filepath = path.join(excelPath, result[0])
    let { workbook, worksheet } = await readExcelStream(filepath);

    // 获取表格第一列，根据正则配置文件类型个数，在第一列后面增加对应个数的列（后续插入正则拆分结果单元格），然后返回修改后的表头
    let { headers, colLenth } = await getHeaderCol(worksheet)

    let colContent = await getTargetCol(headers, cellName, worksheet)
    await getEachCell(colContent, worksheet, colLenth)
    // await saveFileStream(workbook, outputPath, 'ttt.xlsx')
    await saveFileStream(workbook, outputPath, `${result[0]}-提取-.xlsx`)
    // ???是否需要提交workbook
    // await workbook.commit()
}


askQuestion.question(`客服全量工单辅助分析系统--您要拆分单元格表头是什么:`, (name) => {
    console.log('用户:,' + name);

    rollup(excelPath, name).catch(err => {
        throw new Error(`读取excel文件目录出错,请确认文件是否上传,单元格表头是否填写正确${err}`)
    })
    askQuestion.close();
});

// askQuestion.on("line", function (line) {
//     console.log("您输入的内容是：", line);
// });

askQuestion.on("close", function () {
    console.log("已退出输入框。");
});
// askQuestion.write(data[, mode])：向命令行输出data，可以模拟用户输入命令。

askQuestion.on('error', (error) => {
    console.error('读取命令行发生错误：', error);
});

// rollup(excelPath, '处理结果').catch(err => {
//     throw new Error(`读取excel文件目录出错${err}`)
// })




// readStreamFile(fileList[0])





