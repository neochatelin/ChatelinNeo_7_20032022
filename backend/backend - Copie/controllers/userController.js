const   connection = require('../sql_connection'),
        jwt = require('jsonwebtoken');

exports.getUser = (req, res, next)=>{
    new Promise(function(resolve, reject) {
        connection.query(
            `SELECT * FROM user WHERE id = ${req.params.id};`,
            function(err, result) {
                if(err)
                    reject( err );
                else if(result != '')
                    resolve(result);
                else
                    res.status(300).json({'error': 'vous ne pouver pas modifier l\'utilisateur'});
            }
        );
    }).then((result)=>{
        const user = result;
        if (!user)
            return res.status(404).json({error:"user not found"});
        return res.status(200).json({user});
    })
}

exports.getUsers = (req, res, next)=>{
    new Promise(function(resolve, reject) {
        connection.query(
            `SELECT id, name, url_picture, email FROM user;`,
            function(err, result) {
                if(err)
                    reject( err );
                else if(result != '')
                    resolve(result);
                else
                    res.status(300).json({'error': 'vous ne pouver pas modifier l\'utilisateur'});
            }
        );
    }).then((result)=>{
        if (!result)
            return res.status(404).json({error:"bad request"});
        return res.status(200).json({users: result});
    })
}

exports.updateUser = (req, res, next)=>{
    const user_id = jwt.verify( (JSON.parse(req.cookies.session).token).split(' ')[1],
                                process.env.tokenPassword).id;
    if(!req.body.data.name && !req.body.data.email)
        return res.status(500).json({error: 'bad request'});
    new Promise(function(resolve, reject) {
        connection.query(
            `UPDATE user SET name = '${req.body.data.name}' WHERE id = ${user_id};`,
            function(err, result) {
                if(err)
                    reject( err );
                else if(result != '')
                    resolve(result);
                else
                    res.status(300).json({'error': 'vous ne pouver pas modifier l\'utilisateur'});
            }
        );
    })
    .then(result => {
        res.status(200).json( {message:"success"} );
    })
    .catch(err =>{
        throw err
    })
}
exports.updateUserProfilePicture = (req, res, next)=>{
    const user_id = jwt.verify( (JSON.parse(req.cookies.session).token),
                                process.env.tokenPassword).id;
    new Promise(function(resolve, reject) {
        connection.query(
            "UPDATE user SET url_picture='"+req.file.filename+"' WHERE id="+user_id+";",
            function(err, result) {
                if(err)
                    reject( err );
                else if(result != '')
                    resolve(result);
                else
                    res.status(300).json({'error': 'vous ne pouver pas modifier l\'utilisateur'});
            }
        );
    })
    .then(result => {
        res.status(200).json( {message:"success"} );
    })
    .catch(err =>{
        throw err
    })

}
exports.deleteUser = (req, res, next)=>{
    const connectedUser = req.userId;
    const userToDeleteId = req.params.id;
    const isAdmin = req.isAdmin;

    if (connectedUser !== userToDeleteId && !isAdmin)
        return res.status(300).json({"error": "not allowed"});
    if (connection.isAdmin(userToDeleteId) && connectedUser !== userToDeleteId)
        return res.status(300).json({"error": "not allowed to delete administrator account"});
    
    const query = "DELETE FROM `user` WHERE id = "+userToDeleteId+";";

    new Promise(function(resolve, reject) {
        connection.query(
            query,
            function(err, result) {
                if(err)
                    reject( err );
                else if(result != '')
                    resolve(result);
                else
                    res.status(404).json({'error': 'utilisateur introuvable'});
            }
        );
    })
    .then(result => {
        connection.removeUser(userToDeleteId);
        res.status(200).json( {result} );
    })
    .catch(err =>{
        throw err
    })
}
