require('dotenv').config({path:"./config/.env"});

const mysql2 = require('mysql2'),

db_connection = mysql2.createConnection({
            host: process.env.host,
            port: process.env.port,
            user: process.env.user,
            password: process.env.password,
            database: process.env.database,
            waitForConnections: true
});

const connection = {
    query : function (q,c, escape=false ) {
        db_connection.query(q,c, escape);
    },
    userList:new Map(),
    adminList:new Set(),
    isAdmin:(id)=> {return connection.adminList.has(id);},
    refresh: ()=> {
        connection.query("select * from `user`", function(err, result){
            if(err)
                throw err;
                connection.userList.clear();
                connection.adminList.clear();
            result.map(i=>{
                connection.userList.set(i.id, i);
                if(i.isAdmin)
                connection.adminList.add(i.id);
            })
        });
    },
    removeUser:(id) => {
        connection.userList.delete(parseInt(id));
        connection.adminList.delete(parseInt(id));
    }
}

connection.refresh();

module.exports = connection;
