import moment from "moment";

export const generatePassword = (length) => {
  const alpha = 'abcdefghijklmnopqrstuvwxyz';
const uppercaseAlpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const num = '1234567890';
const specials = ',.!@#$%^&*';
const options = [alpha, alpha, alpha, uppercaseAlpha, uppercaseAlpha, num, num, specials,alpha, alpha, alpha, uppercaseAlpha, uppercaseAlpha, num, num, specials];
let opt, choose;
let pass = "";
for ( let i = 0; i < length; i++ ) {
  opt = Math.floor(Math.random() * options.length);
  choose = Math.floor(Math.random() * (options[opt].length));
  pass = pass + options[opt][choose];
  options.splice(opt, 1);
}
  return pass;
};

export const formatDate = (date) => {
  return moment(date).format("YYYY-MM-DD");
};
export const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};
