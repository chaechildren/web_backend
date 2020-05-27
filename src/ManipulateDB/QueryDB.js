const client=require('../Connect/connetDB')
const text = require('../Text/getQueryText')
async function query(data){
    var result;
    const queryText= await text(data);
    const query={
        text:queryText
    }
    return new Promise(function(resolve,reject){
        client.query(query,(err,res)=>{
            if(err){
                console.log(err);
            }else{
                result=res.rows[0];
                resolve(result);
            }
        })
    })
}
//table에서 data에 맞는 tuple 중 최초 하나만 json 형태로 리턴, 매개변수는 json 형태로 테이블 이름(tableName)과 table의 PK 필요
module.exports= async function(data){
    var result=await query(data);
    return new Promise(function(resolve,reject){
            resolve(result)
    });
}

