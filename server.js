const express = require('express');
const mongoose = require('mongoose')
const morgan = require('morgan');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

const routes = require('./routes/api');

// const MONGODB_URI = 'mongodb+srv://tom_stewart-93:<B0HG3CWw9r14w3Pn>@cluster0.hkhzg.mongodb.net/lottery_draft?retryWrites=true&w=majority'

mongoose.connect('mongodb://localhost/lottery_draft', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected!!!');
});

app.use(express.json());
app.use(express.urlencoded({extended: false}));

//HTTP request Logger
app.use(morgan('tiny'));

app.use('/api', routes);

app.listen(PORT, console.log(`Server is starting at ${PORT}`));