import connection from '../db/connectionBD.js'
import moment from 'moment';
import { generateToken , error , comparePassword} from '../config/validatorHNPT.js';

const controller = {}

//show one user specific
controller.login = async (req, res) => {   
    const { email , pass } = req.params;
    
    try {
        let results = await connection.awaitQuery('SELECT nombre,rol,estado,password FROM usuario WHERE correo = ?',[email]);            
        if (results != "") {
            const { nombre,rol,estado,password } = results[0]; 
            console.log(results[0]);
            if (await comparePassword(pass,password) && estado == "activo") {
                 let keyToken = generateToken(moment().format('YYYY-MM-DD HH:mm:ss'),nombre+Math.random().toString(36));
                 let data = {nombre,rol,keyToken};
                 res.status(200).json(error('ok',data));
            } else {
                res.status(400).json(error('error','Correo o contraseña incorrecto o usuario bloqueado'));
            }
        } else {
            res.status(400).json(error('error','Correo o contraseña incorrecto')); 
        }
    } catch (error) {
        res.status(500).json(error('error','Error interno'));
    }   
};

export default controller;