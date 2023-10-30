export const validataPassWord = (text) => {
  if (text.length > 15) {
    return false;
  } else {
    return true;
  }
};
