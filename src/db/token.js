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
    let fecha = moment().format('YYYY-MM-DD HH:mm:ss'); 

    try {        
        if (isset(keyToken) || isEmpty(keyToken)) {
            res.status(400).json(error('error' , 'El campo keyToken es requerido'));
        } else {
            let results = await connection.awaitQuery("SELECT token FROM token WHERE token = ? AND fecha > ? ",[keyToken,fecha]);            
            if (results != "") {
               next();
            } else {
                res.status(400).json(error('error','El keyToken ingresado no es valido o ya expiro, vuelva a iniciar sesión'));
            } 
        }  
    } catch (err) {
        res.status(400).json(error('error','No se puede validar el keyToken'));
    }   
}

//validate token of access
token.validateToken = async (token) => {
    let fecha = moment().format('YYYY-MM-DD HH:mm:ss');     
    try {       
        let results = await connection.awaitQuery("SELECT token FROM token WHERE token = ? AND fecha > ? ",[token,fecha]);            
        if (results != "") {            
            return true;
        } else {
            return false;
        }          
    } catch (err) {
       return false;
    }   
}

export default token;