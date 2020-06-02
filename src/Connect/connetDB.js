const { Client } = require('pg');

const client = new Client({
    user : 'wen06',
    host : 'wen01db.cie8iw6kcqg2.us-east-2.rds.amazonaws.com',
    database : 'postgres',
    password : '1q2w3e4r^^',
    port : 5432,
});
client.connect();
//db client 리턴
module.exports=client;


