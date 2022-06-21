export const appendObjectToFormData = (formData, dataAppend) => {
  for (let item in dataAppend) {
    formData.append(item, dataAppend[item]);
  }
};
export const appendArrayToFormData = (formData, key, dataAppend) => {
  for (let i = 0; i < dataAppend?.length; i++) {
    formData.append(`${key}[]`, dataAppend[i]);
  }
};
