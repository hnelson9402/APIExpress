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

export default isset;
export {number , text , isEmpty , isEmail , matches , min , max};