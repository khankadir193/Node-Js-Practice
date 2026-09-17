import express from 'express';
const postQuery = express.Router();

postQuery.post('/postQuery',(req,res)=>{
    // console.log('post method ...',req?.body);
    const {message,data} = req?.body;
    console.log('message..',message);
    console.log('data...',data);

    res.json({
        message:'this is the post method...',
        messageRecieved:req?.body
    });
});

export default postQuery;