import express from 'express';
import db from '../Services/db.js';

const app = express();

app.use(express.json());

app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        message: 'Server is working correctly.'
    });
});

app.get('/api/customers', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM customers');
        res.json({
            success: true,
            data: result.rows
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching customers',
            error: error.message
        });
    }
});

app.post('/api/customers', async (req, res) => {
    try {
        const { id, name, contact, address, city, postalCode, country } = req.body;

        const result = await db.query(
            `
                INSERT INTO customers (customer_id, customer_name, contact_name, customer_address, city, postal_code, country)
                VALUES ($1, $2, $3, $4, $5, $6, $7)
                RETURNING *
            `,
            [id, name, contact, address, city, postalCode, country]
        );

        res.status(201).json({
            success: true,
            data: result.rows[0]
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating customer',
            error: error.message
        });
    }
});

if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Local server running on port ${PORT}`);
    });
}

export default app;
