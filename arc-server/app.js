const express = require('express');
const app = express();

const userRouter = require('./routes/user.route');

const cors = require('cors');
require('./config/db');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/user', userRouter);

app.get('/', (req, res) => {
    res.send('Hello World!');

});

app.use((req,res,next)=>{
    res.status(404).json({
        message: 'Not Found'

    });
})

//server error 
app.use((err,req,res,next)=>{
    res.status(500).json({
        message: 'Server Error'
    });
})
module.exports = app;