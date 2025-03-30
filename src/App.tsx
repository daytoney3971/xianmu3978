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
  // 添加默认值，确保即使没有数据也有一个有效的结构
  const defaultProductData: ProductData = {
    images: [],
    name: '',
    phone: '',
    address: '',
    description: '',
    price: '',
    qrCode: ''
  };
  
  const productData = {
    ...defaultProductData,
    ...JSON.parse(localStorage.getItem(`product_${id}`) || '{}')
  };

  return <ProductDisplay {...productData} />;
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
