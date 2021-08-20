import connection from '../db/connectionBD.js'

const controller = {}

//show all users
controller.index = async (req, res) => {   
    try {        
        let results = await connection.awaitQuery('SELECT * FROM usuario');
        let data = {data: results};
        console.log("funciono");
        res.json(data)
    } catch (error) {
        console.error(error);
    }
};

//show one user specific
// controller.user = async (req, res) => {
//     let cedula = req.params.cedula;

//     if (!num.test(cedula)) {
//         res.status(400).json({
//             status: "error",
//             message: "Datos enviados en formato incorrecto"
//         });    
//     } else {
//         try {
//             let results = await connection.awaitQuery('SELECT * FROM usuario WHERE cedula = ?',[cedula]);
//             if (results != "") {                
//                 let data = {data: results};
//                 res.json(data)
//             } else {
//                 res.status(400).json({
//                     status: "error",
//                     message: "La cedula digitada no esta registrada"
//                 }); 
//             }
//         } catch (error) {
//             console.error(error);
//         }       
//     }
// };

//save new user
controller.save = async (req , res) =>{
     res.json("hola desde save");
    //  if (nombre == undefined) {
    //     res.status(400).res.json({
    //         status: "error",
    //         message: "Todos los campos son requeridos"
    //     });
    //  } else {
    //      res.json("hola");
    //  }
};


export default controller;