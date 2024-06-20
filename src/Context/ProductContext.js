import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [productList, setProductList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("/products");
  const [productID, setProductID] = useState("");
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // State to store error information

  useEffect(() => {
    setLoading(true);
    const getCategories = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products/categories");
        const formattedCategories = response.data.map(item =>
          item.replace(/^(.)|\s+(.)/g, (c) => c.toUpperCase())
        );
        setCategories(formattedCategories);
      } catch (error) {
        setError(error); // Set error state if request fails
      } finally {
        setLoading(false);
      }
    };
    getCategories();
  }, []);

  useEffect(() => {
    setLoading(true);
    const getProductData = async () => {
      try {
        let response;
        if (category && category.length > 0) {
          response = await axios.get(`https://fakestoreapi.com/products/category/${category}`);
        } else {
          response = await axios.get(`https://fakestoreapi.com/products`);
          setCategory(""); // Clear category state if default products are fetched
        }
        setProductList(response.data);
      } catch (error) {
        setError(error); // Set error state if request fails
      } finally {
        setLoading(false);
      }
    };
    getProductData();
  }, [category]);

  useEffect(() => {
    setLoading(true);
    const getProductDetail = async () => {
      try {
        if (productID && productID.length > 0) {
          const response = await axios.get(`https://fakestoreapi.com/products/${productID}`);
          setProduct(response.data);
        } else {
          setProduct({}); // Clear product state if no product ID is set
        }
      } catch (error) {
        setError(error); // Set error state if request fails
      } finally {
        setLoading(false);
      }
    };
    getProductDetail();
  }, [productID]);

  const values = {
    product,
    productList,
    productID,
    setProductID,
    categories,
    setCategory,
    loading,
    error, // Include error state in the context values
  };

  return (
    <ProductContext.Provider value={values}>{children}</ProductContext.Provider>
  );
};

export const useProduct = () => useContext(ProductContext);
