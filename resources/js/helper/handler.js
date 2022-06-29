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

export const getResultValidate = async (formInstance) => {
  return await formInstance
    .validateFields()
    .then((values) => values)
    .catch((err) => err);
};

export const downloadBlob = (content, fileName) => {
  const BOM = "\uFEFF";
  content = BOM + content;
  const blob = new Blob([content], { type: "data:text/csv;charset=utf-8," });
  const url = URL.createObjectURL(blob);
  let dow = document.createElement("a");
  dow.href = url;
  dow.setAttribute("download", fileName);
  dow.click();
};
