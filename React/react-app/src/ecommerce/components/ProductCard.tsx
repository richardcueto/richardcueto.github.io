import { Link } from 'react-router-dom'
import Price from './Price'

function ProductCard({ product }) {
  const handle = product.node.handle
  const title = product.node.title
  const description = product.node.description
  const price = product.node.variants.edges[0].node.price

  const imageNode = product.node.images.edges[0].node

  return (
    <Link
      to={`/products/${handle}`}
      className="h-120 w-72 rounded shadow-lg mx-auto border border-palette-lighter block overflow-hidden group"
    >
      {/* Contenedor de la Imagen */}
      <div className="h-72 border-b-2 border-palette-lighter relative overflow-hidden">
        <img
          src={imageNode.originalSrc}
          alt={imageNode.altText || title}
          className="w-full h-full object-cover transform duration-500 ease-in-out group-hover:scale-110"
        />
      </div>

      {/* Detalle del Producto */}
      <div className="h-48 relative">
        <div className="font-primary text-palette-primary text-2xl pt-4 px-4 font-semibold">
          {title}
        </div>
        <div className="text-lg text-gray-600 p-4 font-primary font-light line-clamp-2">
          {description}
        </div>
        <div
          className="text-palette-dark font-primary font-medium text-base absolute bottom-0 right-0 mb-4 pl-8 pr-4 pb-1 pt-2 bg-palette-lighter 
          rounded-tl-sm triangle"
        >
          <Price
            currency="$"
            num={price}
            numSize="text-lg"
          />
        </div>
      </div>
    </Link>
  )
}

export default ProductCard