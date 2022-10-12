const mysql = require('mysql');
const dbConfig = require('../db');
const sqlMap = require('../sqlMap');

const pool = mysql.createPool({
    ...dbConfig.mysql,
    multipleStatements: true
});

module.exports = {
    // 登录
    login(req, res, next) {
        let str = ''
        str = `SELECT password,name FROM user WHERE isDelete = 0 AND userCode = '${req.body.userCode}'`
        pool.getConnection((err, connection) => {
            if(err) return res.send(err)
            connection.query(str, (err, result) => {
                if(err) return res.send(err)
                next(req, result)
            })
        })
    },
    // 查询表头
    getTableHead(req, res, next) {
        pool.getConnection((err, connection) => {
            if(err) return res.send(err)
            let sql = sqlMap.getTableHead;
            connection.query(sql, (err, result) => {
                if(err) return res.send(err)
                next(result)
            })
        })
    },
    // 查询
    getTableData(req, res, next) {
        let pageInfo = req.query
        let num = (pageInfo.page - 1) * pageInfo.size
        let selectStr = ''
        for (let val in pageInfo) {
            if (req.query[val] && val !== 'page' && val !== 'size' ) {
                selectStr += ` AND ${val} LIKE \'%${req.query[val]}%\'`;
            }
        }
        str = `SELECT id, name, birthday, address, userCode FROM user WHERE isDelete = 0 ${selectStr} LIMIT ${num},${pageInfo.size}`
        pool.getConnection((err, connection) => {
            if(err) return res.send(err)
            let sql = str, sql_count = sqlMap.getTableCount + selectStr
            connection.query(sql, (err, result) => {
                if(err) return res.send(err)
                next(result)
            })
            connection.query(sql_count, (err, result) => {
                if(err) return res.send(err)
                next(result,true)
            })
        })
    },

    // 新增数据
    addData(req, res, next) {
        let searchStr = `SELECT * FROM user WHERE isDelete = 0 AND userCode = '${req.body.userCode}'`
        let code = '', value = ''
        for (const key in req.body) {
            code += code ? ',' + key : key
            value += value ? `,'${req.body[key]}'` : `'${req.body[key]}'`
        }
        let str = `INSERT INTO user (${code},ruleId,password) VALUES (${value},'2','123456')`
        pool.getConnection((err, connection) => {
            if(err) return res.send(err)
            connection.query(searchStr, (err, result) => {
                if(err) return res.send(err)
                if(result.length !== 0) {
                    // next(result)
                    return res.send({
                        code: 500,
                        message: '已有此用户名,请修改后重试!'
                    })
                } else {
                    connection.query(str, (err, result) => {
                        // res.json(result)
                        if(err) return res.send(err)
                        next(result)
                    })
                }
            })
        })
    },
    // 修改
    setValue(req, res, next) {
        let id = req.body.id;
        let str = ''
        for (let val in req.body) {
            if(val !== 'id') {
                if (!str)
                str = `${val} = \'${req.body[val]}\' `
                else
                str += `, ${val} = \'${req.body[val]}\' `
            }
        }
        str = sqlMap.setValue + str + 'WHERE id = ' + id
        pool.getConnection((err, connection) => {
            if(err) return res.send(err)
            connection.query(str, (err, result) => {
                if(err) return res.send(err)
                // res.json(result);
                next(result)
                // connection.release();
            })
        })
    },
    // 删除
    delete(req, res, next) {
        let id = req.query.id
        pool.getConnection((err, connection) => {
            if(err) return res.send(err)
            connection.query(sqlMap.delValue, [id], (err, result) => {
                // res.json(result)
                next(result)
            })
        })
    }
}