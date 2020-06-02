//updateDB.js에서 필요한 query text 리턴, 매개변수는 updateDB.js와 동일
module.exports=function(data){
    var result;
    const tableName=data.tableName;
    switch (tableName){
        case 'user_info':{
            const email=data.email;
            const arduinos=data.arduinos;
            const name=data.name;
            const password=data.password;
            result = 'UPDATE '+tableName+' SET arduinos = '+arduinos+ ',name=\''+name+'\',password=\''+password+'\' WHERE email = \''+email+'\'';
            break;
        }
        case 'data':{
            const id=data.id;
            const humidity=data.humidity;
            const temp=data.temp;
            result='UPDATE '+tableName+' SET humidity = \''+humidity+'\',temp=\''+temp+'\'WHERE id=\''+id+'\'';
            break;
        }
        case 'admin_info':{
            const email=data.email;
            const name=data.name;
            const password=data.password;
            result='UPDATE '+tableName+' SET name = \''+name+'\',password = \''+password+'\'WHERE email=\''+email+'\'';
            break;
        }
        default:
            err('There is no '+ tableName+' table');
    }
    return new Promise(function(resolve,reject){
        resolve(result);
    });
}