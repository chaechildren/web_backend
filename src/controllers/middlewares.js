exports.isSignUpFormEmpty = (ID, PW, CONFIRMPW) => {
  return ID.length === 0 || PW.length === 0 || CONFIRMPW.length === 0;
};
exports.isPasswordShort = (PW) => {
  const passwordLowerbound = 4;
  return PW.length < passwordLowerbound;
};
exports.doesPasswordMatch = (PW, CONFIRMPW) => {
  return PW === CONFIRMPW;
};
