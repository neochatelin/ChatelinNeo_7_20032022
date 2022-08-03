const multer = require('multer');
const { refresh } = require('../sql_connection');
const   connection = require('../sql_connection');

exports.createMessage = (req,res,next) => {
    new Promise((resolve, reject) => {
        connection.query(
                `INSERT INTO \`posts\` SET 
                \`user_name\` = '${req.userName}',
                \`user_id\` = ${req.userId},
                \`privateMessage\` = 0,
                \`content\` = '${req.body.content}',
                \`posts_attach\` = '${req.file.filename}';`,
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
        res.status(400).json({"fail to create message": err});
    })
}
exports.like = () => {
    new Promise((resolve, reject) => {
        connection.query(
            `SELECT \`\` FROM posts WHERE id=${req.params.id};`,
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
            `SELECT \`likeId\` FROM \`posts\` WHERE id=${req.params.id};`,
            function(err, result) {
                if(err)
                    reject(err)
                else{
                    let likeIdArray = (result[0].likeId === "") ? [] : result[0].likeId.split(',');

                    if(!result[0].likeId.split(',').includes(''+req.userId)){
                        likeIdArray.push(req.userId);
                    }else{
                        for (let i = 0; i < likeIdArray.length; i++) {
                            if(likeIdArray[i] === ''+req.userId){
                                likeIdArray.splice(i, 1);
                            }
                        }
                    }
                    new Promise((resolve, reject)=>{
                        connection.query(
                            `UPDATE \`posts\` SET likeId='${''+likeIdArray}' WHERE id=${req.params.id};`,
                            function(err, result) {
                                if(err)
                                    reject(err)
                            }
                        )
                    }).catch(err =>{
                        res.status(400).json({"error": err});
                    })
                }
            }
        );
    }).then((result)=>{
        res.status(200).json(result);
    }).catch(err =>{
        res.status(400).json({"error": err});
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