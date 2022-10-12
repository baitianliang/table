
const api = require('../api/login');
const sendMessage = require('../utils/tool');
const { generateToken } = require('../utils/token');
const moment = require('moment');

const getRouter = function(router) {
    // 登录
    router.post('/login', (req, res) => {
        api.login(req, res, (req, result) => {
            if(req.body.passWord === result[0].password) {
                const tokenData = {
                    id: result[0].id,
                    userCode: result[0].userCode,
                    password: result[0].password,
                    ruleId: result[0].ruleId,
                }
                let obj = {
                    token: generateToken(tokenData),
                    userName: result[0].name,
                    ruleId: result[0].ruleId
                }
                sendMessage(1, res, obj)
            } else {
                res.send({message: '用户名或密码错误!'})
            }
        })
    })
}
module.exports = getRouter;