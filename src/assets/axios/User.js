import instance from '../js/base_axios'
import host from '../js/common'
const Qs = require('qs');

export default {
    login(form) {
        return instance.post(`${host}/api/login`, form)
    },
    // 用户列表头
    getUserTableHead() {
        return instance.get(`${host}/api/user/getTableHead`)
    },
    // 用户列表
    getUserTableData(form) {
        return instance.get(`${host}/api/user/getTableData`, {params: form})
    },
    // 新增用户
    addUserInfo(form) {
        return instance.post(`${host}/api/user/addData`, form)
    },
    // 删除用户
    deleteUserInfo(id) {
        return instance.get(`${host}/api/user/delete?id=${id}`)
    },
    // 修改用户信息
    updateUserInfo(form) {
        return instance.post(`${host}/api/user/setValue`, form)
    }
}
