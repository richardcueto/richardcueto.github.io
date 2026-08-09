import { useEffect } from 'react'
import PageTitle from '../components/PageTitle'
import CartTable from '../components/CartTable'
import CheckOutButton from '../components/CheckOutButton'
import BackToProductButton from '../components/BackToProductButton'
import { useCartContext } from '../context/Store' // Ajusta el path si usas alias '@/'

function CartPage() {
  const siteTitle = import.meta.env.VITE_SITE_TITLE || 'Mi Tienda'
  const [cart, checkoutUrl] = useCartContext()

  // Actualiza el título de la pestaña del navegador al cargar el componente
  useEffect(() => {
    document.title = `Cart | ${siteTitle}`
  }, [siteTitle])

  return (
    <div className="container mx-auto mb-20 min-h-screen">
      <PageTitle text="Your Cart" />
      
      <CartTable cart={cart} />
      
      <div className="max-w-sm mx-auto space-y-4 px-2">
        <CheckOutButton webUrl={checkoutUrl} />
        <BackToProductButton />
      </div>
    </div>
  )
}

export default CartPage
