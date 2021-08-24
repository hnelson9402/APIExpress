import * as yup from 'yup';
import { error } from "./validatorHNPT.js";

//Validate Form User
const validateFormUser = async (req, res, next) => {
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

        if (req.body.password !== req.body.confirmPassword) {
            res.status(400).json(error('error','Las contraseña no coinciden'));
        } else {
            next();
        }

    } catch (err) {
        return res.status(400).json(error('error',err.errors[0]));
    }   
};

//Validate Login
export const validateLogin = async (req, res, next) => {   
    try {        
        let schema = yup.object().shape({            
            email: yup.string().required("El campo correo es requerido").email("El correo ingresado es invalido"),           
            pass: yup.string().required("El campo password es requerido").min(8,"La contraseña debe tener un minimo de 8 caracteres"),
        });

        await schema.validate(req.params);
        
        next();

    } catch (err) {
        return res.status(400).json(error('error',err.errors[0]));
    }   
};

export default validateFormUser;