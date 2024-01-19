const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoute');
const eventRoutes = require('./routes/eventRoute');
const guestRoute = require('./routes/guestRoute');
const postRoute = require('./routes/postRoute');
const wishlistRoute = require('./routes/wishlistRoute');
const taskRoute = require('./routes/taskRoute');
const budgetRoute = require('./routes/budgetRoute');
const mysql = require('mysql');
const db = require('./config');
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;
const moment = require('moment-timezone');

moment.tz.setDefault('UTC');


const connection = mysql.createConnection(db.database);
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({limit:'50mb'}));
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
app.use('/postRoute', postRoute);
app.use('/wishlistRoute', wishlistRoute);
app.use('/taskRoute', taskRoute);
app.use('/budgetRoute', budgetRoute);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
