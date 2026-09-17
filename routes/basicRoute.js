import express from 'express';

const router = express.Router();

router.get('/',(req,res)=>{
    res.send('Hello from Home route..');
});

router.get('/user',(req,res)=>{
    res.send('Hello from User Route...');
});

router.get('/products',(req,res)=>{
    res.send('Hello from Product routes...');
});

export default router;