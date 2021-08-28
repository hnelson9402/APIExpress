import * as yup from 'yup';
import { error } from "./validatorHNPT.js";
import token from '../db/token.js';
import sqlQuery from '../db/sql.js';

const validate = {}

//Validate Form User
validate.formUser = async (req, res, next) => {
    try {        
        let schema = yup.object().shape({
            keyToken: yup.string().required("El campo keyToken es requerido"),
            nombre: yup.string().required("El campo nombre es requerido").matches(/^[a-zA-Z ]+$/,"El campo nombre solo admite texto"),
            apellido: yup.string().required("El campo apellido es requerido").matches(/^[a-zA-Z ]+$/,"El campo apellido solo admite texto"),
            cedula: yup.string().required("El campo cedula es requerido").matches(/^[0-9]+$/, "El campo cedula solo admite números"),
            correo: yup.string().required("El campo correo es requerido").email("El correo ingresado es invalido"),
            rol: yup.string().required("El campo rol es requerido").matches(/^[0-9]+$/,"El campo rol solo admite números").max(1,"El campo rol solo admite un digito"),
            estado: yup.string().required("El campo estado es requerido").matches(/^[a-zA-Z]+$/,"El campo estado solo admite texto"),
            password: yup.string().required("El campo password es requerido").min(8,"La contraseña debe tener un minimo de 8 caracteres"),
            confirmPassword: yup.string().required("El campo confirmar password es requerido").min(8,"La contraseña debe tener un minimo de 8 caracteres"),                              
        });

        await schema.validate(req.body);

        let getStateToken = await token.validateToken(req.body.keyToken);
        let ifExistsCedula = await sqlQuery.ifExists('cedula','usuario','cedula',req.body.cedula);    
        let ifExistsCorreo = await sqlQuery.ifExists('correo','usuario','correo',req.body.correo);        

        if (!getStateToken) {        
            res.status(400).json(error('error','El keyToken ingresado no es valido o ya expiro, vuelva a iniciar sesión'));
        } else if (ifExistsCedula) {
            res.status(400).json(error('error','La cedula ingresada esta registrada'));
        } else if (ifExistsCorreo) {
            res.status(400).json(error('error','El correo ingresado esta registrado'));
        } else if (req.body.password !== req.body.confirmPassword) {
            res.status(400).json(error('error','Las contraseñas no coinciden'));
        } else {
            next();
        }
    } catch (err) {
        res.status(400).json(error('error',err.errors[0]));
    }
};

//Validate Login
validate.login = async (req, res, next) => {   
    try {        
        let schema = yup.object().shape({            
            email: yup.string().required("El campo correo es requerido").email("El correo ingresado es invalido"),           
            pass: yup.string().required("El campo password es requerido").min(8,"La contraseña debe tener un minimo de 8 caracteres"),
        });

        await schema.validate(req.params);
        
        next();

    } catch (err) {
        res.status(400).json(error('error',err.errors[0]));
    }   
};

//Validate reset password
validate.resetPassword = async (req,res,next) => {
    try {        
        let schema = yup.object().shape({  
            keyToken: yup.string().required("El campo keyToken es requerido"),          
            newResetPassword: yup.string().required("El campo Contraseña es requerido").min(8,"La contraseña debe tener un mínimo de 8 caracteres"),           
            confirmNewResetPassword: yup.string().required("El campo confirmar contraseña es requerido").min(8,"La contraseña debe tener un minimo de 8 caracteres"),
            IDToken: yup.string().required("El campo IDToken es requerido"),
        });
        await schema.validate(req.body);  
        
        const { newResetPassword , confirmNewResetPassword } = req.body;

        if (newResetPassword !== confirmNewResetPassword) {
             res.status(400).json(error('error','Las contraseñas son diferentes'));
        } else {
            next();
        }
    } catch (err) {
        res.status(400).json(error('error',err.errors[0]));
    }  
}

export default validate;