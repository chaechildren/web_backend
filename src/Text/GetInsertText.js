
function getQuotationText(textArray){
    var result='';
    for(let i=0;i<textArray.length;i++){
        result+='\''+textArray[i]+'\',';
    }
    return result.slice(0,-1);
}
//insertDB.js에서 필요한 query text 리턴, 매개변수는 insertDB.js와 동일
module.exports=function(data){
    const tableName=data.tableName;
    var result = 'INSERT INTO ' + tableName;
    switch (tableName){
        case 'user_info':{
            const email=data.email;
            const arduinos=data.arduinos;
            const name=data.name;
            const password=data.password;
            var arduinosToText;
            if(Array.isArray(arduinos)){
                arduinosToText=getQuotationText(arduinos);
                arduinosToText='ARRAY['+arduinosToText+']'
            }else{
                arduinosToText=null
            }
            result = result+' VALUES(\''+email+'\','+arduinosToText+',\''+name+'\',\''+password+'\',CURRENT_TIMESTAMP(0)+interval \'17hour\')'
            break;
        }
        case 'data':{
            const id=data.id;
            const humidity=data.humidity;
            const temp=data.temp;
            result=result +' VALUES(\''+id+'\',\''+humidity+'\',\''+temp+'\',CURRENT_TIMESTAMP(0)+interval \'17hour\')';
            break;
        }
        case 'admin_info':{
            const email=data.email;
            const name=data.name;
            const password=data.password;
            result=result +' VALUES(\''+email+'\',\''+name+'\',\''+password+'\')';
            break;
        }
        case 'arduino':{
            const arduino_id=data.arduino_id;
            result= result +' VALUES(\''+arduino_id+'\')'
            break;
        }
        default:
            err('There is no '+ tableName+' table');
    }
    return new Promise(function(resolve,reject){
        resolve(result)
    });
}

