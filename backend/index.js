const express = require('express');
const UserRouter = require('./routers/userRouter');
const ProjectRouter = require('./routers/projectRouter');
require('dotenv').config()
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors({
    origin: ['http://localhost:3000'],
}));

app.use(express.json());

app.use('/user', UserRouter);
app.use('/project', ProjectRouter);

// following tell me server is started
app.listen(port, () => {
    console.log('server started');
});