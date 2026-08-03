import { useEffect, useState } from 'react'
import StoreHeading from '../components/StoreHeading'
import ProductListings from '../components/ProductListings'
import { getAllProductsInCollection } from '../lib/shopify'

function HomePage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true)
        const data = await getAllProductsInCollection()
        setProducts(data)
      } catch (err) {
        console.error('Error al cargar productos de Shopify:', err)
        setError('No se pudieron cargar los productos.')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl py-12 text-center">
        <p className="text-gray-500">Cargando catálogo...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="mx-auto max-w-6xl py-12 text-center">
        <p className="text-red-500">{error}</p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl">
      <StoreHeading />
      <ProductListings products={products} />
    </div>
  )
}

export default HomePage