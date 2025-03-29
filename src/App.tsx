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
  // 在实际应用中，这里应该从后端获取数据
  const productData = JSON.parse(localStorage.getItem(`product_${id}`) || '{}') as ProductData;
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
