/*
//工作簿视图控制在查看工作簿时 Excel 将打开多少个单独的窗口。
workbook.views = [
    {
      x: 0, y: 0, width: 10000, height: 20000,
      firstSheet: 0, activeTab: 1, visibility: 'visible'
    }
  ]


// 创建一个新的Workbook
// const workbook = new ExcelJS.Workbook();


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



//处理单个单元格
const cell = worksheet.getCell('C3');
cell.value = new Date(1968, 5, 1);

cell.type //单元格类型
Excel.ValueType //Excel中的所有类型

// 使用单元格的字符串值
myInput.value = cell.text;




//读取excel
// 从文件读取
const workbook = new Excel.Workbook();
await workbook.xlsx.readFile(filename);
// ... 使用 workbook


// 从流读取
const workbook = new Excel.Workbook();
await workbook.xlsx.read(stream);
// ... 使用 workbook


// 从 buffer 加载
const workbook = new Excel.Workbook();
await workbook.xlsx.load(data);
// ... 使用 workbook


// 写入文件
const workbook = createAndFillWorkbook();
await workbook.xlsx.writeFile(filename);

// 写入流
await workbook.xlsx.write(stream);

// 写入 buffer
const buffer = await workbook.xlsx.writeBuffer();



//读取csv文件
// 从文件读取
const workbook = new Excel.Workbook();
const worksheet = await workbook.csv.readFile(filename);
// ... 使用 workbook 或 worksheet


// 从流中读取
const workbook = new Excel.Workbook();
const worksheet = await workbook.csv.read(stream);
// ... 使用 workbook 或 worksheet


//写入csv文件
// 写入文件
const workbook = createAndFillWorkbook();
await workbook.csv.writeFile(filename);

// 写入流
// 请注意，您需要提供 sheetName 或 sheetId 以正确导入到 csv
await workbook.csv.write(stream, { sheetName: 'Page name' });


*/




