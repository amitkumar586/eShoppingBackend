const app = require('./app');
const dotenv = require('dotenv');

const databaseConnection = require('./config/database');

//config
dotenv.config( { path:"./config/config.env"});

//connecting database
databaseConnection();

const server = app.listen(process.env.PORT,()=>{
    console.log(`server is working on http://localhost:${process.env.PORT}`);
});

