import express from 'express';

const postQuery = express.Router();

postQuery.post('/postQuery',(req,res)=>{
    console.log('post method ...',req.body);

    res.json({
        message:'this is the post method...'
    });
});

export default postQuery;