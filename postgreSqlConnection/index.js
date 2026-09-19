import express from 'express';
import routerExample from './routesExample.js';

const app = express();

app.use(express.json());
app.use('/', routerExample);

app.get('/health',(req,res)=>{
    res.json({
        status:'ok'
    });
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port:- ${PORT}`);
});