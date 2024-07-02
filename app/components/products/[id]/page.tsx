"use client"
import { useEffect, useState } from "react";
import DetailClient from "@/app/components/detail/DetailClient";
import axios from "axios";
import { set } from "react-hook-form";

type DetailProps = {
  productId?: string;
};

const Detail = ({ params }: { params: DetailProps }) => {
  const { productId } = params;
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/api/products/${productId}`);
        setProduct(response.data);
        setLoading(false);
      } catch (error: any) {
        console.error("Error fetching product details:", error);
        setLoading(false);
        setError(error.message);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading product details</div>;
  }

  return (
    <div>
      <DetailClient product={product} />
    </div>
  );
};

export default Detail;
