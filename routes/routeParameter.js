import express from 'express';

const router = express.Router();

router.get('/routeParameter/:id', (req, res) => {
    const { id } = req.params;

    res.json({
        message: 'User fetched..',
        id
    });
});

export default router;