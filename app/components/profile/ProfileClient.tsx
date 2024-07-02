"use client";
import { useEffect, useState } from 'react';
import { Product, User } from '@prisma/client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ProductCard from '../home/ProductCard';
import Heading from '../general/Heading';

interface ProfileClientProps {
  currentUser: User | null | undefined;
}

const Profile: React.FC<ProfileClientProps> = ({ currentUser }) => {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        if (!response.ok) {
          throw new Error('API yanıtı başarılı olmadı');
        }
        const data = await response.json();
        const userProducts = data.filter((product: Product) => product.userId === currentUser?.id);
        setProducts(userProducts);
      } catch (error) {
        console.error('Ürünler getirilirken bir hata oluştu:', error);
      }
    };

    if (currentUser) {
      fetchProducts();
    }
  }, [currentUser]);

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setProducts(products.filter((product: Product) => product.id !== id));
      } else {
        console.error('Ürün silinemedi');
      }
    } catch (error) {
      console.error('Ürün silinirken hata oluştu', error);
    }
  };

  useEffect(() => {
    if (!currentUser) {
      router.push("/");
      router.refresh();
    }
  }, [currentUser, router]);

  if (!currentUser) {
    return <p>Lütfen giriş yapın</p>;
  }

  return (
    <div className="container my-10 ">
      <div className='font-bold'><Heading text="Profilim" center /></div>
      <div>Toplam ürün sayısı: {products.length}</div>
      {products.length === 0 ? (
        <div className="text-center my-2 text-lg text-slate-500">Henüz bir ürün eklemedin! <Link className="underline" href="/add-product">Hemen ekle!</Link> </div>
      ) : (
        <div className="flex-center grid grid-cols-1 md:grid-cols-3 gap-6 mx-auto">
          {products.map((product: Product) => (
            <div key={product.id} className="relative">
              <div onClick={() => router.push(`/products/${product.id}`)}>
                <ProductCard product={product} /> 
              </div>
              <div className="flex-center absolute top-2 right-1 space-y-2">
                <button className="text-red-500" onClick={() => handleDelete(product.id)}>Sil</button>
                <br></br>
                <Link href={`/products/${product.id}/edit`} passHref>
                  <button className="text-green-500">Düzenle</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Profile;
