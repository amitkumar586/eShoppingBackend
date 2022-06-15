const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost:27017/test');

const connectDatabase =()=>{
mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.jopk0.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority `,
{
useNewUrlParser:true,
useUnifiedTopology:true,
useUnifiedTopology:true
})
.then((data)=>{
        console.log(`MongodB connected with server ${data.connection.host}`);
    })
    .catch((err)=>{
        console.log(err);
    })
}

module.exports = connectDatabase;

