const path = require('path');
const express = require('express');

const dataBase = require('./db/db.json');
const uuid = require('./helpers/uuid');
const app = express()
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));
app.use(require('./routes'));

app.listen(PORT, ()=> console.log(`Now listening on http://localhost:${PORT}`));