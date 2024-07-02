'use client';

import Image from 'next/image';
import PageContainer from '../containers/PageContainer';
import Button from '../general/Button';
import { MdPhoneEnabled } from 'react-icons/md';
import { useState } from 'react';
import Modal from '../general/Modal';
import { User } from '@prisma/client';

const DetailClient = ({ product }: { product: any }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [showContactModal, setShowContactModal] = useState(false);

  const handleNextImage = () => {
    setCurrentImage((prev) => (prev + 1) % product.images.length);
  };

  const handlePrevImage = () => {
    setCurrentImage((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  return (
    <PageContainer>
      <div className="flex flex-col md:flex-row items-center justify-center my-10">
        <div className="relative h-[400px] w-[400px] mb-6 md:mb-0 md:mr-6">
          {product.images && product.images.length > 0 && (
            <>
              <Image
                src={product.images[currentImage]}
                width={300}
                height={300}
                alt="Product Image"
                className="rounded-md"
              />
              {product.images.length > 1 && (
                <div className="absolute top-1/2 left-0 transform -translate-y-1/2 flex justify-between w-full">
                  <button onClick={handlePrevImage} className="bg-black text-white p-2 rounded-full">
                    {'<'}
                  </button>
                  <button onClick={handleNextImage} className="bg-black text-white p-2 rounded-full">
                    {'>'}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
        <div className="p-6 bg-[#f4e8df] text-[#f6ae82] rounded-lg w-full md:w-1/2 space-y-3">
        <div className="text-2xl font-bold">Başlık: <span className="font-bold">{product?.productName}</span></div>
        <div><span className="font-bold text-bg">Açıklama:</span> <span className="font-normal">{product?.description}</span></div>
        <div><span className="font-bold text-bg">Durum:</span> <span className="font-normal">{product?.condition}</span></div>
        <div><span className="font-bold text-bg">Kategori:</span> <span className="font-normal">{product?.category}</span></div>
        <div><span className="font-bold text-bg">Marka:</span> <span className="font-normal">{product?.brand}</span></div>
        <div><span className="font-bold text-bg">Renk:</span> <span className="font-normal">{product?.color}</span></div>
        <div><span className="font-bold text-bg">Konum:</span> <span className="font-normal">{product?.location}</span></div>

          <div className="text-2xl text-orange-600 font-bold">{product.price} ₺</div>
          <Button text="Satıcıya Ulaşın" icon={MdPhoneEnabled} small onClick={() => setShowContactModal(true)} />
        </div>
      </div>

      <Modal isOpen={showContactModal} onClose={() => setShowContactModal(false)}>
        <div className="space-y-3">
          <div className="text-lg font-bold">Satıcı Bilgileri</div>
          <div>Ad Soyad: {product?.user?.name}</div>
          <div>Telefon: {product?.user?.phone}</div>
        </div>
      </Modal>
    </PageContainer>
  );
};

export default DetailClient;
