export const appendObjectToFormData = (formData, dataAppend) => {
  deleteKeyUndefined(dataAppend);
  for (let item in dataAppend) {
    formData.append(item, dataAppend[item]);
  }
};

export const appendArrayToFormData = (formData, key, dataAppend) => {
  for (let i = 0; i < dataAppend?.length; i++) {
    formData.append(`${key}[]`, dataAppend[i]);
  }
};

export const deleteKeyUndefined = (object) => {
  if (Object.keys(object).length !== 0) {
    for (let item in object) {
      if (
        typeof object[item] === "undefined" ||
        typeof object[item] === "null"
      ) {
        delete object[`${item}`];
      }
    }
  }
  return object;
};
