const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const compression = require('compression');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const http = require('http');

const appRoute = require('./routes');

dotenv.config();

const app = express();
const server = http.createServer(app);

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.log(err));

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
