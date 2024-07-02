
import prisma from '@/libs/prismadb';

export interface IProductParams {
  category?: string | null;
  search?: string | null;
  sortOrder?: 'ascending' | 'descending';
  brand?: string | null;
  color?: string | null;
  location?: string | null;
  district?: string | null;
}

export default async function getProducts(params: IProductParams) {
  try {
    const { category, search, sortOrder,brand,color,location,district } = params;
    const searchString = search ?? "";

    let query: any = {};

    if (category) {
      query.category = category;
    }
    if (brand) {
      query.brand = brand;
    }
    if (color) {
      query.color = color;
    }
    if (location) {
      query.location = location;
    }
    if (district) {
      query.district = district;
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

    return products;
  } catch (error: any) {
    throw new Error(error);
  }
}
