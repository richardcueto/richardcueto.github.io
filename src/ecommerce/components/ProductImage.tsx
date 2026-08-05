import { useState, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'

function ProductImage({ images }) {
  // Verificación de seguridad si no hay imágenes
  if (!images || images.length === 0) {
    return <div className="w-full md:w-1/2 max-w-md h-96 bg-gray-200 rounded animate-pulse" />
  }

  const [mainImg, setMainImg] = useState(images[0].node)
  const ref = useRef()

  function scroll(scrollOffset) {
    ref.current.scrollLeft += scrollOffset
  }

  return (
    <div className="w-full md:w-1/2 max-w-md border border-palette-lighter bg-white rounded shadow-lg overflow-hidden">
      {/* Contenedor Imagen Principal */}
      <div className="relative h-96 overflow-hidden">
        <img
          src={mainImg.originalSrc}
          alt={mainImg.altText || 'Product Image'}
          // Reemplazo de layout="fill": w-full h-full object-cover
          className="w-full h-full object-cover transform duration-500 ease-in-out hover:scale-105"
        />
      </div>

      {/* Contenedor Carrusel de Miniaturas */}
      <div className="relative flex border-t border-palette-lighter">
        {/* Botón Scroll Izquierda */}
        <button
          aria-label="left-scroll"
          className="h-32 bg-palette-lighter hover:bg-palette-light absolute left-0 z-10 opacity-75 flex items-center justify-center"
          onClick={() => scroll(-300)}
        >
          <FontAwesomeIcon icon={faArrowLeft} className="w-3 mx-1 text-palette-primary" />
        </button>

        {/* Tira de Miniaturas */}
        <div
          ref={ref}
          style={{ scrollBehavior: "smooth" }}
          // overflow-auto -> overflow-x-auto para forzar scroll horizontal
          className="flex space-x-1 w-full overflow-x-auto border-t border-palette-lighter scrollbar-hide"
        >
          {
            images.map((imgItem, index) => (
              <button
                key={index}
                className={`relative w-40 h-32 flex-shrink-0 overflow-hidden border-2 
                  ${mainImg.originalSrc === imgItem.node.originalSrc 
                    ? 'border-palette-primary' 
                    : 'border-transparent'}`}
                onClick={() => setMainImg(imgItem.node)}
              >
                <img
                  src={imgItem.node.originalSrc}
                  alt={imgItem.node.altText || `Thumbnail ${index + 1}`}
                  // Reemplazo de layout="fill": w-full h-full object-cover
                  className="w-full h-full object-cover"
                />
              </button>
            ))
          }
        </div>

        {/* Botón Scroll Derecha */}
        <button
          aria-label="right-scroll"
          className="h-32 bg-palette-lighter hover:bg-palette-light absolute right-0 z-10 opacity-75 flex items-center justify-center"
          onClick={() => scroll(300)}
        >
          <FontAwesomeIcon icon={faArrowRight} className="w-3 mx-1 text-palette-primary" />
        </button>
      </div>
    </div>
  )
}

export default ProductImage