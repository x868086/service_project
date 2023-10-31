import path from 'path';
import fs from 'fs';



import ExcelJS from 'exceljs';
const workbook = new ExcelJS.Workbook();
/**
 * Reads an Excel file from the specified filepath and returns an array of Excel files.
 *
 * @param {string} filepath - The path to the directory containing the Excel files.
 * @return {array} An array of Excel files.
 */

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



/**
 * Reads an Excel file from a given filepath.
 *
 * @param {string} filepath - The path to the Excel file.
 * @return {undefined} This function does not return a value.
 */
function readExcelStream(filepath) {
  fs.createReadStream(filepath)
    // .pipe(workbook.xlsx.createInputStream())
    .on('data', chunk => {
      // 处理每个数据块
      console.log('Received', chunk.length, 'bytes of data.');
    })
    .on('end', () => {
      console.log(`读取文件结束，文件路径为${filepath}`);
    })
    .on('error', error => {
      throw new Error(`读取文件错误${error}`)
    })

  const workbook = new ExcelJS.stream.xlsx.WorkbookReader(filepath);
  for await (const worksheetReader of workbookReader) {
    for await (const row of worksheetReader) {
      console.log(row)
    }
  }
}


function getWorkSheet(workbook,) {
  workbook.xlsx.read(stream)
  // const worksheet = workbook.getWorksheet('My Sheet');
  // workbook.eachSheet(function(worksheet, sheetId) {
  //   console.log(worksheet,sheetId)
  // });

}



export {
  readDirPath,
  readExcelStream
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