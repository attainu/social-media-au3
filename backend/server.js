require('dotenv').config()
const express = require('express')

const sign = require('./routes/sign')
const profile = require('./routes/profile')

const app = express();

app.use('/sign', sign);
app.use('/profile', profile);

app.listen(5000);