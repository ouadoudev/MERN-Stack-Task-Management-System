const express = require('express');
require('./config/db');
const cors = require('cors');
const authRouter = require('./routes/authRouters');
const taskRouter = require('./routes/taskRoutes')


require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors({
  credentials: true,
  origin: 'http://localhost:5173'
}));


app.use('/auth', authRouter);
app.use('/task', taskRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});