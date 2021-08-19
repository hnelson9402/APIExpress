import connection from '../db/connectionBD.js'

const controller = {}

controller.index = (req, res) => {
    connection.query('SELECT * FROM usuario',(error, results) =>{
      if (error) throw error;
      //console.log(results);
      let data = {data: results};
      res.json(data)
    });
};


export default controller;