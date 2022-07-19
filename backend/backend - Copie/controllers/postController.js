const multer = require('multer');
const   connection = require('../sql_connection');

exports.createMessage = (req,res,next) => {
    new Promise((resolve, reject) => {
        connection.query(
            `INSERT INTO \`posts\` SET 
                \`user_name\` = '${req.userName}',
                \`user_id\` = ${req.userId},
                \`privateMessage\` = 0,
                \`content\` = '${req.body.data.content}',
                \`posts_attach\` = ${req.file ? req.file.filename : null};`,
            function(err) {
                if(err)
                    reject(err)
                else
                    resolve()
            }
        );
    }).then(()=>{
        res.status(200).json('post envoyer');
    }).catch(err =>{
        res.status(400).json({"fail to createmessage": err});
    })
}
exports.like = () => {
    new Promise((resolve, reject) => {
        connection.query(
            `SELECT * FROM posts ORDER BY \`date\` LIMIT ${req.params.limit} OFFSET ${req.params.start};`,
            function(err, result) {
                if(err)
                    reject(err)
                else
                    resolve(result)
            }
        );
    }).then((result)=>{
        res.status(200).json(result);
    }).catch(err =>{
        res.status(400).json({"error": err});
    })
}
exports.getMessages = (req,res,next) => {
    new Promise((resolve, reject) => {
        connection.query(
            `SELECT * FROM posts ORDER BY \`date\` LIMIT ${req.params.limit} OFFSET ${req.params.start};`,
            function(err, result) {
                if(err)
                    reject(err)
                else
                    resolve(result)
            }
        );
    }).then((result)=>{
        res.status(200).json(result);
    }).catch(err =>{
        res.status(400).json({"error": err});
    })
}

exports.like = (req, res, next) => {
    new Promise((resolve, reject) => {
        connection.query(
            `SELECT \`likeCount\` FROM \`posts\` WHERE id=${req.params.id} ORDER BY \`date\` ASC LIMIT ${req.params.size} OFFSET ${req.params.start} ;`,
            function(err, result) {
                if(err)
                    reject(err)
                else
                    resolve(result)
            }
        );
    })
}

exports.getPrivateMessages = (req,res,next) => {
    new Promise((resolve, reject) => {
        connection.query(
            `SELECT * FROM \`posts\` WHERE 
                        user_id = ${req.params.id} AND privateMessage = ${req.userId} OR 
                        privateMessage = ${req.params.id} AND user_id = ${req.userId} ORDER BY \`date\` ASC LIMIT ${req.params.size} OFFSET ${req.params.start} ;`,
            function(err, result) {
                if(err)
                    reject(err)
                else
                    resolve(result)
            }
        );
    }).then((result)=>{
        res.status(200).json(result);
    }).catch(err =>{
        res.status(400).json({"error": err});
    })
}

exports.deleteMessage = (req,res,next) => {
    
    let query = "DELETE FROM `posts` WHERE id = "+req.params.id+" AND user_id = "+req.userId+";";
    if(connection.isAdmin(req.userId))
        query = "DELETE FROM `posts` WHERE id = "+req.params.id+";";

    new Promise(function(resolve, reject) {
        connection.query(
            query,
            function(err, result) {
                if(err)
                    reject( err );
                else if(result != '')
                    resolve(result);
                else
                    res.status(404).json({'error': 'post introuvable'});
            }
        );
    })
    .then(result => {
        res.status(200).json( {result} );
    })
    .catch(err =>{
        throw err
    })
}