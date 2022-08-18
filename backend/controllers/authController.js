const connection = require("../sql_connection")
    , bcrypt = require("bcrypt")
    , jwt = require("jsonWebToken")
    
    , hash = (passwd)=>{
        return bcrypt.hash(passwd, 10);
},  ValidateUser = (user) => {
        if(!user.name || !user.email || !user.passwd){
            return false;
        }
        return ( (user.name).match(/^(?=.{3,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/) &&
            (user.email).match(/^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) &&
            (user.passwd).match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,20}$/) );
};

// 

exports.login = (req, res, next) => {
    new Promise(function(resolve, reject) {
        connection.query(
            `SELECT * FROM \`user\` WHERE email = '${req.body.data.email}'`,
            function(err, result) {
                if(err)
                    reject( err );
                else if(result != ''){
                    resolve(result);
                }
                else{
                    res.status(404).json({error:'email ou mdp incorect'});
                }
            }
        );
    })
    .then(result => {
        bcrypt.compare(req.body.data.passwd, result[0].password)
        .then((validated)=>{
            if(validated){
                jwt.sign( {id: result[0].id, name: result[0].name}, process.env.tokenPassword, {expiresIn: '1h'}, (err, TOKEN)=>{
                    if (err)
                        throw err;
                        
                    res.cookie("session", TOKEN, {maxAge: 1 * 60* 60 * 1000})
                    res.status(202).json({
                        name: result[0].name,
                        email: result[0].email,
                        id: result[0].id,
                        url_picture: result[0].url_picture,
                        isAdmin: result[0].isAdmin,
                        token: TOKEN
                    });
                })
            }
            else{
                res.status(404).json({error:'email ou mdp incorect'});
            }
        })
        .catch((err)=>console.log(err));
    })
    .catch(err =>{
        throw err
    })
}

exports.signup = async (req, res, next) => {
    if(ValidateUser(req.body.data)) {
        hash(req.body.data.passwd).then(h=>{
            new Promise((resolve, reject) => {
                connection.query(
                    `INSERT INTO \`user\` SET 
                        \`name\` = '${req.body.data.name}',
                        \`email\` = '${req.body.data.email}',
                        \`password\` = '${h}';`,
                    function(err, results) {
                        if(err)
                            reject(err)
                        else
                            resolve()
                    }
                );
            }).then(() => {
                connection.refresh();
                res.status(201).json('utilisateur crée');
            }).catch(err =>{
                res.status(400).json({error:err});
            })
        }).catch(err => console.log("hash failed"));
    }
    else{
        res.status(400).json({error:'champ incorect'});
    }
}

exports.profile = (req, res, next) => {

}