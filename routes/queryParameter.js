import express from 'express';

const queryParam = express.Router();

queryParam.get('/queryParameter',(req,res)=>{
    const { category,limit } = req.query;

    console.log('req body....',req.query);

    res.json({
        messsage:'hey i am checking the query params...',
        category:category,
        limit:limit
    });
})

export default queryParam;