// pages/api/products/index.ts
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../libs/prismadb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const { category, search, sortOrder, brand, color, location, district } = req.query;

      let searchString = search as string | undefined;
      if (!searchString) {
        searchString = '';
      }

      let query: any = {};

      if (category) {
        query.category = category as string;
      }
      if (brand) {
        query.brand = brand as string;
      }
      if (color) {
        query.color = color as string;
      }
      if (location) {
        query.location = location as string;
      }
      if (district) {
        query.district = district as string;
      }

      const products = await prisma.product.findMany({
        where: {
          ...query,
          OR: [
            {
              productName: {
                contains: searchString,
                mode: 'insensitive',
              },
            },
            {
              description: {
                contains: searchString,
                mode: 'insensitive',
              },
            },
          ],
        },
        include: {
          user: true,
        },
        orderBy: {
          price: sortOrder === 'ascending' ? 'asc' : 'desc',
        },
      });

      res.status(200).json(products);
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ error: 'Error fetching products' });
    }
  } else if (req.method === 'POST') {
    try {
      const { productName, description, condition, category, color, brand, location, price, images, userId } = req.body;

      // Verilerin eksik olup olmadığını kontrol edin
      if (!productName || !description || !condition || !category || !color || !brand || !location || !price || !userId) {
        return res.status(400).json({ error: 'Eksik alanlar var.' });
      }

      const product = await prisma.product.create({
        data: {
          productName,
          description,
          condition,
          category,
          color,
          brand,
          location,
          price: parseFloat(price), // Price string olarak geldiyse sayıya çevir
          images,
          userId,
        },
      });
      res.status(201).json(product);
    } catch (error) {
      console.error('Error creating product:', error);
      res.status(500).json({ error: 'Error creating product' });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
