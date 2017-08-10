import * as formComponents from '../forms';

function getFunctionName(func) {
  let tmp = func.toString().substr('function '.length);

  return tmp.substr(0, tmp.indexOf('('));
}

export function isInputField(component) {
  const name = getFunctionName(component.type);
  const invalidFields = ['Form', 'Submit'];

  return Object(formComponents).hasOwnProperty(name) && invalidFields.indexOf(name) === -1;
}
