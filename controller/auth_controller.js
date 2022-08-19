const bcrypt = require ("bcrypt")

const user_uc = require("../usecase/user")

exports.login = async (req, res) =>{
    let username = req.body.username
    let password = req.body.password

    let res_data = {
        status : 'failed',
        message : 'incorrect username or password',
        res_data : null
    }

    let user = await user_uc.getUserByUsername(username)
    if (!user){
        return res.status(400).json(res_data)
    }
    if(bcrypt.compareSync(password, user.password)!==true){
        return res.status(400).json(res_data)
    }
    res_data.status = 'ok'
    res_data.message = 'success'
    data.res_data = user
    return res.json(res_data)
}