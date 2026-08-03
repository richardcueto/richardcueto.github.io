import { useEffect, useState } from 'react'
import { useParams } from 'react'
import { getProduct } from '../lib/shopify' // Ajusta el path o conserva '@/lib/shopify' si usas alias
import ProductSection from '../components/ProductSection'

function ProductPage() {
  const { handle } = useParams() // Captura el :handle desde la URL (ej. /products/:handle)
  const [productData, setProductData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true)
        if (handle) {
          const data = await getProduct(handle)
          setProductData(data)
        }
      } catch (err) {
        console.error('Error al cargar la información del producto:', err)
        setError('No se pudo encontrar el producto.')
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [handle])

  if (loading) {
    return (
      <div className="min-h-screen py-12 sm:pt-20 text-center">
        <p className="text-gray-500">Cargando producto...</p>
      </div>
    )
  }

  if (error || !productData) {
    return (
      <div className="min-h-screen py-12 sm:pt-20 text-center">
        <p className="text-red-500">{error || 'El producto no existe.'}</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-12 sm:pt-20">
      <ProductSection productData={productData} />
    </div>
  )
}

export default ProductPage