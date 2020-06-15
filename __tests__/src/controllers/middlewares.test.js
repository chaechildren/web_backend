// const request = require("supertest");
// const app = require("../../../app");

const middlewares = require("../../../src/controllers/middlewares");
describe("middlewares.js 테스트 , 메서드 isSignUpFormEmpty", () => {
  it("아이디 비밀번호 확인비밀번호 값 비어있는지 확인한다 case : 1 모두 정상적으로 입력됨", (done) => {
    let ID = "hn8294",
      PW = "123456",
      CONFIRMPW = "123456";
    const isEmpty = middlewares.isSignUpFormEmpty(ID, PW, CONFIRMPW);
    expect(isEmpty).toBe(false);
    done();
  });
  it("아이디 비밀번호 확인비밀번호 값 비어있는지 확인한다 case : 2 ID가 입력되지 않음", (done) => {
    let ID = "",
      PW = "123456",
      CONFIRMPW = "123456";
    const isEmpty = middlewares.isSignUpFormEmpty(ID, PW, CONFIRMPW);
    expect(isEmpty).toBe(true);
    done();
  });
});

describe("middlewares.js 테스트 , 메서드 isPasswordShort", () => {
  it("비밀번호가 4자리 이상인 경우 : 3자리", () => {
    let PW = "123";
    const result = middlewares.isPasswordShort(PW);
    expect(result).toBe(true);
  });
  it("비밀번호가 4자리 이상인 경우 : 4자리", () => {
    let PW = "1234";
    const result = middlewares.isPasswordShort(PW);
    expect(result).toBe(false);
  });
  it("비밀번호가 4자리 이상인 경우 : 5자리", () => {
    let PW = "12345";
    const result = middlewares.isPasswordShort(PW);
    expect(result).toBe(false);
  });
});

describe("middlewares.js 테스트 , 메서드 doesPasswordMatch", () => {
  it("비밀번호가 서로 같은 경우  ", () => {
    let PW = "12345";
    let CONFIRMPW = "1234";
    const result = middlewares.doesPasswordMatch(PW, CONFIRMPW);
    expect(result).toBe(false);
  });
  it("비밀번호가 서로 다른 경우  ", () => {
    let PW = "1234";
    let CONFIRMPW = "1234";
    const result = middlewares.doesPasswordMatch(PW, CONFIRMPW);
    expect(result).toBe(true);
  });
});
