const client = require("../Connect/connetDB");
const text = require("../Text/getInsertText");
async function insert(data) {
  const insertText = await text(data);
  return new Promise(function (resolve, reject) {
    client.query(insertText, (err, res) => {
      if (err) {
        console.log(err);
        resolve(false);
      } else {
        console.log("data is inserted successfully.");
        resolve(true);
      }
    });
  });
}
//table에 data를 insert, 매개변수는 json 형태로 테이블이름(tableName)과 data의 정보 필요
module.exports = async function (data) {
  const result = await insert(data);
  return new Promise(function (resolve, reject) {
    resolve(result);
  });
};
