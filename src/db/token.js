import connection from "./connectionBD.js";
import moment from "moment";
import isset , { isEmpty , error } from './../config/validatorHNPT.js';

moment.locale('col');

const token = {};

//save token
token.save = async (idToken,token) => {
    try {
        let fechaAdd = moment().add(6,'hours');
        let fecha = fechaAdd.format('YYYY-MM-DD HH:mm:ss');         
        let results = await connection.awaitQuery('INSERT INTO token (token,fecha,FK_ID_USUARIO) VALUES (?,?,?)',[token,fecha,idToken]);          
        return results.affectedRows > 0 ? true : false; 
    } catch (err) {
        return false;        
    }   
}

//Delete token expired
token.delete = async () => {
    try {        
        let fecha = moment().format('YYYY-MM-DD HH:mm:ss');         
        let results = await connection.awaitQuery('DELETE FROM token WHERE fecha < ? ',[fecha]);          
        return results.affectedRows > 0 ? true : false; 
    } catch (err) {
        return false;        
    }   
}

//Validate token of access for params
token.validateByParams = async (req,res,next) => {
    const { keyToken } = req.params;
         
    if (isset(keyToken) || isEmpty(keyToken)) {
        res.status(400).json(error('error' , 'El campo keyToken es requerido'));
    } else {
        let getStateToken = await token.validateToken(keyToken);        

        if (!getStateToken) {        
            res.status(400).json(error('error','El keyToken ingresado no es valido o ya expiro, vuelva a iniciar sesión'));
        } else {
            next();
        }      
    }      
}

//validate token of access
token.validateToken = async (token) => {
    let fecha = moment().format('YYYY-MM-DD HH:mm:ss');     
    try {       
        let results = await connection.awaitQuery("SELECT token FROM token WHERE token = ? AND fecha > ? ",[token,fecha]); 
        return results != "" ? true : false;                
    } catch (err) {
       return false;
    }   
}

export default token;