import express from 'express';
import db from '../Services/db.js';

const router = express.Router();

router.get('/',async (req,res)=>{
    // console.log('db..-----',db.query);
    try{
        const result = await db.query('SELECT * FROM customers');
        // console.log('result .....',result.rows);
        res.json(result.rows);
    }catch(err){
        console.log(err);
        res.status(500).json({message:'Database error'});
    }
});

export default router;