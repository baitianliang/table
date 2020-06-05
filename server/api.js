const mysql = require('mysql');
const dbConfig = require('./db');
const sqlMap = require('./sqlMap');

const pool = mysql.createPool({
    ...dbConfig.mysql,
    multipleStatements: true
});

module.exports = {
    // 查询表头
    getTableHead(req, res, next) {
        pool.getConnection((err, connection) => {
            let sql = sqlMap.getTableHead;
            connection.query(sql, (err, result) => {
                next(result)
            })
        })
    },
    // 查询
    getTableData(req, res, next) {
        let pageInfo = req.params
        let num = (pageInfo.page - 1) * pageInfo.size
        let str = ''
        for (let val in req.body) {
            if (req.body[val]) {
                str += ' AND ' + val + ' LIKE ' + '\'%' + req.body[val] + '%\'';
            }
        }
        str = 'SELECT id, name, birthday, address FROM test WHERE isDelete = \'0\' ' + str + ' LIMIT ' + num + ',' + pageInfo.size
        pool.getConnection((err, connection) => {
            let sql = str, sql_count = sqlMap.getTableCount
            connection.query(sql, (err, result) => {
                sqlMap.getTableData = ''
                next(result)
            })
            connection.query(sql_count, (err, result) => {
                // connection.release();
                next(result,true)
            })
        })
    },

    // 新增数据
    addData(req, res, next) {
        let str = ''
        str = sqlMap.newValue + `('` + req.body.name + `','` + req.body.birthday + `','` + req.body.address + `')`
        pool.getConnection((err, connection) => {
            connection.query(str, (err, result) => {
                res.json(result)
            })
        })
    },
    // 修改
    setValue(req, res, next) {
        let id = req.params.id;
        let str = ''
        for (let val in req.body) {
            if (!str)
            str = val + ' = ' + '\'' + req.body[val] + '\' '
            else
            str += ', ' + val + ' = ' + '\'' + req.body[val] + '\' '
        }
        str = sqlMap.setValue + str + 'WHERE id = ' + id
        pool.getConnection((err, connection) => {
            connection.query(str, (err, result) => {
                res.json(result);
                // connection.release();
            })
        })
    },
    // 删除
    delete(req, res) {
        let id = req.params.id
        pool.getConnection((err, connection) => {
            connection.query(sqlMap.delValue, [id], (err, result) => {
                res.json(result)
            })
        })
    }
}