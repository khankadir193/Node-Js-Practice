import express from 'express';
import neonConnect from '../Services/neondb.js';
const app = express();

app.use(express.json());

app.get('/api/neon/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const customerId = Number(id);
        console.log('customer id..',customerId);

        if (!Number.isInteger(customerId)) {
            return res.status(400).json({
                message: 'Invalid customer Id'
            })
        }

        const result = await neonConnect.query(`SELECT * FROM customers WHERE customer_id = $1`, [customerId]);
        console.log('result...', result.rows);

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: 'Customer not found'
            })
        }

        res.status(200).json({
            message: "Data Fetched Successfully...",
            result: result.rows
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

app.put('/api/updateRecord/:id', async (req, res) => {
    try {
        const { name, contact, address, city, postalCode, country } = req.body;
        // console.log('...name', name, '...contact.', contact);
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                message: 'Customer ID required.'
            })
        }

        const result = await neonConnect.query(`UPDATE customers 
            SET customer_name = $1,contact_name = $2,customer_address = $3,city = $4,postal_code = $5,country = $6 WHERE customer_id = $7 RETURNING *`
            , [name, contact, address, city, postalCode, country, id]);

        if (result.rowCount === 0) {
            return res.status(404).json({
                message: 'Record not found.'
            })
        }

        res.status(200).json({ message: 'Record update successfully', data: result.rows[0] });
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});

app.patch('/api/patchRecord/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const allowedFields = {
            name: 'customer_name',
            contact: 'contact_name',
            address: 'customer_address',
            city: 'city',
            postalCode: 'postal_code',
            country: 'country'
        };

        const fields = Object.keys(req.body);
        if (fields.length === 0) {
            return res.status(400).json({
                message: "No fields provided for update."
            })
        }

        const invalidFields = fields.filter(field => !allowedFields[field]);
        if (invalidFields.length > 0) {
            return res.status(400).json({
                message: `Invalid fields ${invalidFields.join(', ')}`
            });
        }

        const setQuery = fields
            .map((field, index) => `${allowedFields[field]} = $${index + 1}`)
            .join(', ');

        const values = fields.map(field => req.body[field]);
        values.push(id);

        const result = await neonConnect.query(
            `UPDATE customers
             SET ${setQuery}
             WHERE customer_id = $${values.length}
             RETURNING *`,
            values
        );

        if (result.rowCount === 0) {
            return res.status(404).json({
                message: 'Record not found.'
            });
        }

        res.status(200).json({
            message: 'Record updated successfully.',
            data: result.rows[0]
        });
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});

app.delete('/api/deleteRecord/:id', async (req, res) => {
    try {
        const { id } = req.params;

        console.log('id....---', id);

        if (!id) {
            res.status(400).json({
                message: "Customer ID is required."
            })
        }

        const result = await neonConnect.query(`DELETE FROM customers 
            WHERE customer_id = $1 RETURNING *`, [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({
                message: "Record not found"
            })
        }

        res.status(200).json({
            message: 'Record deleted successfully.',
            data: result.rows[0]
        })

    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
});

if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.NEON_PORT || 5000;
    app.listen(PORT, () => {
        console.log('server running on this port :-', PORT);
    })
}
