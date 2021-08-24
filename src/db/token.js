import connection from "./connectionBD.js";
import moment from "moment";

moment.locale('col');

//save token
const saveToken = async (idToken,token) => {
    try {
        let fechaAdd = moment().add(6,'hours');
        let fecha = fechaAdd.format('YYYY-MM-DD HH:mm:ss');         
        let results = await connection.awaitQuery('INSERT INTO token (token,fecha,FK_ID_USUARIO) VALUES (?,?,?)',[token,fecha,idToken]);  
         
        return results.affectedRows > 0 ? true : false; 
    } catch (err) {
        return false;        
    }   
}

export default saveToken;