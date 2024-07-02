"use client";
import { useForm } from 'react-hook-form';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Input from './general/Input';
import ChoiceInput from './general/ChoiceInput';
import Button from './general/Button';
import Heading from './general/Heading';
import { FaBabyCarriage, FaBath, FaSearchPlus } from 'react-icons/fa';
import { GiClothes, GiConverseShoe } from 'react-icons/gi';
import { Product } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { getCurrentUser } from '../actions/getCurrentUser';
import { User } from '@prisma/client';

interface ProductProps {
    existingProduct?: Product;
}

const CreateForm: React.FC<ProductProps> =  ({ existingProduct }: { existingProduct?: Product }) => {

  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [productName, setProductName] = useState(existingProduct?.productName || '');
  const [description, setDescription] = useState(existingProduct?.description || '');
  const [price, setPrice] = useState(existingProduct?.price || '');
  const [condition, setCondition] = useState(existingProduct?.condition || '');
  const [category, setCategory] = useState(existingProduct?.category || '');
  const [color, setColor] = useState(existingProduct?.color || '');
  const [brand, setBrand] = useState(existingProduct?.brand || '');
  const [location, setLocation] = useState(existingProduct?.location || '');
  const [imgList, setImgList] = useState<string[]>([]);
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<User|null>(null);
  const [brandList, setBrandList] = useState<string[]>([]);
  const router = useRouter();

  const brandOptions = {
    "Bebek Arabası": ["Chicco", "Kraft", "Prego", "Baby2Go", "Pierre Cardin", "Casual", "Silver Cross", "Maxi-Cosi", "Quinny", "Cybex", "Diğer"],
    "Puset": ["Maxi-Cosi", "Quinny", "Cybex"],
    "Kıyafet": ["Baby2Go", "Pierre Cardin", "Casual"],
    "Ayakkabı": ["Nike", "Adidas", "Puma"],
    "Banyo Gereçleri": ["Fisher-Price", "Babyjem", "OkBaby"],
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('/api/user');
        setCurrentUser(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
        setCurrentUser(null);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (existingProduct) {
      setProductName(existingProduct.productName);
      setDescription(existingProduct.description);
      setPrice(existingProduct.price);
      setCategory(existingProduct.category);
      setBrand(existingProduct.brand);
      setColor(existingProduct.color);
      setLocation(existingProduct.location);
    }
  }, [existingProduct]);

  useEffect(() => {
    if (category) {
      setBrandList(brandOptions[category as keyof typeof brandOptions] || []);
      setValue("category", category);
    }
  }, [category, setValue]);

  useEffect(() => {
    if (condition) {
      setValue("condition", condition);
    }
  }, [condition, setValue]);

  useEffect(() => {
    if (color) {
      setValue("color", color);
    }
  }, [color, setValue]);

  const categoryList = [
    { name: "Bebek Arabası", icon: FaBabyCarriage },
    { name: "Puset", icon: FaBabyCarriage },
    { name: "Kıyafet", icon: GiClothes },
    { name: "Ayakkabı", icon: GiConverseShoe },
    { name: "Banyo Gereçleri", icon: FaBath }
  ];

  const colorList = [
    { name: "Siyah", color: "black" },
    { name: "Beyaz", color: "white" },
    { name: "Mavi", color: "blue" },
    { name: "Yeşil", color: "green" },
    { name: "Kırmızı", color: "red" },
    { name: "Pembe", color: "pink" },
    { name: "Sarı", color: "yellow" },
    { name: "Turuncu", color: "orange" },
    { name: "Mor", color: "purple" },
    { name: "Çok Renkli", color: "multi-color" }
  ];

  const conditionList = [
    { name: "Yeni" },
    { name: "Az Kullanılmış" },
    { name: "Az Hasarlı" },
    { name: "Hasarlı" }
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

  const onSubmit = async (data: any) => {
    console.log(data);
    if (!data.productName || !data.description || !data.price || !data.brand || !data.location) {
      console.error('Required fields are missing');
      return;
    }

    if (!currentUser) {
      console.error('User is not authenticated');
      router.push("/login");
      return;
    }

    const formData = {
      ...data,
      price:parseFloat(data.price),
      images: imgList,
      userId: currentUser.id
    };

    try {
      
      if (existingProduct) {
        const response = await axios.put(`/api/products/${existingProduct.id}`, formData);
        console.log('Update response:', response);
      } else {
        const response = await axios.post('/api/products', formData);
        console.log('Create response:', response);
      }
      router.push('/');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error:', error.response?.data);
    } else {
        console.error('Unknown error:', error);
    }
    }
  };

  const convertToBase64 = (file: File) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };


  const onChangeFunc = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files);
      const base64List = await Promise.all(filesArray.map(file => convertToBase64(file)));
      setImgList([...imgList, ...base64List]);
    }
  };

  const removeImage = (index: number) => {
    setImgList(imgList.filter((_, i) => i !== index));
  };

  const handleImageClick = (img: string) => {
    setSelectedImg(img);
  };

  return (
    <div>
      <Heading text={existingProduct ? "Ürün Güncelle" : "Ürün Oluştur"} center />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input id="productName" placeholder="Ürün Adı" type="text" required register={register} errors={errors} />
        <Input id="description" placeholder="Ürün Açıklaması" type="text" required register={register} errors={errors} />

        <div className="flex flex-wrap gap-3">
          {conditionList.map((cond, i) => (
            <ChoiceInput key={i} text={cond.name} onClick={() => setCondition(cond.name)} selected={condition === cond.name} />
          ))}
        </div>

        <div className="flex flex-wrap gap-3">
          {categoryList.map((cat, i) => (
            <ChoiceInput key={i} icon={cat.icon} text={cat.name} onClick={() => setCategory(cat.name)} selected={category === cat.name} />
          ))}
        </div>

        <div className="flex flex-wrap gap-3">
          {colorList.map((col, i) => (
            <ChoiceInput key={i} text={col.name} color={col.color} onClick={() => setColor(col.name)} selected={color === col.name} />
          ))}
        </div>

        <div className="mb-4">
          <label htmlFor="brand" className="block text-sm font-medium text-gray-700">Marka</label>
          <select id="brand" {...register("brand", { required: true })} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
            {brandList.map((brand, i) => <option key={i} value={brand}>{brand}</option>)}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">Lokasyon</label>
          <select id="location" {...register("location", { required: true })} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
            {cities.map((city, i) => <option key={i} value={city}>{city}</option>)}
          </select>
        </div>

        <Input id="price" placeholder="Ürün Fiyatı" type="number" required register={register} errors={errors} />

        <div>
          <input className="mb-2" type="file" multiple onChange={onChangeFunc} />
          <div className="flex flex-wrap gap-2">
            {imgList.map((img, index) => (
              <div key={index} className="relative group">
                <img src={img} alt={`uploaded-img-${index}`} className="w-24 h-24 object-cover cursor-pointer" onClick={() => handleImageClick(img)} />
                <FaSearchPlus className="absolute inset-0 m-auto text-white text-2xl opacity-0 group-hover:opacity-100" />
                <button type="button" className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1" onClick={() => removeImage(index)}>X</button>
              </div>
            ))}
          </div>
        </div>
        <Button text={existingProduct ? "Ürünü Güncelle" : "Ürünü Kaydet"} onClick={handleSubmit(onSubmit)} />
      </form>
    </div>
  );
};

export default CreateForm;