/**
 * 文章：这一定是前端导出Excel界的天花板~
 * 
 * // 引入依赖
import ExcelJS from "exceljs";
import FileSaver from "file-saver";

// 导出Excel
const exportExcel = () => {
  // 创建工作簿
  const _workbook = new ExcelJS.Workbook();
  // 添加工作表
  const _sheet1 = _workbook.addWorksheet("sheet1");

  // 设置表格内容
  const _titleCell = _sheet1.getCell("A1");
  _titleCell.value = "Hello ExcelJS!";

  // 导出表格
  _workbook.xlsx.writeBuffer().then((buffer) => {
    let _file = new Blob([buffer], {
      type: "application/octet-stream",
    });
    FileSaver.saveAs(_file, "ExcelJS.xlsx");
  });
};

设置表头
我们一般把每列的第一个设置为表头，并且可以设置每一列的宽度。
_sheet1.columns = [
    { header: "名次", key: "sort", width: 10 },
    { header: "班级", key: "class", width: 20 },
    { header: "姓名", key: "name", width: 20 },
    { header: "得分", key: "score", width: 10 },
];

添加数据
表头设置后，我们可以直接根据 key 值去添加每一行的数据。
_sheet1.addRow({ sort: 1, class: "前端三班", name: "Buer", score: 99 });
_sheet1.addRow({ sort: 2, class: "前端一班", name: "Jack", score: 86 });
_sheet1.addRow({ sort: 3, class: "前端一班", name: "Mary", score: 58 });

读取列
getColumn 用于读取当前列的数据，我们可以使用 eachCell 进行遍历单元格。
_sheet1.getColumn("score").eachCell((cell, rowIdx) => {
    console.log(cell.value, rowIdx);
    // 得分, 1
    // 99, 2
    // 86, 3
});

获取行
getRow 用于读取每一样，同样我们可以使用 eachCell 进行遍历单元格
_sheet1.getRow(1).eachCell((cell, rowIdx) => {
    console.log(cell.value, rowIdx);
    // 名次, 1
    // 班级, 2
    // 姓名, 3
    // 得分, 4
});

样式
我们将读取到的表头添加一些样式，让 Excel变得看起来更加的好看。
// 获取第一行
const _titleCell = _sheet1.getRow(1);
// 设置第一行的高度
_titleCell.height = 30;
// 设置第一行的字体样式
_titleCell.font = {
    name: "黑体",
    bold: true,
    size: 14,
    color: {
        argb: "FF999999",
    },
};
// 设置第一行的对齐方式（水平垂直）
_titleCell.alignment = {
    vertical: "middle",
    horizontal: "center",
};
// 设置边框线的样式
_titleCell.border = {
    top: {
        style: "medium",
        color: {
            argb: "FFEBEEF5",
        },
    },
    left: {
        style: "medium",
        color: {
            argb: "FFEBEEF5",
        },
    },
    bottom: {
        style: "medium",
        color: {
            argb: "FFEBEEF5",
        },
    },
    right: {
        style: "medium",
        color: {
            argb: "FFEBEEF5",
        },
    },
};
// 设置单元的样式
_titleCell.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: {
        argb: "FFF5F7FA",
    },
};

在 exceljs 中所有的的颜色值均为 argb 格式，且不带 # 符号。
我们可以使用 eachCell 来遍历单元格，给每一个单元格添加上样式。
const _titleCell = _sheet1.getRow(1);
_titleCell.height = 30;
_titleCell.eachCell((cell, colIdx) => {
    cell.font = {
        name: "黑体",
        bold: true,
        size: 14,
        color: {
            argb: "FF999999",
        },
    };
    cell.alignment = {
        vertical: "middle",
        horizontal: "center",
    };
    cell.border = {
        top: {
            style: "medium",
            color: {
                argb: "FFEBEEF5",
            },
        },
        left: {
            style: "medium",
            color: {
                argb: "FFEBEEF5",
            },
        },
        bottom: {
            style: "medium",
            color: {
                argb: "FFEBEEF5",
            },
        },
        right: {
            style: "medium",
            color: {
                argb: "FFEBEEF5",
            },
        },
    };
    cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: {
            argb: "FFF5F7FA",
        },
    };
});

自动筛选
在很多的时候我们需要对表格中每一列的数据进行筛选，比如直接筛选班级，我们可以通过 autoFilter 来添加筛选。
_sheet1.autoFilter = "B1";

// 当然我们也可以直接添加多个列筛选
_sheet1.autoFilter = "B1：C1";

合并表格
表格的合并应该是业务需求中最频繁的功能。当然这一功能使用 xlsx 也可以实现，前提是你的项目对表格没有复杂的需求。
不同的合并方向
// 按左，右合并
_sheet1.mergeCells("A1:A2");
// 按上，下合并
_sheet1.mergeCells("A1:B1");
// 按左上，右下合并
_sheet1.mergeCells("A1:B2");


合并并设置样式
// 合并
_sheet1.mergeCells("A6:B9");
_sheet1.getCell("A6").value = "汇总";
// 设置合并后的样式
_sheet1.getCell("A6").alignment = {
    vertical: "middle",
    horizontal: "center",
};
注意，已经合并的单元格无法继续合并！


公式值
我们可以直接对表格中的数据进行公式计算，比如 求和(SUM)，平均数(AVERAGE) 等等。
_sheet1.getCell("C6").value = "总分";
_sheet1.getCell("C7").value = "最高分";
_sheet1.getCell("C8").value = "最低分";
_sheet1.getCell("C9").value = "平均分";

// 求和
_sheet1.getCell("D6").value = { formula: "=SUM(D2:D4)" };
// 最大值
_sheet1.getCell("D7").value = { formula: "=MAX(D2:D4)" };
// 最小值
_sheet1.getCell("D8").value = { formula: "=MIN(D2:D4)" };
// 平均数
_sheet1.getCell("D9").value = { formula: "=AVERAGE(D2:D4)" };


数据验证
有时候我们需要为某个单元格添加数据可以方便直接下拉选择指定的值。
_sheet1.getCell("B2").dataValidation = {
    type: "list",
    allowBlank: true,
    formulae: ['"软件一班,软件二班,软件三班"'],
};

条件格式
我们可以为指定单元格添加数据验证，比如为不及格的分数添加红色背景。
// 为 D2:D4添加条件格式
_sheet1.addConditionalFormatting({
    ref: "D2:D4",
    rules: [
        {
            type: "cellIs",
            operator: "lessThan",
            priority: 1,
            formulae: [60],
            style: {
                fill: {
                    type: "pattern",
                    pattern: "solid",
                    bgColor: { argb: "FFFFC0CB" },
                },
            },
        },
    ],
});


 * 
 * 
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



// 读取单元格格式
/**
* ExcelJS.ValueType
  Boolean:
  9
  Date:
  4
  Error:
  10
  Formula:
  6
  Hyperlink:
  5
  Merge:
  1
  Null:
  0
  Number:
  2
  RichText:
  8
  SharedString:
  7
  String:
  3
*/
switch (cell.type) {
  case 3:
    val = cell.value
    break;
  case 8:
    val = cell.value.richText[0].text
    break;
  default:
    val = cell.value
    break;
}