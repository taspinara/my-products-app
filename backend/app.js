import express from 'express';
import cors from 'cors';
import productRoutes from './routes/productRoutes.js';

const app = express();

app.use(cors({
    origin: 'http://localhost:5173'
}));
app.use(express.json());
app.use('/products', productRoutes);

app.all('*', (req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

export default app;