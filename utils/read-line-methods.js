import readline from "readline";


const askQuestion = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// askQuestion.question('您要拆分单元格表头是什么: ', (name) => {
//     console.log('正在拆分, ' + name);
//     askQuestion.close();
// });

// askQuestion.on("line", function (line) {
//     console.log("您输入的内容是：", line);
// });

// askQuestion.on("close", function () {
//     console.log("您已退出输入框。");
// });
// askQuestion.write(data[, mode])：向命令行输出data，可以模拟用户输入命令。

// askQuestion.on('error', (error) => {
//     console.error('读取命令行发生错误：', error);
//   });




// import readline from "readline";

// async function askQuestion() {
//     const rl = readline.createInterface({
//         input: process.stdin,
//         output: process.stdout,
//     });

//     try {
//         const question = '要拆分列的表头名称是:';
//         rl.question(question, (answer) => {
//             console.log(`客服全量工单辅助分析系统: ${question}`);
//             console.log(`用户: ${answer}`);
//             rl.close()
//         });
//     } catch (err) {
//         console.error(err);
//     }
// }

export {
    askQuestion
}

