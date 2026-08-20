// components/layouts/PublicLayout.tsx
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ScrollUp from '../components/Common/ScrollUp';

export default function PublicLayout() {
  return (
    <>
      <ScrollUp />
      <Header />
      <main>
        <Outlet /> {/* Aquí se cargan las subrutas públicas */}
      </main>
      <Footer />
    </>
  );
}