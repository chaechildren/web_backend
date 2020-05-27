
const insert=require("../ManipulateDB/insertDB");
//table arduino에 새로운 tuple 추가, 매개변수는 json 형태로 arduino 필요
module.exports=async function(arduino){
    var queryData={
        tableName:'arduino',
        arduino_id:arduino.arduino_id
    }
    
    const result=await insert(queryData);
    return new Promise(function(resolve,reject){
        resolve(result)
    });
}