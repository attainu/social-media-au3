require('dotenv').config()
const express = require('express')

const sign = require('./routes/sign')
const profile = require('./routes/profile')
const post = require('./routes/post')

const app = express();

app.use('/sign', sign);
app.use('/profile', profile);
app.use('/post', post);
//---------------------------SOCKET.IO-----------------------------------------------//
app.listen(5000);