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
const excelPath = path.join(__dirname, configs.excelFilePath)


// 返回文件扩展名
const filePath1 = '/path/to/file.txt';

path.extname(filePath1) //输出'.txt'
