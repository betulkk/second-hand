"use client"
import { MdOutlineAddCircle } from "react-icons/md";
import { useRouter } from "next/navigation"

const AddProduct = () => {
    const router=useRouter()
  
  return (
    <div className="flex-container" style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
      <button className="add-product-button" onClick={()=>router.push(`/add-product/`)}>
        <b>Ürün Ekle</b>
        <div className="icon" style={{ marginLeft: '10px', marginRight: '10px', cursor: 'pointer' }}>
          <MdOutlineAddCircle size="50" color="#f0b3b8" />
        </div>
      </button>
    </div>
  );
};

export default AddProduct;
