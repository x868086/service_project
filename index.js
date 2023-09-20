import { regInfo, regConfig } from './reg-config.js'
import { stringRegSummary, stringRegCont, readExcel } from './utils.js'


let a = 'Q23： 枝江市铭沃合作营业厅 ，1000M宽带提速包（30元）（湖北）AA，经核查属营业厅2023-05-31 10:10:52赠送1000M宽带提速包（30元）（湖北）和399组网套包得180元分6个月（组网优惠）（湖北）业务，免费6个月，赠费合约内未产生扣费，现已为客户解释处理，已取消提速包业务，用户满意'

let level = 0
let regContentResult = []
let { regTitle, regContent } = stringRegSummary(a, regConfig)


for (let i = 1; i < regConfig.length; i++) {
    if (i === regConfig.length) {
        break
    }
    level += 1
    regContentResult[i - 1] = stringRegCont(regContent, level, regTitle)
    // console.log(regContentResult)
}


readExcel()




