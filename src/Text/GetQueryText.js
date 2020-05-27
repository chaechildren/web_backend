//queryDB.js에서 필요한 query text 리턴, 매개변수는 queryDB.js와 동일
module.exports=function(data){
    var result;
    const tableName=data.tableName;
    switch (tableName){
        case 'data':
            const id=data.id;
            result='SELECT * FROM '+tableName+' WHERE id = \''+id+'\'';
            break;
        case 'admin_info':
        case 'user_info':
            const email=data.email;
            result="SELECT * FROM "+tableName+" WHERE email = \'"+email+"\'";
            break;
        case 'arduino':
            const arduinoId=data.id;
            result="SELECT * FROM "+tableName+" WHERE id = \'"+arduinoId+"\'";
            break;
        default:
            console.log('There is no '+ tableName+' table');
    }
    return new Promise(function(resolve,reject){
        resolve(result);
    });
}