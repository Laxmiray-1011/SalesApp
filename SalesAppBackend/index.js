const express = require('express');
const PORT = 4000;
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const { MONGODB_URL } = require('./config/db')

global.__basedir = __dirname;
mongoose.connect(MONGODB_URL);

mongoose.connection.on('connected', () => {
    console.log("DB connected");
})
mongoose.connection.on('error', (error) => {
    console.log("Some error while connecting to DB");
})

require('./models/User');
require('./models/Sale');

app.use(cors());
app.use(express.json());

app.use(require('./routes/authRoutes'));
app.use(require('./routes/salesRoutes'));


app.listen(PORT, () => {
    console.log("Server started");
});