import { useEffect, useState } from 'react';
import Heading from '../general/Heading';
import ProductCard from './ProductCard';

interface Product {
  id: string;
  productName: string;
  price: number;
  description: string;
  image: string;
  category: string;
  brand: string;
  color: string;
  location: string;
  district: string;
  user: {
    id: string;
    name: string | null;
    email: string | null;
    emailVerified: Date | null;
    image: string | null;
    hashed_password: string | null;
    phone: string | null;
    role: string;
    createdAt: Date;
    updatedAt: Date;
  };
}

interface ProductsProps {
  searchQuery: string;
  selectedCategory: string;
  filters: Record<string, any>;
  sortOrder: 'ascending' | 'descending';
}

const Products: React.FC<ProductsProps> = ({ searchQuery, selectedCategory, filters, sortOrder }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMoreProducts, setHasMoreProducts] = useState<boolean>(true);

  const fetchProducts = async (reset = false) => {
    const params = new URLSearchParams({
      search: searchQuery,
      category: selectedCategory,
      sortOrder,
      ...filters,
      limit: '8',
      offset: (reset ? 0 : products.length).toString(),
    });

    const response = await fetch(`/api/products?${params.toString()}`, {
      method: 'GET',
    });

    const fetchedProducts = await response.json();

    if (reset) {
      setProducts(fetchedProducts);
      setDisplayedProducts(fetchedProducts.slice(0, 8));
      setPage(1);
    } else {
      setProducts(prevProducts => [...prevProducts, ...fetchedProducts]);
      setDisplayedProducts(prevDisplayed => [
        ...prevDisplayed,
        ...fetchedProducts.slice(0, Math.min(8, fetchedProducts.length)),
      ]);
    }

    if (fetchedProducts.length < 8) {
      setHasMoreProducts(false);
    } else {
      setHasMoreProducts(true);
    }
  };

  useEffect(() => {
    fetchProducts(true);
  }, [searchQuery, selectedCategory, filters, sortOrder]);

  const loadMoreProducts = () => {
    const nextPageProducts = products.slice(page * 8, (page + 1) * 8);
    setDisplayedProducts(prevDisplayed => [...prevDisplayed, ...nextPageProducts]);
    setPage(prevPage => prevPage + 1);

    if (nextPageProducts.length < 8) {
      setHasMoreProducts(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center font-bold">
        <Heading text={searchQuery || selectedCategory ? 'Arama Sonuçları' : 'Tüm Ürünler'} center />
      </div>
      <div className="flex-center grid grid-cols-2 md:grid-cols-4 gap-6 mx-auto max-w-screen-lg px-1">
        {displayedProducts.length > 0 ? (
          displayedProducts.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p>Aradığınız kriterlere uygun ürün bulunamadı.</p>
        )}
      </div>
      {hasMoreProducts && (
        <div className="flex justify-center mt-4">
          <button
            onClick={loadMoreProducts}
            className="px-4 py-2 bg-white text-[#e8b2d8] rounded"
          >
            Diğer Ürünleri Göster
          </button>
        </div>
      )}
    </div>
  );
};

export default Products;
