const insert=require("../ManipulateDB/insertDB");
const queryId=require("../ManipulateDB/queryDB");
const findAllUnregisteredArduino=require("../MethodDB/findAllUnregisteredArduino");
const getAll=require("./InterfaceDB/getAll");
async function isNotExist(userArduinosId){
    const existingArduinos=await getAll("SELECT * FROM arduino"); //db에 존재하는 모든 arduino 객체 배열
    var existingArduinosId=[]; //존재하는 모든 arduino의 id 배열
    for(let i=0;i<existingArduinos.length;i++){
        existingArduinosId[i]=existingArduinos[i].id;
    }
    for(let i=0;i<userArduinosId.length;i++){
        if(!existingArduinosId.includes(userArduinosId[i])){ //db에 해당하는 id가 없는지 검사
            return new Promise(function(resolve,reject){
                resolve(true);
            })
        } 
    }
    return new Promise(function(resolve,reject){
        resolve(false);
    })
}
async function isRegistered(userArduinosId){
    const unRegisteredArduinos=await findAllUnregisteredArduino(); //등록되지 않은 arduino 객체 배열
    var unRegisteredArduinosId=[] //등록되지 않은 arduino의 id 배열
    for(let i=0;i<unRegisteredArduinos.length;i++){
        unRegisteredArduinosId[i]=unRegisteredArduinos[i].id;
    }
    for(let i=0;i<userArduinosId.length;i++){
        if(!unRegisteredArduinosId.includes(userArduinosId[i])){//등록된 arduino id에 해당 id가 포함되어 있는지 검사
            return new Promise(function(resolve,reject){
                resolve(true)
            })
        }
    }
    return new Promise(function(resolve,reject){
        resolve(false);
    })
}
//table user_info에 새로운 tuple 추가, 매개변수는 json 형태로 userData 필요, 기입하지 않은 값은 undefined로 저장됨, arduinos는 null로 저장됨
module.exports=async function(userData){
    const userArduinosId=userData.arduinos; //user가 가지고 있는 arduino id의 배열 (혹은 null)
    if(Array.isArray(userArduinosId)){
        var check = await isNotExist(userArduinosId); 
        if(check){
            return new Promise(function(resolve,reject){
                console.error("존재하지 않는 arduino id를 가지고 있습니다.")
                resolve(false);
            });        
        }
        check = await isRegistered(userArduinosId);
        if(check){
            return new Promise(function(resolve,reject){
                console.error("이미 등록되어 있는 arduino id를 가지고 있습니다.")
                resolve(false);
            });
        }        
    }
    var queryData={...userData};
    queryData.tableName='user_info';
    queryData.email=userData.user_id;
    queryData.password=userData.user_password;
    const result=await insert(queryData);
    return new Promise(function(resolve,reject){
        resolve(result);
    });
}