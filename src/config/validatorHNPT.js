import sha from 'sha.js';
import bcrypt from 'bcryptjs';
import moment from 'moment';
import jwt from 'jsonwebtoken';

//Just Number
export const number = (field) => {
    return /^[0-9]+$/.test(field) ? true : false;
}

//Just text
export const text = (field) => {
    return /^[a-zA-Z ]$/.test(field) ? true : false;
} 

//Validate fields empty
export const isEmpty = (field) => {
    return field === "" ? true : false;  
};

//Validate if one field exist
const isset = (field) => {
    return field === undefined ? true : false;
}

//Validate email
export const isEmail = (email) => {
    return /^[A-z0-9\\._-]+@[A-z0-9][A-z0-9-]*(\\.[A-z0-9_-]+)*\\.([A-z]{2,6})$/.test(email) ? true : false;
}

//Matches
export const matches = (field , regex) => {
    return regex.test(field) ? true : false;
}

//min
export const min = (field , min) => {
    return field.length < min ? true : false;
}

//max
export const max = (field , max) => {
    return field.length > max ? true : false;
}

//sent message error
export const error = (status,message) => {
    return { status, message };
}

//Generate token
export const generateToken = () => {
    return sha('sha512').update(moment().format('YYYY-MM-DD HH:mm:ss')+Math.random().toString(36)).digest('hex')
}

//Generate Password
export const generatePassword = async (string) =>{
      let pass = await bcrypt.hash(string, 9);
      return pass;
}

//Compare Password
export const comparePassword = async (password , hash) =>{
   let compare = await bcrypt.compare(password, hash);
   return compare;
}

//generate token jwt
export const generateTokenJwt = (payload,secretKey) =>{    
    return jwt.sign(payload, secretKey, { expiresIn: "6h" });
}

//validate jwt
export const validateJwt = (token,secretKey) => {
    try {
        let data = jwt.verify(token, secretKey);            
        return data;
    } catch (error) {
        return false;
    }
}

export default isset;