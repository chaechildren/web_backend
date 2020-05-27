const getAll=require('./InterfaceDB/getAll');
const refine=require('./InterfaceDB/refineTimeFormat');
//data table의 모든 tuple 객체의 배열 리턴, 매개변수 data가 존재한다면 data.arduino_id에 맞는 tuple들만 찾음
module.exports=async function(data){
    var queryText={};
    if(data){
        queryText={
            text:"SELECT * FROM data WHERE id = $1",
            values:[data.arduino_id]
        }
    }else{
        queryText={
            text:"SELECT * FROM data",
        }
    }
    var result=await getAll(queryText);
    result=await refine(result);
    return new Promise(function(resolve,reject){
            resolve(result)
    })
}
