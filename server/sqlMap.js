let sqlMap = {
    newValue: 'INSERT INTO test (name,birthday,address) VALUES ',
    delValue: 'UPDATE test SET isDelete = true WHERE id = ?',
    // delValue: 'DELETE FROM test WHERE id = ?',
    setValue: 'UPDATE test SET ',
    getTableHead: 'SHOW FULL COLUMNS FROM test',
    getTableData: '',
    getTableCount: "SELECT COUNT(*) FROM test WHERE isDelete LIKE '0'"
}

module.exports = sqlMap