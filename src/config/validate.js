import * as yup from 'yup';
import isset , { error , validateJwt , isEmpty , comparePassword } from "./validatorHNPT.js";
import key from '../config/key.js';
import sqlQuery from './../db/sql.js';

const validate = {}

//Validate Form User
validate.formUser = async (req, res, next) => {
    try {        
        let schema = yup.object().shape({           
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

        let token = req.headers.authorization;
        if (isset(token) || isEmpty(token)) {
            res.status(400).json(error('error','El token de autorización es requerido'));
        } 

        let getStateToken =  validateJwt(token.split(" ")[1],key.secretKey);
        let ifExistsCedula = await sqlQuery.ifExists('cedula','usuario','cedula',req.body.cedula);    
        let ifExistsCorreo = await sqlQuery.ifExists('correo','usuario','correo',req.body.correo);        

        if (!getStateToken) {        
            res.status(400).json(error('error','El Token ingresado no es valido o ya expiro, vuelva a iniciar sesión'));
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
            newResetPassword: yup.string().required("El campo Contraseña es requerido").min(8,"La contraseña debe tener un mínimo de 8 caracteres"),           
            confirmNewResetPassword: yup.string().required("El campo confirmar contraseña es requerido").min(8,"La contraseña debe tener un minimo de 8 caracteres"),
            IDToken: yup.string().required("El campo IDToken es requerido"),
        });
        await schema.validate(req.body);  
        
        const { newResetPassword , confirmNewResetPassword } = req.body;

        let token = req.headers.authorization;
        if (isset(token) || isEmpty(token)) {
            res.status(400).json(error('error','El token de autorización es requerido'));
        } 
        
        let getStateToken =  validateJwt(token.split(" ")[1],key.secretKey);

        if (!getStateToken) {
             res.status(400).json(error('error','El keyToken ingresado no es valido o ya expiro, vuelva a iniciar sesión'));
        } else if (newResetPassword !== confirmNewResetPassword) {
             res.status(400).json(error('error','Las contraseñas son diferentes'));
        } else {
            next();
        }
    } catch (err) {
        res.status(400).json(error('error',err.errors[0]));
    }  
}

//validate token
validate.token = (req,res,next) => {    
    try {
        const { authorization } = req.headers;
        if (isset(authorization) || isEmpty(authorization)) {
            res.status(401).json(error('error','El token es necesario'))
        } else {            
            let validateToken = validateJwt(authorization.split(" ")[1] , key.secretKey);            
            if (!validateToken) {
                res.status(401).json(error('error','El token es invalido o ya expiro, vuelva a iniciar sesión'));
            } else {
                next()
            }
        }        
    } catch (error) {
        res.status(401).json(error('error','El token es invalido o ya expiro, vuelva a iniciar sesión'));
    }
}

//validate update user password
validate.updatePassword = async (req,res,next) => {
    try {
        let schema = yup.object().shape({                       
            oldPassword: yup.string().required("El campo Contraseña antigua es requerido").min(8,"La contraseña debe tener un mínimo de 8 caracteres"),           
            newPassword: yup.string().required("El campo nueva contraseña es requerido").min(8,"La contraseña debe tener un minimo de 8 caracteres"),
            confirmNewPassword: yup.string().required("El campo confirmar contraseña es requerido").min(8,"La contraseña debe tener un minimo de 8 caracteres"),
        });
        await schema.validate(req.body);  
        
        const { oldPassword , newPassword , confirmNewPassword } = req.body;

        //validate if exists the header Authorization
        let token = req.headers.authorization;
        if (isset(token) || isEmpty(token)) {
            res.status(400).json(error('error','El token de autorización es requerido'));
        } 
        
        let getStateToken =  validateJwt(token.split(" ")[1],key.secretKey);        

        //validate if the token is correct
        if (!getStateToken) {
             res.status(400).json(error('error','El keyToken ingresado no es valido o ya expiro, vuelva a iniciar sesión'));
        } 
        
        let userPassword = await sqlQuery.searchData('password','usuario','IDToken',getStateToken.IDToken);
        
        //validate if get the password of user
        if (!userPassword) {
            res.status(500).json('error','Error interno');
        }

        let validateOldPassword = await comparePassword(oldPassword , userPassword.password);

        //validate if the old password is correct
        if (!validateOldPassword) {
             res.status(401).json(error('error','La contraseña antigua no coincide'))
        } else if (newPassword !== confirmNewPassword) {
             res.status(400).json(error('error','Las contraseñas son diferentes'));
        } else {
            req.IDToken = getStateToken.IDToken;
            next();
        }
    } catch (err) {
        res.status(400).json(error('error',err.errors[0]));
    }
}

export default validate;