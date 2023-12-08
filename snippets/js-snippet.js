// esmodule 模块中使用__dirname
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


// 返回文件扩展名
const filePath1 = '/path/to/file.txt';

path.extname(filePath1) //输出'.txt'



//fs-extra模块 文件操作
/*
fs-extra是一个Node.js模块，它添加了一些常用的文件系统方法，这些方法在Node.js的原始fs模块中没有提供。
fs-extra建立在fs模块之上，并且添加了一些功能，使其更加易于使用和方便。
npm install fs-extra
const fs = require('fs-extra');
const stats = fs.statSync('example.txt');
stats.isFile()：检查是否为文件。
stats.isDirectory()：检查是否为目录。
stats.size：文件的大小（以字节为单位）。
stats.mtime：最后修改时间。
stats.atime：最后访问时间。
stats.ctime：最后更改时间。

fs-extra提供的一些额外功能包括：
fs-extra.copy()：复制文件或目录。
fs-extra.move()：移动（重命名）或复制文件或目录。
fs-extra.emptyDir()：清空目录。
fs-extra.ensureDir()：确保目录存在。
fs-extra.ensureFile()：确保文件存在。
fs-extra.readJson()：读取JSON文件并返回JSON对象。
fs-extra.writeJson()：将JSON对象写入文件。
*/