import { useState, useEffect } from 'react';
import { FaFilter, FaTimes } from 'react-icons/fa';

const Filter = ({ onApplyFilters }: { onApplyFilters: (filters: { category: string, brand: string, color: string, location: string, district: string }) => void }) => {
    const [showFilters, setShowFilters] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');

    const categoryList = ["Bebek Arabası", "Puset", "Kıyafet", "Ayakkabı", "Banyo Gereçleri"];
    const brandList = ["Chicco", "Kraft", "Prego", "Baby2Go", "Pierre Cardin"];
    const colorList = ["Siyah", "Beyaz", "Mavi", "Yeşil", "Kırmızı", "Pembe", "Sarı", "Turuncu", "Mor", "Çok Renkli"];
    const cityList = ["Adana", "Adıyaman", "Afyonkarahisar", "Ağrı", "Amasya", "Ankara", "Antalya", "Artvin", "Aydın",
    "Balıkesir", "Bilecik", "Bingöl", "Bitlis", "Bolu", "Burdur", "Bursa", "Çanakkale", "Çankırı",
    "Çorum", "Denizli", "Diyarbakır", "Edirne", "Elazığ", "Erzincan", "Erzurum", "Eskişehir", "Gaziantep",
    "Giresun", "Gümüşhane", "Hakkâri", "Hatay", "Isparta", "Mersin", "İstanbul", "İzmir", "Kars",
    "Kastamonu", "Kayseri", "Kırklareli", "Kırşehir", "Kocaeli", "Konya", "Kütahya", "Malatya", "Manisa",
    "Kahramanmaraş", "Mardin", "Muğla", "Muş", "Nevşehir", "Niğde", "Ordu", "Rize", "Sakarya",
    "Samsun", "Siirt", "Sinop", "Sivas", "Tekirdağ", "Tokat", "Trabzon", "Tunceli", "Şanlıurfa",
    "Uşak", "Van", "Yozgat", "Zonguldak", "Aksaray", "Bayburt", "Karaman", "Kırıkkale", "Batman",
    "Şırnak", "Bartın", "Ardahan", "Iğdır", "Yalova", "Karabük", "Kilis", "Osmaniye", "Düzce"];
    const districtList: { [key: string]: string[] } = {
        "İstanbul": ["Beşiktaş", "Kadıköy", "Şişli"],
        "Ankara": ["Çankaya", "Keçiören", "Yenimahalle"],
        "İzmir": ["Konak", "Bornova", "Karşıyaka"]
    };

    const applyFilters = () => {
        onApplyFilters({
            category: selectedCategory,
            brand: selectedBrand,
            color: selectedColor,
            location: selectedLocation,
            district: selectedDistrict,
        });
        setShowFilters(false);
    };

    const clearFilter = (filter: string) => {
        switch (filter) {
            case 'category':
                setSelectedCategory('');
                break;
            case 'brand':
                setSelectedBrand('');
                break;
            case 'color':
                setSelectedColor('');
                break;
            case 'location':
                setSelectedLocation('');
                setSelectedDistrict(''); 
                break;
            case 'district':
                setSelectedDistrict('');
                break;
        }
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (showFilters && !(event.target as HTMLElement).closest('.filter-container')) {
                setShowFilters(false);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [showFilters]);

    return (
        <div className="relative filter-container z-50">
            <button onClick={() => setShowFilters(!showFilters)} className="flex items-center justify-center gap-2 text-[#e8b2d8] bg-white px-4 py-2 ">
                <FaFilter />
                Filtrele
            </button>
            {showFilters && (
                <div className="absolute z-50 top-12 left-0 bg-white p-4 rounded shadow-lg w-80">
                    <div className="mb-4 flex justify-between items-center">
                        <label>Kategori</label>
                        {selectedCategory && (
                            <button onClick={() => clearFilter('category')}><FaTimes /></button>
                        )}
                    </div>
                    <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)} className="w-full p-2 border rounded">
                        <option value="">Seç</option>
                        {categoryList.map(category => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                    </select>
                    <div className="mb-4 flex justify-between items-center mt-4">
                        <label>Marka</label>
                        {selectedBrand && (
                            <button onClick={() => clearFilter('brand')}><FaTimes /></button>
                        )}
                    </div>
                    <select value={selectedBrand} onChange={e => setSelectedBrand(e.target.value)} className="w-full p-2 border rounded">
                        <option value="">Seç</option>
                        {brandList.map(brand => (
                            <option key={brand} value={brand}>{brand}</option>
                        ))}
                    </select>
                    <div className="mb-4 flex justify-between items-center mt-4">
                        <label>Renk</label>
                        {selectedColor && (
                            <button onClick={() => clearFilter('color')}><FaTimes /></button>
                        )}
                    </div>
                    <select value={selectedColor} onChange={e => setSelectedColor(e.target.value)} className="w-full p-2 border rounded">
                        <option value="">Seç</option>
                        {colorList.map(color => (
                            <option key={color} value={color}>{color}</option>
                        ))}
                    </select>
                    <div className="mb-4 flex justify-between items-center mt-4">
                        <label>Konum</label>
                        {selectedLocation && (
                            <button onClick={() => clearFilter('location')}><FaTimes /></button>
                        )}
                    </div>
                    <select value={selectedLocation} onChange={e => setSelectedLocation(e.target.value)} className="w-full p-2 border rounded">
                        <option value="">Seç</option>
                        {cityList.map(city => (
                            <option key={city} value={city}>{city}</option>
                        ))}
                    </select>
                    {selectedLocation && (
                        <div className="mb-4 flex justify-between items-center mt-4">
                            <label>İlçe</label>
                            {selectedDistrict && (
                                <button onClick={() => clearFilter('district')}><FaTimes /></button>
                            )}
                        </div>
                    )}
                    {selectedLocation && (
                        <select value={selectedDistrict} onChange={e => setSelectedDistrict(e.target.value)} className="w-full p-2 border rounded">
                            <option value="">Seç</option>
                            {districtList[selectedLocation]?.map(district => (
                                <option key={district} value={district}>{district}</option>
                            ))}
                        </select>
                    )}
                    <button onClick={applyFilters} className="bg-blue-500 text-white px-4 py-2 rounded mt-4">Uygula</button>
                </div>
            )}
        </div>
    );
};

export default Filter;
