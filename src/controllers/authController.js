import connection from '../db/connectionBD.js';
import { generateTokenJwt , error , comparePassword} from '../config/validatorHNPT.js';
import key from '../config/key.js';

const controller = {}

//login controller
controller.login = async (req, res) => {   
    const { email , pass } = req.params;
    
    try {
        let results = await connection.awaitQuery('SELECT IDToken,nombre,rol,estado,password FROM usuario WHERE correo = ?',[email]);            
        if (results != "") {
            const { IDToken,nombre,rol,estado,password } = results[0]; 
            
            if (await comparePassword(pass,password) && estado == "activo") {               
                let token = generateTokenJwt({IDToken},key.secretKey);                
                let data = {nombre,rol,token};
                res.status(200).json(error('ok',data));               
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