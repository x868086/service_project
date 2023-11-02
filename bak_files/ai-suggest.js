import path from 'path';
import fs from 'fs';
import ExcelJS from 'exceljs';
import { regInfo, regConfig } from '../configs/reg-config.js'
import { stringRegSummary, stringRegCont, readExcel } from '../utils/utils.js'
/** 
 * Reads an Excel file from the specified filepath and returns an array of Excel files. 
 * 
 * @param {string} filepath - The path to the directory containing the Excel files. 
 * @return {array} An array of Excel files. 
 */
function readDirPath(filepath) {
    return new Promise((resolve, reject) => {
        fs.readdir(filepath, (err, files) => {
            if (err) {
                console.error('Error reading directory:', err);
                reject(err)
            } else {
                const excelFiles = files.filter(file => path.extname(file) === '.xlsx' || path.extname(file) === '.xls' || path.extname(file) === '.csv');
                resolve(excelFiles)
            }
        });
    })
}
// Nodejs数据流读取方法 
async function readExcelStream(filepath) {
    const workbook = new ExcelJS.Workbook();
    const stream = fs.createReadStream(filepath);
    stream.on('error', error => {
        throw new Error(`读取文件错误${error}`)
    })
    await workbook.xlsx.read(stream);
    const worksheet = workbook.getWorksheet('foo');
    return worksheet
}
async function getHeaderCol(cellName, worksheet) {
    const headers = [];
    worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
        if (rowNumber === 1) {
            row.eachCell({ includeEmpty: false }, (cell) => {
                headers.push({
                    value: cell.text,
                    address: cell.address
                });
            });
        }
    });
    let colFlag = headers.find((e, i, a) => e.value === cellName).address.replace(/\d+/g, '')
    const colContent = worksheet.getColumn(colFlag)
    return colContent
}
async function getEachCell(colContent) {
    colContent.eachCell({ includeEmpty: true }, function (cell, rowNumber) {
        console.log(cell.value, cell.text, cell.address, rowNumber)
        let { regTitle, regContent } = stringRegSummary(cell.text, regConfig)
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
    });
}
async function rollup(excelPath) {
    let cellName = '处理结果'
    let result = await readDirPath(excelPath)
    let filepath = path.join(excelPath, result[0])
    let worksheet = await readExcelStream(filepath);
    let colContent = await getHeaderCol(cellName, worksheet)
    await getEachCell(colContent)
}
try {
    rollup(excelPath)
} catch (err) {
    throw new Error(`读取excel文件目录出错${err}`)
}
在以上代码中，假设路径为excelPath的excel表格有20M，执行rollup函数时，是否会造成JS线程堵塞？











//bito解决方案
// Nodejs数据流读取方法
function readExcelStream(filepath) {
    return new Promise((resolve, reject) => {
        const workbook = new ExcelJS.Workbook();
        const stream = fs.createReadStream(filepath);
        stream.on('error', error => {
            reject(new Error(`读取文件错误${error}`));
        });
        workbook.xlsx.read(stream)
            .then(() => {
                const worksheet = workbook.getWorksheet('foo');
                resolve(worksheet);
            })
            .catch(error => {
                reject(new Error(`读取文件错误${error}`));
            });
    });
}

async function getEachCell(colContent) {
    for await (const cell of colContent) {
        console.log(cell.value, cell.text, cell.address, cell.row.number);
        let { regTitle, regContent } = stringRegSummary(cell.text, regConfig);
        let regFilter = regConfig.map((element, index, arr) => {
            return Object.entries(element);
        }).map((element, index, arr) => {
            return element.filter(e => {
                let [key, value] = e;
                return key === regTitle;
            });
        }).flat();
        let regContentResult = regFilter.map((e, i, a) => {
            let [key, value] = e;
            return stringRegCont(regContent, value);
        });
        console.log(regContentResult);
    }
}

async function rollup(excelPath) {
    let cellName = '处理结果';
    let result = await readDirPath(excelPath);
    let filepath = path.join(excelPath, result[0]);
    let worksheet = await readExcelStream(filepath);
    let colContent = await getHeaderCol(cellName, worksheet);
    await getEachCell(colContent);
}

try {
    rollup(excelPath);
} catch (err) {
    throw new Error(`读取excel文件目录出错${err}`);
}





//gpt4-解决方案
import path from 'path';
import fs from 'fs';
import ExcelJS from 'exceljs';
import { regInfo, regConfig } from '../configs/reg-config.js'
import { stringRegSummary, stringRegCont, readExcel } from '../utils/utils.js'

function readDirPath(filepath) {
    return new Promise((resolve, reject) => {
        fs.readdir(filepath, (err, files) => {
            if (err) {
                console.error('Error reading directory:', err);
                reject(err)
            } else {
                const excelFiles = files.filter(file => path.extname(file) === '.xlsx' || path.extname(file) === '.xls' || path.extname(file) === '.csv');
                resolve(excelFiles)
            }
        });
    })
}

async function readExcelStream(filepath) {
    const workbookReader = new ExcelJS.stream.xlsx.WorkbookReader(filepath);
    let worksheet;
    workbookReader.on('worksheet', (worksheetReader) => {
        if (worksheetReader.name === 'foo') {
            worksheet = worksheetReader;
        }
    });
    await workbookReader.read();
    return worksheet;
}

async function getHeaderCol(cellName, worksheet) {
    const headers = [];
    worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
        if (rowNumber === 1) {
            row.eachCell({ includeEmpty: false }, (cell) => {
                headers.push({
                    value: cell.text,
                    address: cell.address
                });
            });
        }
    });

    let colFlag = headers.find((e, i, a) => e.value === cellName).address.replace(/\d+/g, '')
    const colContent = worksheet.getColumn(colFlag)
    return colContent
}

async function getEachCell(colContent) {
    colContent.eachCell({ includeEmpty: true }, function (cell, rowNumber) {
        console.log(cell.value, cell.text, cell.address, rowNumber)

        let { regTitle, regContent } = stringRegSummary(cell.text, regConfig)

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
    });
}

async function rollup(excelPath) {
    try {
        let cellName = '处理结果'

        let result = await readDirPath(excelPath)
        let filepath = path.join(excelPath, result[0])
        let worksheet = await readExcelStream(filepath);
        let colContent = await getHeaderCol(cellName, worksheet)
        await getEachCell(colContent)
    } catch (err) {
        throw new Error(`读取excel文件目录出错${err}`)
    }
}

rollup(excelPath);
在这个优化后的代码示例中，我使用了 stream.xlsx.WorkbookReader 类来以流的方式读取 Excel 文件，并在读取过程中处理数据。这样可以避免一次性读取整个文件，从而避免阻塞 JavaScript 线程。

此外，我也将 try-catch 块移动到了 rollup 函数内部，以便捕获异步操作的异常。