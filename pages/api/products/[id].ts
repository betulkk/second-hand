import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../libs/prismadb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;

    if (req.method === 'GET') {
        try {
            const product = await prisma.product.findUnique({
                where: { id: String(id) },
                include: {
                    user: true,
                }
            });
            res.status(200).json(product);
        } catch (error) {
            console.error('Error fetching product:', error);
            res.status(500).json({ error: 'Error fetching product' });
        }
    } else if (req.method === 'PUT') {
        try {
            const { productName, description, condition, category, brand, color, location, price, images } = req.body;

            // Eksik alanları kontrol edin
            if (!productName || !description || !condition || !category || !brand || !color || !location || !price || !images) {
                return res.status(400).json({ error: 'Eksik alanlar var.' });
            }

            const updatedProduct = await prisma.product.update({
                where: { id: String(id) },
                data: {
                    productName,
                    description,
                    condition,
                    category,
                    brand,
                    color,
                    location,
                    price:parseFloat(price),
                    images,
                },
            });
            res.status(200).json(updatedProduct);
        } catch (error) {
            console.error('Error updating product:', error);
            res.status(500).json({ error: 'Error updating product' });
        }
    } else if (req.method === 'DELETE') {
        try {
            await prisma.product.delete({
                where: { id: String(id) },
            });
            res.status(204).end();
        } catch (error) {
            console.error('Error deleting product:', error);
            res.status(500).json({ error: 'Error deleting product' });
        }
    } else {
        res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
