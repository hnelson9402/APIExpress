import connection from "./connectionBD.js";
import moment from "moment";

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

export default token;