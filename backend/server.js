const express = require('express');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express')
require('./config/db');
const cors = require('cors');
const authRouter = require('./routes/authRouters');
const taskRouter = require('./routes/taskRoutes')


require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors({
  credentials: true,
  origin: process.env.NODE_ENV === 'production' ? process.env.CLIENT_URL : process.env.FRONTEND_BASE_URL
}));


app.use('/auth', authRouter);
app.use('/task', taskRouter);

const port = process.env.PORT || 3000;

const swaggerOptions ={
  swaggerDefinition:{
    openapi: '3.0.0',
    info: {
      title: 'Documentation',
      version: '1.0.0',
      description: 'API documentation for Task application',
      contact:'ouadoudev'
    },
    servers: [
      {
        url: `http://localhost:${port}`
      },
    ],
  }, 
  apis: ['./controllers/*.js'],
};
const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs))

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});