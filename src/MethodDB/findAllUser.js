const getAll=require('./InterfaceDB/getAll');
const refine=require('./InterfaceDB/refineTimeFormat');
//table user_info의 모든 tuple 객체의 배열 리턴
module.exports=async function(){
    var queryText={
        text:"SELECT * FROM user_info",
    }
    var result=await getAll(queryText);
    result=await refine(result);
    return new Promise(function(resolve,reject){
            resolve(result)
    })
}