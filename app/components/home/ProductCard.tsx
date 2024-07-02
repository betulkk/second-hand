"use client";
import textClip from "@/utils/TextClip";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const ProductCard = ({ product }: { product: any }) => {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      onClick={() => router.push(`/products/${product.id}`)}
      className="w-[240px] cursor-pointer flex flex-col flex-1 shadow-xl p-4 rounded-lg transition-transform duration-300 transform hover:scale-105"
      style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative h-[150px] rounded-lg overflow-hidden">
        <Image src={product.images[0]} fill alt={product.productName} className="object-contain" />
      </div>
      <div className="text-center mt-2 space-y-1">
        <div>
          {textClip(product.productName)}
        </div>
        <div className="text-orange-600 font-bold text-lg md:text-xl">{product.price} ₺</div>
        <div className="text-slate-600  text-xs md:text-xl">{product.location} </div>
      </div>
      {isHovered && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 rounded-lg">
          <p className="text-white text-lg font-semibold">Ürüne Git</p>
        </div>
      )}
    </div>
  );
}

export default ProductCard;
