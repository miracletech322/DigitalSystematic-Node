const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const http = require('http');
const mysql = require('mysql2');

dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOSTNAME,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});
pool.promise();

const appRoute = require('./routes');

const app = express();
const server = http.createServer(app);

app.use(cookieParser());
app.use(morgan('tiny'));

app.use(
    cors({
        origin: '*',
        credentials: true,
    })
);
app.options('*', cors());

app.use(compression());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'Digital Systematic API Service',
    });
});

app.use('/api/v1', appRoute);

const port = process.env.APP_PORT || 8000;

server.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on port ${port}`);
});
