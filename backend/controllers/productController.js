import pool from '../config/db.js';

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
export const getAllProducts = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM products');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
export const getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            res.status(404).json({ error: 'Product not found' });
        } else {
            res.json(result.rows[0]);
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private
export const createProduct = async (req, res) => {
    const { name, image, description, category, price, stock } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO products (name, image, description, category, price, stock) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [name, image, description, category, price, stock]);
            res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private
export const updateProduct = async (req, res) => {
    const { name, image, description, category, price, stock } = req.body;
    const { id } = req.params;
    try {
        const result = await pool.query(
            'UPDATE products SET name = $1, image = $2, description = $3, brand = $4, category = $5, price = $6, stock = $7 WHERE id = $8 RETURNING *',
            [name, image, description, brand, category, price, stock, id]);
        if (result.rows.length === 0) {
            res.status(404).json({ error: 'Product not found' });
        } else {
            res.json(result.rows[0]);
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private
export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM products WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            res.status(404).json({ error: 'Product not found' });
        } else {
            res.json({ message: 'Product deleted successfully' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}