const client=require("../../Connect/connetDB");
async function query(queryText){
    return new Promise(function(resolve,reject){
        client.query(queryText,(err,res)=>{
            if(err){
                console.log(err);
            }else{
                result=res.rows;
                resolve(result);
            }
        })
    })
}
//db로부터 조건에 맞는 모든 tuple을 배열 형태로 리턴, 매개변수로 string 형태 또는 query 형태 필요
module.exports=async function(queryText){
    var result=await query(queryText);
    return new Promise(function(resolve,reject){
            resolve(result)
    });
}