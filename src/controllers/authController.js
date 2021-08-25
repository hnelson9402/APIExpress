import connection from '../db/connectionBD.js';
import { generateToken , error , comparePassword} from '../config/validatorHNPT.js';
import token from '../db/token.js';

const controller = {}

//show one user specific
controller.login = async (req, res) => {   
    const { email , pass } = req.params;
    
    try {
        let results = await connection.awaitQuery('SELECT ID_USUARIO,nombre,rol,estado,password FROM usuario WHERE correo = ?',[email]);            
        if (results != "") {
            const { ID_USUARIO,nombre,rol,estado,password } = results[0]; 
            
            if (await comparePassword(pass,password) && estado == "activo") {
                let keyToken = generateToken();
                let data = {nombre,rol,keyToken};
                token.delete();//Delete the expired token
                let saveT = await token.save(ID_USUARIO,keyToken);
                
                if (!saveT) {
                    res.status(500).json(error('error','No se puede registrar el token'));
                } else {                    
                    res.status(200).json(error('ok',data));
                }
               
            } else {
                res.status(400).json(error('error','Correo o contraseña incorrecto o usuario bloqueado'));
            }
        } else {
            res.status(400).json(error('error','Correo o contraseña incorrecto')); 
        }
    } catch (err) {
        res.status(500).json(error('error',err));
    }   
};

export default controller;