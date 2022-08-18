const fs = require('fs');
const multiparty = require('multiparty');

module.exports = (req, res, next)=>{
    new multiparty.Form().parse(req, (err, fields, files)=>{
        if(err){ 
            console.log('error');
            reject(err);
        }else{
            req.body = fields;
            if (files.image !== undefined) {
                new Promise((resolve, reject) => {
                    fs.readFile(files.image[0].path, (err, data)=>{
                        if(err)
                            reject(err);
                        const ext = files.image[0].path.split('.')[1];
                        const name = Date.now() + "." + ext;
                        req.body.image = name;
                        fs.writeFile(`./images/${name}`, data, (err)=>{
                            if(err)
                                reject(err);
                            resolve()
                        });
                    });
                }).then(()=>{
                    next();
                }).catch((err)=>{
                    console.log(err);
                });
            }else{
                next();
            }
        }
    })
}