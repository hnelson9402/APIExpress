import error from "./error.js";
import isset, { isEmpty, max } from "./validatorHNPT.js";


//Validate Form User
const validateFormUser = (req, res, next) => {
    const { nombre, apellido, cedula, correo, rol, estado, password, confirmPassword } = req.body;

    if (isset(nombre) || isset(apellido) || isset(cedula) || isset(correo) || isset(rol) || isset(estado) || isset(password)
        || isset(confirmPassword)) {
        res.status(400).json(error('error', 'Datos enviados incompletos'));
    } else if (nombre === "" || apellido === "" || cedula === "" || correo === "" || rol === ""
        || estado === "" || password === "" || confirmPassword === "") {
        res.status(400).json(error('error', 'Todos los campos son necesarios'));
    } else {
        next();
    }
};

export default validateFormUser;