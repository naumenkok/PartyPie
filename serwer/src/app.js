const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoute');
const eventRoutes = require('./routes/eventRoute');
const guestRoute = require('./routes/guestRoute');
const mysql = require('mysql');
const db = require('./config');
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;

const connection = mysql.createConnection(db.database);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
    } else {
        console.log('Connected to the database');
    }
});

app.use('/userRoute', userRoutes);
app.use('/eventRoute', eventRoutes);
app.use('/guestRoute', guestRoute);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
