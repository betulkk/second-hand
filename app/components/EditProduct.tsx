"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import {FieldValues,SubmitHandler,useForm,} from 'react-hook-form';
import Heading from '@/app/components/general/Heading';
import Input from '@/app/components/general/Input';
import ChoiceInput from '@/app/components/general/ChoiceInput';
import Modal from '@/app/components/general/Modal';
import Button from '@/app/components/general/Button';
import Image from 'next/image';
import { FaBabyCarriage, FaBath, FaSearchPlus } from 'react-icons/fa';
import { GiClothes, GiConverseShoe } from 'react-icons/gi';

const EditProduct = () => {
  const router = useRouter();
  const { id } = router.query;

  const [product, setProduct] = useState<any>(null);
  const [imgList, setImgList] = useState<File[]>([]);
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      productName: '',
      description: '',
      condition: '',
      category: '',
      brand: '',
      color: '',
      location: '',
      price: 0,
      images: [],
    },
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/api/products/${id}`);
        setProduct(response.data);
        setValue('productName', response.data.productName);
        setValue('description', response.data.description);
        setValue('condition', response.data.condition);
        setValue('category', response.data.category);
        setValue('brand', response.data.brand);
        setValue('color', response.data.color);
        setValue('location', response.data.location);
        setValue('price', response.data.price);
        setValue('images', response.data.images);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const onSubmit: SubmitHandler<FieldValues> = async (data: FieldValues) => {
    try {
      await axios.put(`/api/products/${id}`, data);
      router.push('/profile');
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const categoryList = [
    { name: 'Bebek Arabası', icon: FaBabyCarriage },
    { name: 'Puset', icon: FaBabyCarriage },
    { name: 'Kıyafet', icon: GiClothes },
    { name: 'Ayakkabı', icon: GiConverseShoe },
    { name: 'Banyo Gereçleri', icon: FaBath },
  ];

  const colorList = [
    { name: 'Siyah', color: 'black' },
    { name: 'Beyaz', color: 'white' },
    { name: 'Mavi', color: 'blue' },
    { name: 'Yeşil', color: 'green' },
    { name: 'Kırmızı', color: 'red' },
    { name: 'Pembe', color: 'pink' },
    { name: 'Sarı', color: 'yellow' },
    { name: 'Turuncu', color: 'orange' },
    { name: 'Mor', color: 'purple' },
    { name: 'Çok Renkli', color: 'multi-color' },
  ];

  const conditionList = [
    { name: 'Yeni' },
    { name: 'Az Kullanılmış' },
    { name: 'Az Hasarlı' },
    { name: 'Hasarlı' },
  ];

  const brandList = [
    'Chicco',
    'Kraft',
    'Prego',
    'Baby2Go',
    'Pierre Cardin',
    'Casual',
    'Silver Cross',
    'Maxi-Cosi',
    'Quinny',
    'Cybex',
    'Diğer',
  ];

  const cities = [
    "Adana", "Adıyaman", "Afyonkarahisar", "Ağrı", "Amasya", "Ankara", "Antalya", "Artvin", "Aydın",
    "Balıkesir", "Bilecik", "Bingöl", "Bitlis", "Bolu", "Burdur", "Bursa", "Çanakkale", "Çankırı",
    "Çorum", "Denizli", "Diyarbakır", "Edirne", "Elazığ", "Erzincan", "Erzurum", "Eskişehir", "Gaziantep",
    "Giresun", "Gümüşhane", "Hakkâri", "Hatay", "Isparta", "Mersin", "İstanbul", "İzmir", "Kars",
    "Kastamonu", "Kayseri", "Kırklareli", "Kırşehir", "Kocaeli", "Konya", "Kütahya", "Malatya", "Manisa",
    "Kahramanmaraş", "Mardin", "Muğla", "Muş", "Nevşehir", "Niğde", "Ordu", "Rize", "Sakarya",
    "Samsun", "Siirt", "Sinop", "Sivas", "Tekirdağ", "Tokat", "Trabzon", "Tunceli", "Şanlıurfa",
    "Uşak", "Van", "Yozgat", "Zonguldak", "Aksaray", "Bayburt", "Karaman", "Kırıkkale", "Batman",
    "Şırnak", "Bartın", "Ardahan", "Iğdır", "Yalova", "Karabük", "Kilis", "Osmaniye", "Düzce"
    ];

    const handleImageClick = (img: string) => {
      setSelectedImg(img);
  }

  const removeImage = (index: number) => {
    setImgList(imgList.filter((_, i) => i !== index));
}

  return (
    <div>
      <Heading text="ÜRÜN GÜNCELLE" center />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          id="productName"
          placeholder="Ürün Adı"
          type="text"
          required
          register={register}
          errors={errors}
        />

        <Input
          id="description"
          placeholder="Ürün Açıklaması"
          type="text"
          required
          register={register}
          errors={errors}
        />

        <div className="flex flex-wrap gap-3">
          {conditionList.map((cond, i) => (
            <ChoiceInput
              key={i}
              text={cond.name}
              onClick={() => setValue('condition', cond.name)}
              selected={watch('condition') === cond.name}
            />
          ))}
        </div>

        <div className="flex flex-wrap gap-3">
          {categoryList.map((cat, i) => (
            <ChoiceInput
              key={i}
              icon={cat.icon}
              text={cat.name}
              onClick={() => setValue('category', cat.name)}
              selected={watch('category') === cat.name}
            />
          ))}
        </div>

        <div className="flex flex-wrap gap-3">
          {colorList.map((col, i) => (
            <ChoiceInput
              key={i}
              text={col.name}
              color={col.color}
              onClick={() => setValue('color', col.name)}
              selected={watch('color') === col.name}
            />
          ))}
        </div>

        <div className="mb-4">
          <label htmlFor="brand" className="block text-sm font-medium text-gray-700">
            Marka
          </label>
          <select
            id="brand"
            {...register('brand', { required: true })}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            {brandList.map((brand, i) => (
              <option key={i} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">
            Lokasyon
          </label>
          <select
            id="location"
            {...register('location', { required: true })}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            {cities.map((city, i) => (
              <option key={i} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        <Input
          id="price"
          placeholder="Ürün Fiyatı"
          type="number"
          required
          register={register}
          errors={errors}
        />

        <div>
          <input
            type="file"
            multiple
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                setImgList([...imgList,...Array.from(e.target.files)]);
              }
            }}
          />
          <div className="flex flex-wrap gap-2">
            {imgList.map((img, index) => (
              <div key={index} className="relative group">
                <img
                  src={URL.createObjectURL(img)}
                  alt={`uploaded-img-${index}`}
                  className="w-24 h-24 object-cover cursor-pointer"
                  onClick={() => handleImageClick(URL.createObjectURL(img))}
                />
                <FaSearchPlus
                  className="absolute inset-0 m-auto text-white text-2xl opacity-0 group-hover:opacity-100"
                />
                <button
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                  onClick={() => removeImage(index)}
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>

        <Button text="Güncelle"onClick={handleSubmit(onSubmit)} />
      </form>
    </div>
  );
};

export default EditProduct;