/*
//工作簿视图控制在查看工作簿时 Excel 将打开多少个单独的窗口。
workbook.views = [
    {
      x: 0, y: 0, width: 10000, height: 20000,
      firstSheet: 0, activeTab: 1, visibility: 'visible'
    }
  ]

// 创建一个第一行和列冻结的工作表
const sheet = workbook.addWorksheet('My Sheet', {views:[{xSplit: 1, ySplit:1}]});

// 使用工作表 id 删除工作表
workbook.removeWorksheet(sheet.id)

// 按 name 提取工作表
const worksheet = workbook.getWorksheet('My Sheet');

// 按 id 提取工作表
const worksheet = workbook.getWorksheet(1);


//通过键，字母和基于1的列号访问单个列
const idCol = worksheet.getColumn('id');
const nameCol = worksheet.getColumn('B');
const dobCol = worksheet.getColumn(3);


//遍历此列中的所有当前单元格，包括空单元格
dobCol.eachCell({ includeEmpty: true }, function(cell, rowNumber) {
    // ...
  });

//添加一列新值
worksheet.getColumn(6).values = [1,2,3,4,5];

// 获取一个行对象。如果尚不存在，则将返回一个新的空对象
const row = worksheet.getRow(5);

// Get multiple row objects. If it doesn't already exist, new empty ones will be returned
const rows = worksheet.getRows(5, 2); 

// 获取工作表中的最后一个可编辑行（如果没有，则为 `undefined`）
const row = worksheet.lastRow;


const row = worksheet.getRow(5);
row.getCell(1).value = 5; // A5 的值设置为5
row.getCell('name').value = 'Zeb'; // B5 的值设置为 “Zeb” - 假设第2列仍按名称键入
row.getCell('C').value = new Date(); // C5 的值设置为当前时间


// 获取行并作为稀疏数组返回
row = worksheet.getRow(4).values;
row[3] //返回第四行第三列单元格的值

等价于
worksheet.getRow(4)
row.getCell(3).value //返回第四行第三列单元格的值


// 获取行后使用列键按对象分配行值
row.values = {
  id: 13,
  name: 'Thing 1',
  dob: new Date()
};

// 在该行下方插入一个分页符
row.addPageBreak();


// 遍历工作表中具有值的所有行
worksheet.eachRow(function(row, rowNumber) {
  console.log('Row ' + rowNumber + ' = ' + JSON.stringify(row.values));
});

// 遍历工作表中的所有行（包括空行）
worksheet.eachRow({ includeEmpty: true }, function(row, rowNumber) {
  console.log('Row ' + rowNumber + ' = ' + JSON.stringify(row.values));
});

// 连续遍历所有非空单元格
row.eachCell(function(cell, colNumber) {
  console.log('Cell ' + colNumber + ' = ' + cell.value);
});

// 遍历一行中的所有单元格（包括空单元格）
row.eachCell({ includeEmpty: true }, function(cell, colNumber) {
  console.log('Cell ' + colNumber + ' = ' + cell.value);
});

// 提交给流一个完成的行
row.commit();



// Add a couple of Rows by key-value, after the last current row, using the column keys
worksheet.addRow({name: 'John Doe', DOB: new Date(1970,1,1)});



*/



import ExcelJS from 'exceljs';
import fs from 'fs';

// 创建一个新的Workbook
const workbook = new ExcelJS.Workbook();

const worksheet = workbook.addWorksheet('My Sheet', {
    properties: {
        tabColor: { argb: 'FFaab00' },
        views: [{ state: 'frozen', xSplit: 1, ySplit: 1 }]
    }
});

worksheet.columns = [
    { header: 'Name', key: 'name', width: 32, outlineLevel: 0 },
    { header: 'D.O.B.', key: 'DOB', width: 10, outlineLevel: 1 }
];

worksheet.getColumn(5).values = [1, 2, 3, 4, 5, 6, 7, 8]
const newCol3Values = [1, 2, 3, 4, 5];
const newCol4Values = ['one', 'two', 'three', 'four', 'five'];
worksheet.spliceColumns(3, 1, newCol3Values, newCol4Values);

let row = worksheet.getRow(6)
row.values = {
    name: 'aaa',
    DOB: 'bbb'
}

worksheet.addRow({ name: 'Jane Doe1', DOB: new Date(1965, 1, 7) });

worksheet.eachRow({ includeEmpty: true }, function (row, rowNumber) {
    console.log('Row ' + rowNumber + ' = ' + JSON.stringify(row.values));
});

row.eachCell({ includeEmpty: true }, function (cell, colNumber) {
    console.log('Cell ' + colNumber + ' = ' + cell.value);
});

row.commit();




workbook.xlsx.writeFile('./excel-file/output.xlsx')
    .then(() => {
        console.log('File saved successfully.');
    })
    .catch(error => {
        console.error('Error saving the file:', error);
    });

