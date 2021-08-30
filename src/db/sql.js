import connection from "./connectionBD.js";

const sqlQuery = {};

//validate if exists a data
sqlQuery.ifExists = async (data,table,condition1,condition2) => {
    try {
        let results = await connection.awaitQuery(`SELECT ${data} FROM ${table} WHERE ${condition1} = ? `,[condition2]);        
        return results != "" ? true : false;
    } catch (error) {
        return false;
    }
}

//validate if exists a data y return
sqlQuery.searchData = async(data,table,condition1,condition2) => {
    try {
        let results = await connection.awaitQuery(`SELECT ${data} FROM ${table} WHERE ${condition1} = ? `,[condition2]);        
        return results != "" ? results[0] : false;
    } catch (error) {
        return false;
    }
}

export default sqlQuery;