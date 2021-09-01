import {config} from 'dotenv'
config();

export default { secretKey: process.env.SECRETKEY};