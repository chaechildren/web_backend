const getAll=require("./InterfaceDB/getAll");
//등록되지 않은 모든 아두이노 객체의 배열을 리턴
module.exports=async function(){
    const users = await getAll("select * from user_info");
    const arduinos = await getAll("select * from arduino");
    var registeredArduinos=[];
    for(let i=0;i<users.length;i++){
        var user = users[i];
        registeredArduinos=registeredArduinos.concat(user.arduinos);  
    }
    const unregisteredArduinos = arduinos.filter(object=>!registeredArduinos.includes(object.id));

    return new Promise(function(resolve,reject){
        resolve(unregisteredArduinos);
    })

}