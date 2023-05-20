const express = require('express');
const conn = require('./db')
const app = express();
const cors = require('cors');
app.use(express.json());
app.use(cors());

app.listen(8080, ()=>console.log('listening on http://localhost:8080'));

conn()

app.use('/user', require('./routes/userRoutes'))
app.use('/note', require('./routes/goalRoutes'));
