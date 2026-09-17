import express from 'express';
import basicRouter from './basicRoute.js';
import routeParameter from './routeParameter.js';
import queryParameter from './queryParameter.js';
import postQuery from './postMethod.js';

const app = express();

const PORT = 3000;

app.use('/',basicRouter);
app.use('/api',routeParameter);
app.use('/query',queryParameter);
app.use('/post',postQuery);

app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`);
})