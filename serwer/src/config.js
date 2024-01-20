const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: "./.env" });


module.exports = {
    database: {
        host: "party-pie-db.mysql.database.azure.com",
        user: process.env.DB_LOGIN,
        password: process.env.DB_PASSWORD,
        database: 'partypiedb',
        timezone: 'utc',
        port: 3306,
        ssl: {
            ca: fs.readFileSync(path.join(__dirname, 'DigiCertGlobalRootCA.crt.pem'))
        }
    }
};
