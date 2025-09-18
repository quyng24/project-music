const capitalizeFirstLetter = (str) => {if(str !== '') return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()}; 
//capitalizeFirstLetter("hello") => "Hello"

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  return emailRegex.test(email);
}
export {capitalizeFirstLetter, isValidEmail};