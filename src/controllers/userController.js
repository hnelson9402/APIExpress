import moment from 'moment';
import connection from '../db/connectionBD.js'
import error from '../config/error.js';
import { number , generateToken , generatePassword , comparePassword } from '../config/validatorHNPT.js';

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
        let IDToken = generateToken(cedula,correo);
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
        res.status(500).json(error('error', err));   
    }      
};


export default controller;