import sha from 'sha.js';
import bcrypt from 'bcryptjs';

//Just Number
const number = (field) => {
    return /^[0-9]+$/.test(field) ? true : false;
}

//Just text
const text = (field) => {
    return /^[a-zA-Z ]$/.test(field) ? true : false;
} 

//Validate fields empty
const isEmpty = (field) => {
    return field === "" ? true : false;  
};

//Validate if one field exist
const isset = (field) => {
    return field === undefined ? true : false;
}

//Validate email
const isEmail = (email) => {
    return /^[A-z0-9\\._-]+@[A-z0-9][A-z0-9-]*(\\.[A-z0-9_-]+)*\\.([A-z]{2,6})$/.test(email) ? true : false;
}

//Matches
const matches = (field , regex) => {
    return regex.test(field) ? true : false;
}

//min
const min = (field , min) => {
    return field.length < min ? true : false;
}

//max
const max = (field , max) => {
    return field.length > max ? true : false;
}

//sent message error
const error = (status,message) => {
    return { status, message };
}

//Generate token
const generateToken = (param1 , param2) => {
    return sha('sha512').update(param1 + param2).digest('hex')
}

//Generate Password
const generatePassword = async (string) =>{
      let pass = await bcrypt.hash(string, 9);
      return pass;
}

//Compare Password
const comparePassword = async (password , hash) =>{
   let compare = await bcrypt.compare(password, hash);
   return compare;
}

export default isset;
export {number , text , isEmpty , isEmail , matches , min , max , generateToken , generatePassword , comparePassword , error};