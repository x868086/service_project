import path from 'path';
import fs from 'fs';

import { createReadStream } from 'fs';
import { createInterface } from 'readline';

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
  stream.on('data', chunk => {
    // 处理每个数据块
    console.log('Received', chunk.length, 'bytes of data.');
  })
  stream.on('end', () => {
    console.log(`读取文件结束，文件路径为${filepath}`);
  })
  stream.on('error', error => {
    throw new Error(`读取文件错误${error}`)
  })

  await workbook.xlsx.read(stream);

  // 单独读取某个表格，需要改写？？？？？？？？？？？？？？
  // const worksheet = workbook.getWorksheet('My Sheet');
  // workbook.eachSheet(function(worksheet, sheetId) {
  //   console.log(worksheet,sheetId)
  // });

  // const worksheet = workbook.getWorksheet('foo');
  const worksheet = workbook.getWorksheet(1);
  return { workbook, worksheet }
}

// exceljs数据流原生方法
// function readExcelStream(filepath) {
//   return new Promise((resolve, reject) => {
//     const workbook = new ExcelJS.stream.xlsx.WorkbookReader(filepath);

//     workbook.on('worksheet', (worksheet) => {
//       if (worksheet.name === 'foo') {
//         const tableHeader = []
//         worksheet.on('row', (row) => {
//           if (row.number === 1) {
//             // const headers = row.values;
//             // tableHeader.push(headers)
//             // resolve(tableHeader)
//             row.eachCell((cell) => {
//               tableHeader.push(cell.value);
//               console.log(cell.address)
//               console.log(cell.value)
//             });
//             resolve(tableHeader)
//           }
//           // console.log(row.values)
//         })
//       }
//     })
//     workbook.read()
//   })
// }

// /**
//  * Reads an Excel file from a given filepath.
//  *
//  * @param {string} filepath - The path to the Excel file.
//  * @return {undefined} This function does not return a value.
//  */
// async function readExcelStream(filepath) {
//   // fs.createReadStream(filepath)
//   //   // .pipe(workbook.xlsx.createInputStream())
//   //   .on('data', chunk => {
//   //     // 处理每个数据块
//   //     console.log('Received', chunk.length, 'bytes of data.');
//   //   })
//   //   .on('end', () => {
//   //     console.log(`读取文件结束，文件路径为${filepath}`);
//   //   })
//   //   .on('error', error => {
//   //     throw new Error(`读取文件错误${error}`)
//   //   })

//   const workbook = new ExcelJS.stream.xlsx.WorkbookReader(filepath);

//   workbook.on('worksheet', async (worksheet) => {
//     if (worksheet.name === 'foo') {
//       worksheet.on('row', async (row) => {

//         if (row.number === 1) {
//           const headers = row.values;
//           console.log(headers);
//         }
//         // console.log(worksheet.columns)
//         // const cellC = row.getCell(2)
//         // let a = cellC.value
//       })

//     }
//   });
//   workbook.read()
//   // await workbook.read()
// }





async function getHeaderCol(worksheet) {
  const headers = [];
  worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
    if (rowNumber === 1) {
      row.eachCell({ includeEmpty: true }, (cell) => {
        headers.push({
          value: cell.text,
          address: cell.address
        });
      });
      // 读取正则配置文件，确定要拆分成多少列
      let addColums = []
      for (var i = 0; i < regConfig.length; i++) {
        addColums.push({
          header: `拆分${i}`,
          key: `field${i}`
        })
      }
      // 添加列标题
      worksheet.columns = [...worksheet.columns, ...addColums];
    } else {
      return
    }
  });
  return { headers: headers, colLenth: worksheet.columns.length }

  // let colFlag = headers.find((e, i, a) => e.value === cellName).address.replace(/\d+/g, '')
  // const colContent = worksheet.getColumn(colFlag)
  // return colContent
}

async function getTargetCol(headers, cellName, worksheet) {
  let colFlag = headers.find((e, i, a) => e.value === cellName).address.replace(/\d+/g, '')
  const colContent = worksheet.getColumn(colFlag)
  return colContent
}

async function getEachCell(colContent, worksheet, colLenth) {
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

    // console.log(regContentResult)
    // return regContentResult
    rewordEachCell(rowNumber, regContentResult, worksheet, colLenth)
  });

}

