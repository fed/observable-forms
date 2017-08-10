export function getFunctionName(func) {
  let tmp = func.toString().substr('function '.length);

  return tmp.substr(0, tmp.indexOf('('));
}
