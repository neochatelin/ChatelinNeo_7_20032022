const connection = require('../sql_connection');
const fs = require('fs');

exports.createMessage = (req,res,next) => {
    new Promise((resolve, reject) => {
        connection.query(
                `INSERT INTO \`posts\` SET 
                \`user_id\` = ${req.userId},
                \`privateMessage\` = 0,
                \`content\` = '${req.body.content}',
                \`posts_attach\` = '${req.body.image}';`,
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
            `SELECT posts.id, 
                    posts.user_id, 
                    posts.content, 
                    posts.posts_attach, 
                    posts.likeId, 
                    posts.date, 
                    user.url_picture, 
                    user.name as user_name 
                FROM posts 
                INNER JOIN user ON posts.user_id = user.id 
            ORDER BY \`date\` LIMIT ${req.params.limit} OFFSET ${req.params.start};`,
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

    new Promise(function(resolve, reject) {
        connection.query(
            `SELECT * FROM \`posts\` WHERE id = ${req.params.id};`,
            function(err, result) {
                if(err) return reject( err );
                if(result && result.length===1 && (result[0].user_id===req.userId || connection.isAdmin(req.userId)))
                    return resolve(result[0]);
                reject("pas le droit !");
           }
        );
    })

    .then( (message) => {
        if(message.posts_attach!=='' && message.posts_attach !== 'undefined')
            fs.unlink(`./images/${message.posts_attach}`, (err)=>{
                console.log(err);
            })

        new Promise(function(resolve, reject) {
            connection.query(
                "DELETE FROM `posts` WHERE id = "+message.id+" LIMIT 1;",
                function(err, result) {
                    if(err || !result) return reject( err );
                    resolve();
                }
            );
        })

        .then(() => {
            res.status(200);
        })

        .catch(err =>{
            console.error(err)
            res.status(500).json ({error:"message introuvable"});
        })
    })
    
    .catch((err) => {
        console.error(err)
        res.status(500).json({error:err});
    })
}