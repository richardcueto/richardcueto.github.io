import { Routes, Route } from 'react-router-dom';
import Layout from "../../ecommerce/components/Layout"
import HomePage from '../../ecommerce/pages/Home';
import ProductPage from '../../ecommerce/pages/product';
// import './styles/globals.css';

const ecommerce = () => {

  return (
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products/:id" element={<ProductPage />} />
        </Routes>
      </Layout>
  );
};

export default ecommerce;

