const express =require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
const cors = require('cors');
const errorMiddleware = require('./middleware/error');
const orderRoute = require('./routes/orderRoute');
// const errorMiddleware = require('./middleware/error');

const fileupload = require('express-fileupload');
// route imports
const productsRoute = require('./routes/productRoute');
const userRoute = require('./routes/userRoute');


// file upload
app.use(fileupload({
    useTempFiles:true
}));

// cors
app.use(cors());
// app.use(express.static(this.path.join()))


//cookie parser
app.use(cookieParser());

// body-parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


// middleware for error
app.use(errorMiddleware);

app.use('/api/v1',userRoute);
app.use('/api/v1',productsRoute);
app.use('/api/v1',orderRoute);

module.exports = app;