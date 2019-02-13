const bcrypt = require('bcrypt')

const saltRounds = 10;
const password = '123456';

bcrypt.genSalt(saltRounds, function(err, salt){
	bcrypt.hash(password, salt,function(err, hash){
		if (err) {
			console.log(err)
		}else{
			console.log(hash)
		}
	})
})
// 生成的密码：$2b$10$z10BtEpwAvRmRwb68jbCpu6NIMfmLy/tWtFHTkSRFJ8FytPVSXds6
// 所以存在数据的密码应该是：123456