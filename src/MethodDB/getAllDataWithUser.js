const getAll=require('./InterfaceDB/getAll')
const query=require('../ManipulateDB/queryDB');
const refine=require('./InterfaceDB/refineTimeFormat');
//result에 table data에서 찾은 tuple 배열을 추가
function makeResult(result,arduinos){
    return new Promise(async function(resolve,reject){
        for(let i=0;i<arduinos.length;i++){
            const queryText={
                text:"SELECT * FROM data WHERE id = $1 ",
                values:[arduinos[i]]
            }
            var allData = await getAll(queryText); //arduino id가 일치하는 모든 data 객체의 배열
            allData=await refine(allData);
            result[i]=[]; //result 안에 새로운 배열 할당
            result[i] = allData; //[[data],[data],...] arduino id별로 묶은 상태
        }
        resolve(result);
    });
}
//user가 가지고 있는 모든 arduino의 data 객체(table data의 tuple)의 배열의 배열 리턴 => 예: [[data],[data],...] data는 arduino id별로 묶은 상태 / 매개변수는 user email 필요 
module.exports=async function(user_email){
    const queryData={
        tableName:'user_info',
        email:user_email
    }
    const user = await query(queryData);
    const arduinos = user.arduinos; //user의 arduino id 배열
    var result=[]; //user가 가지고 있는 모든 arduino의 data 객체의 배열의 배열 
    result = await makeResult(result,arduinos);
    return new Promise(function(resolve,reject){
            resolve(result)
    });
}