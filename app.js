const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const {config} = require('./configs');
const {userRouter} = require('./routes');

const {PORT} = config;

const app = express();

mongoose.connect('mongodb://localhost:27017/lab_uni').then(() => {
    console.log('Mongo is connected');
});

app.use(cors({origin: _configureCors}));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/users', userRouter);
app.use('*', (err, req, res, next) => {
    res
        .status(err.status || 500)
        .json({
            message: err.message
        });
});

app.listen(PORT, () => {
    console.log(`App listen ${PORT}`);
});

function _configureCors(origin, callback) {
    return callback(null, true);
}
