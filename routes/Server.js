import express from 'express';
import router from './basicRoute.js';

const app = express();

const PORT = 3000;

app.use('/',router);

app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`);
})