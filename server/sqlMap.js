let sqlMap = {
    delValue: 'UPDATE user SET isDelete = true WHERE id = ?',
    // delValue: 'DELETE FROM user WHERE id = ?',
    setValue: 'UPDATE user SET ',
    getTableHead: 'SHOW FULL COLUMNS FROM user',
    getTableData: '',
    getTableCount: "SELECT COUNT(*) FROM user WHERE isDelete = 0"
}

module.exports = sqlMap