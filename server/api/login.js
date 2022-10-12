const mysql = require('mysql');
const dbConfig = require('../db');

const pool = mysql.createPool({
    ...dbConfig.mysql,
    multipleStatements: true
});

module.exports = {
    // 登录
    login(req, res, next) {
        let str = ''
        str = `SELECT id,password,name,userCode,ruleId FROM user WHERE isDelete = 0 AND userCode = '${req.body.userCode}'`
        pool.getConnection((err, connection) => {
            if(err) return res.send(err)
            connection.query(str, (err, result) => {
                if(err) return next(err)
                next(req, result)
            })
        })
    }
}