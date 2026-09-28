import express from 'express';
import neonConnect from '../Services/neondb.js';
const app = express();

app.use(express.json());

app.get('/api/neon', async (req, res) => {
    try {
        const result = await neonConnect.query('SELECT * FROM customers');
        console.log('result...', result.rows);
        res.status(200).json({
            message: "Data Fetched Successfully...",
            result:result.rows
        })
    } catch (err) {
        res.status(500).json({
            message: 'Neon Data base Error'
        })
    }
});

app.post('/api/insertRecord', async (req, res) => {
    try {
        const { id, name, contact, address, city, postalCode, country } = req.body;

        // console.log('id', id, 'name', name, 'contact', contact, 'address', address);

        const result = await neonConnect.query(`
            INSERT INTO customers (customer_id,customer_name,contact_name,customer_address,city,postal_code,country)
            VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *
        `, [id, name, contact, address, city, postalCode, country]);

        res.status(201).json(result.rows);
    } catch (err) {
        // console.log('Inser is getting the error', err);
        res.status(500).json({
            message: `Insertion getting errro:- ${err}`
        })
    }
});

const PORT = process.env.NEON_PORT || 5000;

app.listen(PORT, () => {
    console.log('server running on this port :-', PORT);
});
