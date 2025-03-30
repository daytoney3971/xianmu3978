import React from 'react';
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import ProductForm from './components/ProductForm';
import ProductDisplay from './components/ProductDisplay';
import './i18n';
import './App.css';

interface ProductData {
  images: string[];
  name: string;
  phone: string;
  address: string;
  description: string;
  price: string;
  qrCode: string;
}

const ProductDisplayWrapper: React.FC = () => {
  const { id } = useParams();
  
  const defaultProductData: ProductData = {
    images: [],
    name: '',
    phone: '',
    address: '',
    description: '',
    price: '',
    qrCode: ''
  };
  
  try {
    // 使用 decodeURIComponent 来解码 URL 参数
    const decodedData = JSON.parse(atob(decodeURIComponent(id || '')));
    return <ProductDisplay {...decodedData} />;
  } catch (error) {
    console.error('数据解析失败:', error);
    // 如果解码失败，尝试从 localStorage 获取
    const productData = {
      ...defaultProductData,
      ...JSON.parse(localStorage.getItem(`product_${id}`) || '{}')
    };
    return <ProductDisplay {...productData} />;
  }
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductForm />} />
        <Route path="/product/:id" element={<ProductDisplayWrapper />} />
      </Routes>
    </Router>
  );
};

export default App;
