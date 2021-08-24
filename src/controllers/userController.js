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
     const { nombre,apellido,cedula,correo,rol,estado,password } = req.body; 
     let IDToken = generateToken(cedula,correo);
     let passEnc = await generatePassword(password);     

     //res.json(passEnc);
};


export default controller;