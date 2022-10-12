const jwt = require('jsonwebtoken');
let secret = 'demo';	//签名
module.exports={
	//生成token
	generateToken(data) {
		let token = jwt.sign(data,secret);
		return token;
	},
	//解密token
	getDecryptToken(token){
		let data = jwt.verify(token, secret);
		return data;
	},
	//验证token
	verificationToken(token){
        if(!token) return true
		let data = jwt.verify(token, secret, (err, payload) => {
            return err
        });
		return data;
	}
}