//query로 받은 dataArray내의 createdat format을 'YYYY-MM-DD hh:mm:ss'형태로 refine 후 dataArray 리턴 , 매개변수는 query로 받은 객체 한 개 또는 객체 배열 요구 
function refine(dataArray){
    return new Promise(function(resolve,reject){
        if(Array.isArray(dataArray)){
            for(let i=0;i<dataArray.length;i++){
                var data=dataArray[i];
                data.createdat=data.createdat.toISOString().replace(/T/, ' ').replace(/\..+/, '');
            }
        }else{
            dataArray.createdat=dataArray.createdat.toISOString().replace(/T/, ' ').replace(/\..+/, '');
        }
        resolve(dataArray);
    });
}
module.exports=async function(dataArray){
    const result=await refine(dataArray);
    return new Promise(function(resolve,reject){
        resolve(result)
    });
}