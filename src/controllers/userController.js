import connection from '../db/connectionBD.js'
import num from '../config/validate.js';

const controller = {}

//show all users
controller.index = (req, res) => {
    connection.query('SELECT * FROM usuario',(error, results) =>{
      if (error) throw error;
      //console.log(results);
      let data = {data: results};
      res.json(data)
    });
};

//show one user specific
controller.user = (req, res) => {
    let cedula = req.params.cedula;

    if (!num.test(cedula)) {
        res.status(400).json({
            status: "error",
            message: "Datos enviados en formato incorrecto"
        });    
    } else {
        connection.query('SELECT * FROM usuario WHERE cedula = ?',[cedula],(error, results) =>{
            if (error) {
                res.status(500).res.json({
                    status: "error",  
                    message: "Error interno del servidor"
                });
            } else {
                if (results != "") {
                    //console.log(results);
                    let data = {data: results};
                    res.json(data)
                } else {
                    res.status(400).json({
                        status: "error",
                        message: "La cedula digitada no esta registrada"
                    }); 
                }
            }
        });
    }
};


export default controller;