import express from 'express';
import db from '../Services/db.js';

const router = express.Router();

router.get('/', async (req, res) => {
    // console.log('db..-----',db.query);
    try {
        const result = await db.query('SELECT * FROM customers');
        // console.log('result .....',result.rows);
        res.json(result.rows);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Database error' });
    }
});

router.post('/createRecord', async (req, res) => {
    try {
        const { id, name, contact, address, city, postalCode, country } = req.body;

        // console.log('id', id, 'name', name, 'contact', contact, 'address', address);

        const result = await db.query(`
            INSERT INTO customers (customer_id,customer_name,contact_name,customer_address,city,postal_code,country)
            VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *
        `, [id, name, contact, address, city, postalCode, country]);

        res.status(201).json(result.rows);
    } catch (err) {
        console.log('Inser is getting the error', err);
        res.status(500).json({
            message: "Insert getting errro."
        })
    }
});

router.post('/createTable', async (req, res) => {
    try {
        const { tableName,columns } = req.body;

        if(!tableName || !columns || typeof columns !== 'object'){
            return res.status(400).json({message:"tableName and columns are required"});
        }
        const columnDefinitions = Object.entries(columns).map(([columnName,dataType])=>{
            return `"${columnName}" ${dataType}`
        }).join(', ');

        console.log('column definitons ....',columnDefinitions);

        const query = `CREATE TABLE "${tableName}" (${columnDefinitions})`; 
        await db.query(query);

        res.status(201).json({
            message:`Table "${tableName} created successfully..."`
        });
    } catch (err) {
        console.log('Inser is getting the error', err);
        res.status(500).json({
            message: "Insert getting errro."
        })
    }

});

export default router;