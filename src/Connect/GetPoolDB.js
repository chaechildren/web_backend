const {Pool} = require('pg');
const pool = new Pool({
    user : 'wen06',
    host : 'wen01db.cie8iw6kcqg2.us-east-2.rds.amazonaws.com',
    database : 'postgres',
    password : '1q2w3e4r^^',
    port : 5432,
})
//db pool 리턴
module.exports=pool;