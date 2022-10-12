module.exports = 
    // type 返回类型
    function sendMessage(type, res, result) {
        if(type === 403) return res.sendStatus(403)
        let obj = { code: 200, message: '操作成功' }
        switch(type)
        {
            case  1 : 
            obj = {
                ...obj,
                data: result,
            }
            break;
            // case  403 : 
            // obj = {
            //     code: 403,
            // }
            // break;
        }
        res.send(obj)
    }
