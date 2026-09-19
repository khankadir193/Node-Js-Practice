import express from 'express';
import db from './Services/db.js';

const app = express();

app.get('/',async (req,res)=>{
    try{
        const result = await db.query('SELECT * FROM customers');
        // console.log('result .....',result.rows);
        res.json(result.rows);
    }catch(err){
        console.log(err);
        res.status(500).json({message:'Database error'});
    }
});

app.listen(5000,()=>{
    console.log('Server running on port 5000');
})