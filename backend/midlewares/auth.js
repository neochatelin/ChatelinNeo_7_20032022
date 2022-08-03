const jwt = require('jsonwebtoken');
const connection = require('../sql_connection');

exports.auth = (req, res, next) => {
    if(!req.cookies.session){
        return res.status(500).json({error: "aucun cookies de session"});
    }
    else{
        const token = JSON.parse(req.cookies.session).token;
        try{
            const decodedToken = jwt.verify(token, process.env.tokenPassword);
            const id = decodedToken.id;

            if(!connection.userList.has(id))
                return res.status(404).json({"error": "user id not found"})
            req.isAdmin = connection.isAdmin(id);
            req.userId = id;
            req.userName = decodedToken.name;
            next();

        }catch(err){
            console.log("error from auth:",err)
            return res.status(500).json({"error" : err});
        }
    }
}

exports.end = (req, res)=>{
    res.status(200).json({msg: 'authentifiation success'});
}