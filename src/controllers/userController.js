import moment from 'moment';
import connection from '../db/connectionBD.js'
import { number , generateToken , generatePassword , error} from '../config/validatorHNPT.js';

const controller = {}

//show all users
controller.index = async (req, res) => {     
    try {        
        let results = await connection.awaitQuery('SELECT * FROM usuario');
        let data = {data: results};        
        res.json(data)
    } catch (error) {
        res.status(500).json(error('error','Error interno'));
    }
};

//show one user specific
controller.user = async (req, res) => {
    let { cedula } = req.params;

    if (!number(cedula)) {
        res.status(400).json(error('error','Datos enviados en formato incorrecto'));    
    } else {
        try {
            let results = await connection.awaitQuery('SELECT * FROM usuario WHERE cedula = ?',[cedula]);            
            if (results != "") {                
                let data = {data: results};
                res.json(data)
            } else {
                res.status(400).json(error('error','La cedula digitada no esta registrada')); 
            }
        } catch (error) {
            res.status(500).json(error('error','Error interno'));
        }       
    }
};

//save new user
controller.save = async (req , res) =>{    
    try {        
        const { nombre,apellido,cedula,correo,rol,estado,password } = req.body; 
        let IDToken = generateToken();
        let passEnc = await generatePassword(password);     
        moment.locale('col');
        let fecha = moment().format('YYYY-MM-DD HH:mm:ss');
        let data = [nombre,apellido,cedula,correo,rol,estado,passEnc,IDToken,fecha];
        
        let results = await connection.awaitQuery('INSERT INTO usuario (nombre,apellido,cedula,correo,rol,estado,password,IDToken,fecha) VALUES (?,?,?,?,?,?,?,?,?)',data);
        if (results.affectedRows > 0) {            
            res.status(200).json(error('ok','Usuario registrado'));
        } else {
            res.status(400).json(error('error','No se puede registrar el usuario')); 
        }
    } catch (err) {
        res.status(500).json(error('error', 'Error interno del servidor'));   
    }      
};

//update user password
controller.updatePassword = async(req,res) => {   
    try {        
        const IDToken = req.IDToken;
        const { newPassword } = req.body;        
        let passEnc = await generatePassword(newPassword);            
        
        let results = await connection.awaitQuery('UPDATE usuario set password = ? WHERE IDToken = ?',[passEnc,IDToken]);
        if (results.affectedRows > 0) {            
            res.status(200).json(error('ok','Contrase??a actualizada'));
        } else {
            res.status(400).json(error('error','No se puede actualizar la contrase??a')); 
        }
    } catch (err) {
        res.status(500).json(error('error', 'No se puede actualizar la contrase??a'));   
    }  
}

//Reset password
controller.resetPassword = async (req,res) => {
    try {        
        const { newResetPassword , IDToken } = req.body;        
        let passEnc = await generatePassword(newResetPassword);            
        
        let results = await connection.awaitQuery('UPDATE usuario set password = ? WHERE IDToken = ?',[passEnc,IDToken]);
        if (results.affectedRows > 0) {            
            res.status(200).json(error('ok','Contrase??a restablecida'));
        } else {
            res.status(400).json(error('error','No se puede restablecer la contrase??a')); 
        }
    } catch (err) {
        res.status(500).json(error('error', err));   
    }  
}

//update user rol and status
controller.updateUser = async(req,res) => {
    try {        
        const { userRol , userStatus , IDToken } = req.body;                            
        
        let results = await connection.awaitQuery('UPDATE usuario set estado = ? , rol = ? WHERE IDToken = ?',[userStatus,userRol,IDToken]);
        if (results.affectedRows > 0) {            
            res.status(200).json(error('ok','Estado de usuario actualizado'));
        } else {
            res.status(400).json(error('error','No se puede actualizar el usuario')); 
        }
    } catch (err) {
        res.status(500).json(error('error', 'Error interno del servidor'));   
    }    
}


export default controller;