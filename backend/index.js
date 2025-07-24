const express = require('express');
const UserRouter = require('./routers/userRouter');
const ProjectRouter = require('./routers/projectRouter');
require('dotenv').config()
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

// CORS configuration: allow only origins specified in .env ALLOWED_ORIGINS
const allowedOrigins = process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : [];
app.use(cors({
    origin: function (origin, callback) {
        if (origin && allowedOrigins.includes(origin)) {
            return callback(null, true);
        } else {
            return callback(new Error('Not allowed by CORS'));
        }
    },
}));

app.use(express.json());

app.use('/user', UserRouter);
app.use('/project', ProjectRouter);

// Global error handler (should be after all routes)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});

// To serve static files in production, uncomment and use:
// app.use(express.static('public'));

// following tell me server is started
app.listen(port, () => {
    console.log('server started');
});