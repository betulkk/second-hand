import DetailClient from '@/app/components/detail/DetailClient';
import prisma from '@/libs/prismadb';

// Veriyi sunucu tarafında getirme fonksiyonu
const getProduct = async (id: string) => {
  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      user: true,
    }
  });

  return product;
};

interface ProductDetailPageProps {
  params: {
    id: string;
  };
}

const ProductDetailPage = async ({ params }: ProductDetailPageProps) => {
  const product = await getProduct(params.id);

  if (!product) {
    // Ürün bulunamadığında 404 sayfası döndürme
    return <div>Product not found</div>;
  }

  return <DetailClient product={product} />;
};

export default ProductDetailPage;
