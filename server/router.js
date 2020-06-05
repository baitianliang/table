const express = require('express');
const router = express.Router();
const api = require('./api');
const moment = require('moment');
const sqlMap = require('./sqlMap');

// 查询表头
router.get('/getTableHead', (req, res) => {
    api.getTableHead(req, res, (result) => {
        let arr = []
        result.shift()
        result.forEach(el => {
                let obj = {};
                obj.name = el.Comment
                obj.prop = el.Field
                arr.push(obj)
        });
        result = [...arr]
        Reflect.deleteProperty(result, "isDelete")
        result = result.filter(el => el.name !=='')
        res.json(result);
    });
})

// 查询表格数据
router.post('/getTableData/:page/:size', (req, res) => {
    let obj = {}
    api.getTableData(req, res, (result,send) => {
        if(!send) {
            obj.tableData = result
            obj.tableData.forEach((el, index) => {
                obj.tableData[index].birthday = moment(obj.tableData[index].birthday).format('YYYY-MM-DD')
            })
        }
        else {
            obj.count = result[0]['COUNT(*)']
            res.json(obj);
        }
    });
});

// 新增数据
router.post('/addData', (req, res) => {
    api.addData(req, res)
})

// 修改数据
router.post('/setValue/:id', (req, res) => {
    api.setValue(req, res)
})

// 删除数据
router.delete('/delete/:id', (req, res) => {
    api.delete(req, res)
})
module.exports = router;