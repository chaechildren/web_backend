const query=require('../ManipulateDB/queryDB');
const refine=require('./InterfaceDB/refineTimeFormat');
//table user_info에서 email이 일치하는 tuple 객체 하나를 리턴, 매개변수는 user_id를 key로 가지는 객체 요구
module.exports=async function(data){
    const queryData={
        tableName:"user_info",
        email:data.user_id
    }
    var result=await query(queryData);
    result=await refine(result);
    return new Promise(function(resolve,reject){
            resolve(result)
    })
}