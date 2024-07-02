import { useState } from 'react';

interface CategoryProps {
  onSelectCategory: (category: string) => void;
}

const Category = ({ onSelectCategory }: CategoryProps) => {
  const [categoryList, setCategories] = useState([
    { name: "Bebek Arabası", id: "baby-stroller" },
    { name: "Puset", id: "stroller" },
    { name: "Kıyafet", id: "clothing" },
    { name: "Ayakkabı", id: "shoes" },
    { name: "Banyo Gereçleri", id: "bathroom" },
  ]);

  const [selectedCategory, setSelectedCategory] = useState('');

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    onSelectCategory(category);
  };

  const handleClearFilters = () => {
    setSelectedCategory('');
    onSelectCategory('');
  };

  return (
    <div className="flex items-center justify-center px-3 md:px-10 gap-3 md:gap-10 py-5 md:py-8 overflow-x-auto font-bold">
      {categoryList.map((category,index) => (
        <div
          key={index}
          onClick={() => handleCategoryClick(category.name)}
          className={` text-slate-500 rounded-md min-w-[120px] flex items-center justify-center cursor-pointer flex-1 px-4 py-2 text-center ${
            selectedCategory === category.name ? 'bg-[#f6ae82]' : 'bg-[#fbfbfb]'
          }`}
        >
          {category.name}
        </div>
      ))}
      {selectedCategory && (

<button onClick={handleClearFilters} >
Seçimi Temizle
</button>
      )}
      
    </div>
  );
};

export default Category;