// 将正则规则提取的每个单元格的内容(数组)进行重新编写，并将新的内容写入到新的单元格中。
function rewordEachCell(rowNumber, regContentResult, worksheet, colLenth) {
  // 当前拆分列 colFlag
  // 待插入的列worksheet.columns
  // 待插入的内容 数组regContentResult
  if ((rowNumber === 1) || (regContentResult.length === 0)) {
    return
  }
  let row = worksheet.getRow(rowNumber)
  let range = regContentResult.length
  for (let i = 0; i < range; i++) {
    let str = regContentResult.shift()
    let colNumber = colLenth - regContentResult.length
    let cell = row.getCell(colNumber)
    cell.value = str
    let rewordCell = worksheet.getCell(cell.address)
    // ?? 是否要增加await ???
    // worksheet.commit()
    console.log(rewordCell)
  }
}

async function saveFileStream(workbook, outPath, fileName) {
  // await workbook.xlsx.writeFile(filepath);
  // console.log(`File saved successfully to ${filepath}`);
  const filepath = path.join(outPath, fileName);
  const writeStream = fs.createWriteStream(filepath);
  workbook.xlsx.write(writeStream)
    .then(() => {
      console.log(`Workbook written successfully to ${filepath}`);
    });
}


async function loadProgress() {
  const fs = require('fs');

  const filepath = 'example.txt';
  const readStream = fs.createReadStream(filepath);

  let totalBytesRead = 0;

  readStream.on('data', (chunk) => {
    totalBytesRead += chunk.length;
    const percentage = (totalBytesRead / fs.statSync(filepath).size) * 100;

    //fs.stat(filepath, (err, stats) => { ... })
    //     const fs = require('fs').promises;
    // const fs = require('fs');
    // async function readFile(path) {
    //   try {
    //     const stats = await fs.stat(path);
    //     if (stats.isFile()) {
    //       const fileContent = await fs.readFile(path, 'utf-8');
    //       console.log(fileContent);
    //     } else {
    //       console.log('The path is a directory.');
    //     }
    //   } catch (error) {
    //     console.error(error);
    //   }
    // }

    // readFile('/path/to/file.txt');
    console.log(`已读取 ${percentage}%`);
  });
}







export {
  readDirPath,
  readExcelStream,
  getHeaderCol,
  getTargetCol,
  getEachCell,
  rewordEachCell,
  saveFileStream
}




// 创建一个新的Workbook
// const workbook = new ExcelJS.Workbook();

// 1. 读取Excel文件
// fs.createReadStream(excelPath)
//   // .pipe(workbook.xlsx.createInputStream())
//   .on('data', chunk => {
//     // 处理每个数据块
//     console.log('Received', chunk.length, 'bytes of data.');
//   })
//   .on('end', () => {
//     console.log('Finished reading the file.');
//   });

// 2. 写入Excel文件
// const worksheet = workbook.addWorksheet('Sheet1');
// worksheet.getCell('A1').value = 'Hello, World!';

// // 保存到文件
// workbook.xlsx.writeFile('output.xlsx')
//     .then(() => {
//         console.log('File saved successfully.');
//     })
//     .catch(error => {
//         console.error('Error saving the file:', error);
//     });

/**
 * 在这个示例中，我们首先创建了一个新的Workbook对象，然后使用流来读取Excel文件的内容。接着，我们添加一个新的工作表，并向单元格写入内容。最后，我们将工作簿保存到一个新文件。

请确保你已将实际的Excel文件路径替换为正确的文件路径。.js环境下操作Excel文件，exceljs是一个稳定可靠、功能丰富的选择。它支持基于流的读取和写入，可以满足你的要求。




以下是基于流读取Excel文件中单元格并向单元格写入内容的示例代码：

安装exceljs库：

首先，在项目中安装 exceljs 库：

在此示例中，我们首先创建一个新的 Workbook 对象。然后，我们通过流读取 Excel 文件的内容。接着，我们获取第一个工作表并读取单元格 A1 的内容。随后，我们向单元格 B1 写入新的值，并将工作簿保存到新文件 output.xlsx。

请确保将实际的 Excel 文件路径替换为正确的路径。
 */

/*

const workbook = new ExcelJS.Workbook();

// 1. 读取Excel文件
fs.createReadStream('example.xlsx')
  .pipe(workbook.xlsx.createInputStream())
  .on('data', chunk => {
    // 处理每个数据块
    console.log('Received', chunk.length, 'bytes of data.');
  })
  .on('end', () => {
    console.log('Finished reading the file.');

    // 获取第一个工作表
    const worksheet = workbook.getWorksheet(1);

    // 2. 读取单元格内容
    const cellValue = worksheet.getCell('A1').value;
    console.log('Cell A1 Value:', cellValue);

    // 3. 写入单元格内容
    worksheet.getCell('B1').value = 'New Value';

    // 保存到文件
    workbook.xlsx.writeFile('output.xlsx')
      .then(() => {
        console.log('File saved successfully.');
      })
      .catch(error => {
        console.error('Error saving the file:', error);
      });
  });
*/