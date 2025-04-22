export const createTransaction = async (req, res) => {
    const client = await pool.connect();

    try {
        const { items, total_amount, payment_type, discount } = req.body;

        // Start a transaction
        await client.query('BEGIN');

        // 1. Insert into transactions
        const transactionResult = await client.query(
            'INSERT INTO transactions (total_amount, payment_type) VALUES ($1, $2) RETURNING *',
            [total_amount, payment_type]
        );
        const transactionId = transactionResult.rows[0].id;

        // 2. Insert items into transaction_items
        for (const item of items) {
            const { product_id, quantity, price } = item;

            await client.query(
                'INSERT INTO transaction_items (transaction_id, product_id, quantity, price) VALUES ($1, $2, $3, $4)',
                [transactionId, product_id, quantity, price]
            );

            // 3. Update stock
            await client.query(
                'UPDATE products SET stock_quantity = stock_quantity - $1 WHERE id = $2',
                [quantity, product_id]
            );
        }

        // 4. Insert discount (optional)
        if (discount) {
            const { discount_type, discount_value } = discount;
            await client.query(
                'INSERT INTO discounts (transaction_id, discount_type, discount_value) VALUES ($1, $2, $3)',
                [transactionId, discount_type, discount_value]
            );
        }

        // Commit transaction
        await client.query('COMMIT');

        res.status(201).json({ message: 'Transaction completed', transactionId });

    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Transaction error:', error);
        res.status(500).json({ error: 'Failed to create transaction' });
    } finally {
        client.release();
    }
};
