//Just Number
const num = /^[0-9]+$/;

//Validate Form User
const validateFormUser = (req,res,next) => {          
    const {nombre , apellido} = req.body;

    console.log(typeof nombre);

    if (nombre === undefined) {
        console.log("campos vacios");
        res.status(400).json("Todos los campos son necesarios");
    } else {
        next();
    }   
};

export default num;
export { validateFormUser};