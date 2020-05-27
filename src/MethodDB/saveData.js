const insert=require("../ManipulateDB/insertDB");
//table data에 새로운 tuple 추가, 매개변수는 json 형태로 data 필요, 기입하지 않은 값은 undefined로 저장됨
module.exports=async function(data){
    var queryData={...data};
    queryData.tableName='data';
    queryData.id=data.arduino_id;
    const result=await insert(queryData);
    return new Promise(function(resolve,reject){
        resolve(result)
    });
}