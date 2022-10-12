
const api = require('../api/user');
const sendMessage = require('../utils/tool');
const { getDecryptToken, verificationToken } = require('../utils/token');
const moment = require('moment');

const getRouter = function(router) {
    // // 登录
    // router.post('/login', (req, res) => {
    //     api.login(req, res, (req, result) => {
    //         if(req.body.passWord === result[0].password) {
    //             let obj = {
    //                 token: '111111',
    //                 userName: result[0].name
    //             }
    //             sendMessage(1, res, obj)
    //         }
    //     })
    // })
    // 查询用户表头
    router.get('/user/getTableHead', (req, res) => {
        let isToken = verificationToken(req.headers['token'])
        if(!isToken) {
            if(getDecryptToken(req.headers['token']).ruleId != 1) return res.send({
                code: 403,
                message: '用户暂无此权限'
            })
            api.getTableHead(req, res, (result) => {
                let arr = []
                result.shift()
                result.forEach(el => {
                    if(el.Field === 'name' || el.Field === 'birthday' || el.Field === 'address' || el.Field === 'userCode') {
                        let obj = {};
                        obj.name = el.Comment
                        obj.prop = el.Field
                        arr.push(obj)
                    }
                });
                result = [...arr]
                Reflect.deleteProperty(result, "isDelete")
                result = result.filter(el => el.name !=='')
                sendMessage(1, res, result)
            });
        } else sendMessage(403, res)
    })
    
    // 查询用户表格数据
    router.get('/user/getTableData', (req, res) => {
        let isToken = verificationToken(req.headers['token'])
        if(!isToken) {
            if(getDecryptToken(req.headers['token']).ruleId != 1) return res.send({
                code: 403,
                message: '用户暂无此权限'
            })
            let obj = {}
            api.getTableData(req, res, (result,send) => {
                if(!send) {
                    obj.tableData = result
                    obj.tableData.forEach((el, index) => {
                        el.birthday = el.birthday ? moment(el.birthday).format('YYYY-MM-DD') : ''
                    })
                }
                else {
                    obj.count = result[0]['COUNT(*)']
                    sendMessage(1, res, obj)
                }
            });
        } else sendMessage(403, res)
    });
    
    // 新增用户数据
    router.post('/user/addData', (req, res) => {
        let isToken = verificationToken(req.headers['token'])
        if(!isToken) {
            if(getDecryptToken(req.headers['token']).ruleId != 1) return res.send({
                code: 403,
                message: '用户暂无此权限'
            })
            api.addData(req, res, (result) => {
                sendMessage(2, res)
            })
        } else sendMessage(403, res)
    })
    
    // 修改用户数据
    router.post('/user/setValue', (req, res) => {
        let isToken = verificationToken(req.headers['token'])
        if(!isToken) {
            if(getDecryptToken(req.headers['token']).ruleId != 1) return res.send({
                code: 403,
                message: '用户暂无此权限'
            })
            api.setValue(req, res, (result) => {
                sendMessage(2, res)
            })
        } else sendMessage(403, res)
    })
    
    // 删除用户数据
    router.get('/user/delete', (req, res) => {
        let isToken = verificationToken(req.headers['token'])
        if(!isToken) {
            if(getDecryptToken(req.headers['token']).ruleId != 1) return res.send({
                code: 403,
                message: '用户暂无此权限'
            })
            api.delete(req, res, (result) => {
                sendMessage(2, res)
            })
        } else sendMessage(403, res)
    })
}
module.exports = getRouter;